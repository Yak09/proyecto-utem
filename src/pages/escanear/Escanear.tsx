import Html5QrcodePlugin from '../../components/scanner';
import React, { useEffect, useState } from "react";

import MiniDrawer from '../../components/drawer.tsx'

import { Scanner } from '@yudiel/react-qr-scanner';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import QrCodeIcon from '@mui/icons-material/QrCode';


const Escanear = () => {

    const [allowedIds] = React.useState(["qr-111233433-444"]);
    const [status, setStatus] = useState<"idle" | "loading">("idle");
    const [qrValue, setQrValue] = React.useState("");

    const validateQr = (value: string) => (): Promise<void> =>
        new Promise((res, rej) => {
        let qrStatus = "success";
        if (!allowedIds.find((v) => v === value)) {
            qrStatus = "error";
        }

        setTimeout(() => {
            if (qrStatus === "success") res();
            else rej();
            setQrValue("");
            setStatus("idle");
        }, 3000);
        });

    const handleScan = (value: string) => {
        setQrValue(value);
    };

    useEffect(() => {
        console.log("Qr value " + qrValue);
    }, [qrValue]);

    const handleError = (error: any) => {
        if (error.name === 'InterruptedError') {
            // Retry scanning after a short delay
            setTimeout(() => {
                setStatus('loading');
            }, 3000);
        } else {
            console.log(error?.message);
        }
    };


    return(
        <Container component="main">
        <MiniDrawer />
        <Box sx={{ margin: "auto", textAlign: "center", width: 480 }}>
            <Scanner
                tracker
                constraints={{
                    facingMode: "environment",
                }}
                onDecode={handleScan}
                onError={handleError}
                scanDelay={2000}
            />

        </Box>
      </Container>
    )
}
    export default Escanear

