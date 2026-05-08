import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../redux/store/hooks";

import { selectToken } from "../../redux/slices/authSlice";

export const ProtectedRoute = () => {
  const token = useAppSelector(selectToken);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
