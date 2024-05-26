import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
        <span style={{ fontSize: '14px' }}>{user.name}</span>
        <span style={{ fontSize: '14px', color: 'gray' }}>{user.email}</span>
        <img src={user.picture} alt={user.name} style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
      </div>
    )
  );
};

export default Profile;
