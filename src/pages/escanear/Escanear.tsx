import Html5QrcodePlugin from '../../components/scanner';
import React, { useEffect, useState } from "react";

import MiniDrawer from '../../components/drawer.tsx'

import { Scanner } from '@yudiel/react-qr-scanner';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AspectRatio } from '@mui/icons-material';


const Escanear = () => {

    const [allowedIds] = React.useState(["qr-111233433-444"]);
    const [status, setStatus] = useState<"idle" | "loading">("idle");
    const [qrValue, setQrValue] = React.useState("");

    const handleScan = (value) => {
        setQrValue(value);
        // Validate the scanned QR value
        validateQr(value);
    };
    
    const validateQr = (value) => {
        setStatus("loading");
    
        // Simulate asynchronous validation
        setTimeout(() => {
        const qrStatus = allowedIds.includes(value) ? "success" : "error";
        if (qrStatus === "success") {
            // Handle successful validation
            console.log("QR code validated successfully:", value);
        } else {
            // Handle validation error
            console.log("QR code validation failed:", value);
        }
        
        // Reset status and QR value after validation
        setStatus("idle");
        setQrValue("");
        }, 3000); // Simulate a 3-second delay for validation
    };
    
    useEffect(() => {
        console.log("Scanned QR value:", qrValue);
        // You can perform additional actions based on the scanned QR value here
    }, [qrValue]);

    return(
        <Container component="main">
        <MiniDrawer />
        <Box sx={{ margin: "auto", textAlign: "center", width: 350 }}>

          <Scanner
            constraints={{
                facingMode: "environment"
            }}
            onDecode={handleScan}
            onError={(error) => console.log(error?.message)}
            stopDecoding={true}
            scanDelay={3000}
          />
        </Box>
      </Container>
    )
}
    export default Escanear

