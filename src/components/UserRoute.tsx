import { useAuthState } from "../features/auth/AuthContextProvider";
import { Navigate } from "react-router-dom";
import paths from "../paths";

type UserRouteProps = {
  children: any;
};

export default function UserRoute({ children, ...rest }: UserRouteProps) {
  const { user } = useAuthState();

  if (!user) {
    return <Navigate to={paths.signin} />;
  }
  return children;
}
