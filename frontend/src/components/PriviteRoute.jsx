import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { isLoggedIn } = useSelector((store) => store.userReducer);

  return isLoggedIn ? (
    children
  ) : (
    <Navigate state={location.pathname} to="/login" replace={true} />
  );
};
