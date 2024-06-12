import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const namespace = 'https://your-namespace.com/'; // Asegúrate de que coincide con el namespace en la regla
  const roles = user[namespace + 'roles'] || [];

  //console.log('User:', user); // Añadir este console.log para depurar
  //console.log('Roles:', roles); // Añadir este console.log para ver los roles

  const secondRole = roles.length > 1 ? roles[1] : 'No second role';
  const id_rol = roles[1]

  return (
    isAuthenticated && (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '14px' }}>{user.name}</span>
          <span style={{ fontSize: '14px', color: 'gray' }}>{user.email}</span>
        </div>
        <img src={user.picture} alt={user.name} style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
        <div>
          {roles.length > 0 && (
            <div>
              <strong>Roles:</strong>
              {/* <ul>
                {roles.map((role, index) => (
                  <li key={index} style={{ fontSize: '14px', color: 'blue' }}>{role}</li>
                ))}
              </ul> */}
              <div style={{ marginTop: '10px' }}>
                <strong>id:</strong> <span style={{ fontSize: '14px', color: 'blue' }}>{id_rol}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
