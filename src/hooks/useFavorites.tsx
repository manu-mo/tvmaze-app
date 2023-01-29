import { useEffect, useState } from "react";
import { get, ref, set } from "firebase/database";
import { database } from "../firebaseConfig";
import { useAuth } from "./useAuth";
import { ShowDetailType } from "../Api";

const useFavorites = (): [
    favorites: ShowDetailType[],
    addFavorites: (show: ShowDetailType) => void,
    removeFavorites: (show: ShowDetailType) => void,
    isFavorites: (show: ShowDetailType) => boolean,
] => {
    const [favorites, setFavorites] = useState<ShowDetailType[]>([]);
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!!user) {
            get(ref(database, '/users/' + user.id + '/favorites')).then((snapshot) => {
                setFavorites(snapshot.val());
            })
        }
    }, [user, isLoading]);
  
    const addFavorites = (show: ShowDetailType) => {
        if (!!user) {
            const newFavorites = [...(favorites || []), show];
            setFavorites(newFavorites);
            set(ref(database, '/users/' + user.id + '/favorites'), newFavorites).catch((error) => {
                console.log(error);
            });
        }
    };

    const removeFavorites = (show: ShowDetailType) => {
        if (!!user) {
            const newFavorites = favorites.filter((el) => el !== show);
            setFavorites(newFavorites);
            set(ref(database, '/users/' + user.id + '/favorites'), newFavorites);
        }
    };
    
    const isFavorites = (show: ShowDetailType) => {
        return (favorites || []).includes(show);
    }
    
    return [favorites, addFavorites, removeFavorites, isFavorites];
    
}

export default useFavorites;