import { browserLocalPersistence, createUserWithEmailAndPassword, GoogleAuthProvider, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, { useState, createContext, useContext, useEffect } from "react";
import { UserType } from "../Api";
import { auth } from "../firebaseConfig";

const provider = new GoogleAuthProvider();

const AuthContext = createContext({
    authed: false,
    setAuthed: (authed: boolean) => {},
    user: {} as UserType,
    isLoading: false,
    handleSignInEmailPassword: (email: string, password: string) => {},
    handleSignOut: () => {},
    signInWithGoogle: () => {},
    handleSignUp: (email: string, password: string, name: string) => {},
});

export const AuthProvider = ({ children }: any) => {

    const [authed, setAuthed] = useState<boolean>(false);
    const [user, setUser] = useState<UserType>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setPersistence(auth, browserLocalPersistence);
    }, []);

    useEffect(() => {
        const listener = auth.onAuthStateChanged((response) => {
            response ?
                setUser({
                    id: response.uid,
                    name: response.displayName || '',
                    email: response.email || '',
                })
                : setUser(null);
        });
        return () => {
            listener();
        }
    }, []);

    const handleSignInEmailPassword = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const id = user.uid;
                const name = user.displayName;
                const email = user.email;
                if (!!name && !!email) {
                    setUser({
                        id: id,
                        name: name,
                        email: email,
                    });
                }
                setAuthed(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                setAuthed(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                const user = userCredential.user;
                const id = user.uid;
                const name = user.displayName;
                const email = user.email;
                if (!!name && !!email) {
                    setUser({
                        id: id,
                        name: name,
                        email: email,
                    });
                }
                setAuthed(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSignUp = (email: string, password: string, name: string) => {
        createUserWithEmailAndPassword(auth, email, password) 
            .then((userCredential) => {
                const user = userCredential.user;
                const id = user.uid;
                const name = user.displayName;
                const email = user.email;
                if (!!name && !!email) {
                    setUser({
                        id: id,
                        name: name,
                        email: email,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const conTextValue = {
        authed: authed,
        setAuthed: setAuthed,
        user: user,
        isLoading: isLoading,
        handleSignInEmailPassword: handleSignInEmailPassword,
        handleSignOut: handleSignOut,
        signInWithGoogle: signInWithGoogle,
        handleSignUp: handleSignUp,
    }

    return (
        <AuthContext.Provider value={conTextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);