import Html5QrcodePlugin from '../../components/scanner.tsx';
import React, { useEffect, useState } from "react";

import MiniDrawer from '../../components/drawer.tsx'
import QrCodeReader, { QRCode } from 'react-qrcode-reader';

import { Scanner } from '@yudiel/react-qr-scanner';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AspectRatio } from '@mui/icons-material';

import QrCodeIcon from '@mui/icons-material/QrCode';
import Button from '@mui/material/Button';

const Escanear = () => {


    const [startScan, setStartScan] = useState(false);
    const [val, setVal] = React.useState<string>('');

    const handleRead = (code: QRCode) => {
        setVal(code.data);
    };

    return(
        <Container component="main">
        <MiniDrawer />
        <Box sx={{ margin: "auto", textAlign: "center"}}>
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
        </Box>
        {startScan && (
            <Box sx={{ margin: "auto", textAlign: "center"}}>
                <QrCodeReader 
                delay={100} 
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

