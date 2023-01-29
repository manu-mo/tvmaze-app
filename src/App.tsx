import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/search",
    element: <ProtectedRoute><SearchPage /></ProtectedRoute>,
  },
  {
    path: "/search/:showId",
    element: <ProtectedRoute><DetailPage /></ProtectedRoute>,
  },
  {
    path: '/favorites',
    element: <ProtectedRoute><FavoritesPage /></ProtectedRoute>,
  },
  {
    path: '/favorites/:showId',
    element: <ProtectedRoute><DetailPage /></ProtectedRoute>,
  },
  {
    path: '*',
    element: <h1 style={{ margin: '20%' }}>The Page Doesn't Exist</h1>
  }
]);


function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );

}

export default App;
