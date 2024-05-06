import Html5QrcodePlugin from '../../components/scanner.tsx';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MiniDrawer from '../../components/drawer.tsx'
import QrCodeReader, { QRCode } from 'react-qrcode-reader';
import { useHistory } from 'react-router-dom';

import { Scanner } from '@yudiel/react-qr-scanner';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AspectRatio } from '@mui/icons-material';

import QrCodeIcon from '@mui/icons-material/QrCode';
import Button from '@mui/material/Button';

const Escanear = () => {

    const [startScan, setStartScan] = useState(false);
    const [val, setVal] = useState<string>('');
    const navigate = useNavigate(); // Hook para navegación

    const handleRead = (code: QRCode) => {
        setVal(code.data);
        console.log(code.data); // Imprime el valor escaneado por consola
        navigate('/DataGrid', { state: { qrData: code.data } }); // Redirige a la ruta '/DataGrid' con los datos del QR
    };

    return(
        <Container component="main">
        <MiniDrawer />
        <Box sx={{ margin: "auto", textAlign: "center"}}>
        <div className="config-container">

                <h3>{startScan ? "Activar camara" : "Desactivar camara"}</h3> <br/>
                {/* Utiliza Link para enlazar al botón con la ruta de Config */}
                
                <Button 
                                variant="contained" 
                                color="primary" 
                                style={{ 
                                    width: '200px', // Personaliza el ancho del botón
                                    height: '50px', // Personaliza la altura del botón
                                    fontSize: '15px', // Personaliza el tamaño de la fuente
                                    margin: '15px',
                                }} 
                                startIcon={<QrCodeIcon />} // Coloca el icono al inicio del botón
                                onClick={() => {
                                    setStartScan(!startScan);
                                    }}
                            >
                            {startScan ? "Detener escaneo" : "Comenzar escaneo"}
                </Button>
                   
            </div>
        </Box>
        {startScan && (
            <Box sx={{ margin: "auto", textAlign: "center"}}>
                <QrCodeReader 
                delay={200} 
                width={500} 
                facingMode={"environment"}
                height={500} 
                onRead={handleRead} />
                <p>{val}</p>
            </Box>
        )}
      </Container>
    )
}
    export default Escanear

