import { Navigate } from 'react-router-dom';
import paths from '../paths';
import { useAppSelector } from '../store/hook';

type UserRouteProps = {
  children: any;
};

export default function UserRoute({ children, ...rest }: UserRouteProps) {
  const { user } = useAppSelector(state => state.auth);

  if (!user) {
    return <Navigate to={paths.signin} />;
  }
  return children;
}
