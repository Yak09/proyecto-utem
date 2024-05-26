import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      sx={{
        whiteSpace: 'nowrap', // Asegura que el texto no se divida en varias líneas
      }}
    >
      Cerrar sesión
    </Button>
  );
};

export default LogoutButton;
