import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './config.scss';

const Config = () => {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');

    const handleAccept = () => {
        // Aquí puedes hacer lo que necesites con los valores guardados
        console.log('PIN:', pin);
        console.log('Confirm PIN:', confirmPin);
        // Por ejemplo, puedes enviar estos valores a una API, guardarlos en localStorage, etc.
    };

    return (
        <>
            <div className="config-container">
                <h2>Registro</h2>
                <p>Crea un PIN para usarlo en el <br />
                registro de tu asistencia</p>
                <Box 
                    sx={{
                        width: 300,
                        maxWidth: '100%',
                    }}
                    className="config-box"
                >
                    <TextField
                        fullWidth
                        label="Ingrese su PIN"
                        id="pin"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Confirme su PIN"
                        id="confirmPin"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                    />
                    <Stack spacing={2} direction="row" justifyContent="center">
                        <Button variant="contained" color="secondary" onClick={handleAccept}>Aceptar</Button>
                        <Link to="../Createpin">
                        <Button variant="contained" color="secondary">Cancelar</Button>
                        </Link>
                    </Stack>
                </Box>
            </div>
        </>
    );
};

export default Config;