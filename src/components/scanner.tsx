import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = (props) => {
    let config = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin = (props) => {
    const [scannedQR, setScannedQR] = useState(null);

    useEffect(() => {
        const config = createConfig(props);
        const verbose = props.verbose === true;

        if (!props.qrCodeSuccessCallback) {
            throw new Error("qrCodeSuccessCallback is required callback.");
        }

        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(handleScanResult, props.qrCodeErrorCallback);

        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    const handleScanResult = (qrCodeMessage) => {
        setScannedQR(qrCodeMessage);
        props.qrCodeSuccessCallback(qrCodeMessage); // You can pass the result to the parent component or perform any other action
    };

    return (
        <div>
            <div id={qrcodeRegionId} />
            {scannedQR && <p>Último código QR escaneado: {scannedQR}</p>}
        </div>
    );
};

export default Html5QrcodePlugin;
