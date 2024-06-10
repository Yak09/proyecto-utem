import { useContext, useEffect, useState } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import {Asistencia} from '../../interfaces/interfaces.tsx'

const Escanear = () => {
    const [fecha, setFecha] = useState(new Date().toISOString());
    const URL = import.meta.env.VITE_API_URL;
    const [startScan, setStartScan] = useState(false);
    const [getLocation, setGetLocation] = useState(false);
    const [val, setVal] = useState<string>('');
    const [alumnos, setAlumnos] = useState([]);
    const navigate = useNavigate(); // Hook para navegación

    const { user} = useAuth0();
    const namespace = 'https://your-namespace.com/';
    const roles = user[namespace + 'roles'] || [];

    const { coords } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        userDecisionTimeout: 5000,
        watchPosition: getLocation,
        watchLocationPermissionChange: true // Solo obtener la geolocalización si getLocation es true
    });

    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const response = await axios.get(URL+"/alumnos");
                setAlumnos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAlumnos();
    }, []);

    const handleRead = async (code: QRCode) => {
        setVal(code.data);
        setStartScan(false);
        setGetLocation(true);
        setFecha(fecha);
        if(roles[0]==="Estudiante"){
            try {
                const qrData = (code.data);
                const asistencia = {
                    alumno_id: roles[1], // Se pasa ID como usuario autentificado
                    fecha_alumno: fecha, // Asignar la fecha actual en formato ISO
                    lat: coords?.latitude, // Ejemplo de latitud
                    lng: coords?.longitude, // Ejemplo de longitud
                    asistencia: true
                  };
                const payload ={estudiante:asistencia,
                                profesor:qrData};
                console.log(payload);
                const response_asistencia = await axios.put(URL+"/asistencia/alumno",payload);
                setGetLocation(false);
    
                const nombreQR = response_asistencia.data.nombre_alumno;
                
                const alumnoEncontrado = alumnos.find((alumno: { nombre: string }) => alumno.nombre === nombreQR);
    
                if (alumnoEncontrado) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: 'El alumno ha sido registrado exitosamente.',
                    });
                    navigate('/DataGrid', { state: { qrData_: response_asistencia.data } }); // Redirige a la ruta '/DataGrid' con los datos del QR
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
        }
        else{
            try {
                const qrData = (code.data);
                const asistencia = {
                    fecha_profesor: fecha, // Asignar la fecha actual en formato ISO
                    asistencia: true
                  };
                const payload ={estudiante:qrData,
                                profesor:asistencia}
                const response_asistencia = await axios.put(URL+"/asistencia/profesor",payload);
                setGetLocation(false);
    
                const nombreQR = response_asistencia.data.nombre_alumno;
                
                const alumnoEncontrado = alumnos.find((alumno: { nombre: string }) => alumno.nombre === nombreQR);
    
                if (alumnoEncontrado) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: 'El alumno ha sido registrado exitosamente.',
                    });
                    navigate('/DataGrid', { state: { qrData_: response_asistencia.data } }); // Redirige a la ruta '/DataGrid' con los datos del QR
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
        }
        
    };

    const handleClick = async () => {
        try {
            setGetLocation(true); // Solo se actualiza el estado aquí
            if (coords) {
                console.log(coords);
                console.log(fecha);
            }
            setGetLocation(false); // Solo se actualiza el estado aquí


            // Llamada a la API para obtener el listado de alumnos
            const response = await axios.get(URL+"/alumnos");
            const nombres = response.data.map((alumno: { nombre: string }) => alumno.nombre);
            //console.log(nombres); // Muestra solo los nombres de los alumnos en la consola
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
                        delay={500}
                        width={500}
                        facingMode={"environment"}
                        height={500}
                        onRead={handleRead} />
                </Box>
            )}
        </Container>
    );
}

export default Escanear;
