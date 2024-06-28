import React, { useState } from 'react';
import { Container, Box, Card, CardContent, TextField, Button, Typography, Link } from '@mui/material';

const LoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ usuario: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    let newErrors = { usuario: '', password: '' };

    if (usuario === '') {
      newErrors.usuario = 'Usuario o email es requerido';
      valid = false;
    }

    if (password === '') {
      newErrors.password = 'Contraseña es requerida';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Imprimir los valores ingresados en la consola
      console.log({ usuario, password });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Card style={{ maxWidth: 500, margin: 'auto' }}>
          <CardContent style={{ padding: 40 }}>
            <Box textAlign="center">
              <img
                src="https://mi.utem.cl/static/img/logos/logo_black_utem.png"
                alt="logo"
                style={{ width: '150px', marginBottom: 16 }}
              />
              <Typography variant="subtitle1">
                Por favor ingresa con tus credenciales de Pasaporte.UTEM.
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="txt_usuario"
                name="txt_usuario"
                label="Usuario o email"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                error={Boolean(errors.usuario)}
                helperText={errors.usuario}
                margin="normal"
                style={{ marginBottom: 16 }}
              />
              <TextField
                fullWidth
                id="txt_password"
                name="txt_password"
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
                margin="normal"
                style={{ marginBottom: 16 }}
              />
              {/* Aquí iría el captcha si se está utilizando */}
              <Button color="primary" variant="contained" fullWidth type="submit">
                Ingresar
              </Button>
              <Box textAlign="center" marginTop={2} color="#626262" opacity={0.7}>
                <Link href="https://pasaporte.utem.cl/reset">¿Olvidó su contraseña?</Link>
              </Box>
            </form>
            {/* Aquí iría el mensaje de alerta si existe */}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginForm;
