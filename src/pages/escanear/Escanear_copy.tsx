import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MiniDrawer from '../../components/drawer.tsx';
import QrCodeReader, { QRCode } from 'react-qrcode-reader';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import QrCodeIcon from '@mui/icons-material/QrCode';
import Button from '@mui/material/Button';
import axios from "axios";
import { useGeolocated } from "react-geolocated";
import Swal from 'sweetalert2'; // Importa SweetAlert2

const Escanear = () => {
    const [startScan, setStartScan] = useState(false);
    const [getLocation, setGetLocation] = useState(false);
    const [val, setVal] = useState<string>('');
    const [alumnos, setAlumnos] = useState([]);
    const navigate = useNavigate(); // Hook para navegación

    const { coords, isGeolocationAvailable, isGeolocationEnabled, timestamp } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        userDecisionTimeout: 5000,
        watchPosition: getLocation, // Solo obtener la geolocalización si getLocation es true
    });

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/alumnos');
                setAlumnos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAlumnos();
    }, []);

    const handleRead = async (code: QRCode) => {
        setVal(code.data);

        try {
            const qrData = JSON.parse(code.data);
            const nombreQR = qrData.nombre;

            const alumnoEncontrado = alumnos.find((alumno: { nombre: string }) => alumno.nombre === nombreQR);

            if (alumnoEncontrado) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'El alumno ha sido registrado exitosamente.',
                });
                navigate('/DataGrid', { state: { qrData: code.data } }); // Redirige a la ruta '/DataGrid' con los datos del QR
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Alumno no encontrado',
                    text: 'El alumno no está registrado en el sistema.',
                });
            }
        } catch (err) {
            console.error('Error parsing QR data:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al procesar el código QR.',
            });
        }
    };

    const handleClick = async () => {
        try {
            setGetLocation(true); // Solo se actualiza el estado aquí
            if (coords) {
                console.log(coords);
                console.log(timestamp);
            }

            // Llamada a la API para obtener el listado de alumnos
            const response = await axios.get('http://127.0.0.1:8000/alumnos');
            const nombres = response.data.map((alumno: { nombre: string }) => alumno.nombre);
            console.log(nombres); // Muestra solo los nombres de los alumnos en la consola
            setAlumnos(response.data); // Guarda los nombres obtenidos en el estado, si es necesario

            Swal.fire({
                icon: 'success',
                title: 'API Consumida',
                text: 'Los datos de los alumnos se han obtenido correctamente.',
            });

        } catch (err) {
            console.error('Error fetching data:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al consumir la API.',
            });
        }
    };

    return (
        <Container component="main">
            <MiniDrawer />
            <Box sx={{ margin: "auto", textAlign: "center" }}>
                <div className="config-container">
                    <h3>{startScan ? "Desactivar camara" : "Activar camara"}</h3> <br />
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
                        onClick={handleClick}
                    >
                        Consumir API
                    </Button>
                </div>
            </Box>
            {startScan && (
                <Box sx={{ margin: "auto", textAlign: "center" }}>
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
    );
}

export default Escanear;
