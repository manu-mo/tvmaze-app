import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import { useAuth } from "./../hooks/useAuth";

const ProtectedRoute = ({ children }: any) => {

  const { authed } = useAuth();
  let location = useLocation();

  if (!authed) {
      return <Navigate to="/login" state={{ from: location}} replace />;
  } else {
      return <>{children}</>;
  }

};

export default ProtectedRoute;