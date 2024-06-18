import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { user, isLoading } = useAuth0();
  const namespace = 'https://your-namespace.com/';
  const roles = user ? (user[namespace + 'roles'] || []) : [];

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return allowedRoles.includes(roles[0]) ? <Component {...rest} /> : <Navigate to="/access-denied" />;
};

export default ProtectedRoute;