import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import './Generar.scss';
import MiniDrawer from '../../components/drawer.tsx';
import QRCode from 'qrcode.react';
import { useContext } from 'react';
import { profesorContext } from '../../hooks/profesorContext.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Swal from 'sweetalert2';
import {Clase} from '../../interfaces/interfaces.tsx'
import { useGeolocated } from "react-geolocated";

const horarioAlumno = [
  { label: '08:00 - 09:30', periodo: 1 },
  { label: '09:40 - 11:10', periodo: 2 },
  { label: '11:20 - 12:50', periodo: 3 },
  { label: '13:00 - 14:30', periodo: 4 },
  { label: '14:40 - 16:10', periodo: 5 },
  { label: '16:20 - 17:50', periodo: 6 },
  { label: '18:00 - 19:30', periodo: 7 },
  { label: '19:40 - 21:10', periodo: 8 },
  { label: '21:20 - 22:50', periodo: 9 },
];

const Generar = () => {

  const data = useContext(profesorContext);
  const URL = import.meta.env.VITE_API_URL;
  const [asignaturas, setAsignaturas] = useState([]);
  const [fecha, setFecha] = useState(new Date().toLocaleDateString());
  const fecha_ISO = new Date().toISOString();
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState(null);
  const [qrData, setQRData] = useState('');
  const [error, setError] = useState('');
  const [getLocation, setGetLocation] = useState(false);
  const { user, isLoading } = useAuth0();
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

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  useEffect(() => {
    const fetchAsignaturas = async () => {
        if(roles[0] === "Profesor"){
          try {
            const response = await axios.get(URL+"/cursos/profesor",
              {
                params:{
                  _id: roles[1]
                }
              }
            );
            const fetchedAsignaturas = response.data.map(asignatura => ({
              label: asignatura.nombre,
              id: asignatura._id
            }));
            setAsignaturas(fetchedAsignaturas);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        }
        else{
          try {
            const response = await axios.get(URL+"/asignaturas/alumno",
              {
                params:{
                  _id: roles[1]
                }
              }
            );
            const fetchedAsignaturas = response.data[0].cursos_info.map(asignatura => ({
              label: asignatura.nombre,
              id: asignatura._id
            }));
            setAsignaturas(fetchedAsignaturas);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        }

    };
    fetchAsignaturas();
}, [data]);
  const handleGenerarClick =   async () => {
    if (!user.name|| !horarioSeleccionado || !asignaturaSeleccionada) {
      setError('No se pueden dejar campos vacíos para generar el código QR.');
      return;
    }
    
    if (roles[0] === "Profesor"){
      const qrDataString = {
        fecha: fecha_ISO,
        horario: horarioSeleccionado ? horarioSeleccionado.label : '',
        curso_id: asignaturaSeleccionada ? asignaturaSeleccionada.id : '',
      };
      const response_qr = await axios.post(URL+"/jwt/encriptar",qrDataString);
      console.log(response_qr.data)
      setQRData(response_qr.data);
      setError('');
      try {
        const info_clase: Clase = {
          curso_id: asignaturaSeleccionada.id,
          fecha: fecha_ISO
        };
        const response_clase = await axios.post(URL + "/inicio_clase", info_clase);
        console.log(response_clase);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de clase',
          text: response_clase.data.mensaje,
      });
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al iniciar la clase.',
      });
      }
    }
    else{
      setGetLocation(true);
      const qrDataString = {
        alumno_id: roles[1],
        curso_id: asignaturaSeleccionada ? asignaturaSeleccionada.id : '',
        horario: horarioSeleccionado ? horarioSeleccionado.label : '',
        fecha: fecha_ISO,
        lat:coords?.latitude,
        lng:coords?.longitude
      };
      const response_qr = await axios.post(URL+"/jwt/encriptar",qrDataString);
      setQRData(response_qr.data);
      setError('');
      setGetLocation(false);
    }
  };

  return (
    <div className="generar-container">
      <MiniDrawer />
      <h2>Generar QR</h2>
      <div className="generar-content">
        <div className="generar-details">
          <div className="generar-item">
            <span>Nombre Completo:</span>
            <span>{user.name}</span>
          </div>
          <div className="generar-item">
            <span>Fecha de solicitud:</span>
            <span>{fecha}</span>
          </div>
          <div className="generar-item">
            <Autocomplete
              disablePortal
              id="combo-box-horario"
              options={horarioAlumno}
              sx={{ width: 375 }}
              value={horarioSeleccionado}
              onChange={(event, newValue) => {
                setHorarioSeleccionado(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Horario" />}
            />
          </div>
          <div className="generar-item">
            <Autocomplete
              disablePortal
              id="combo-box-asignatura"
              options={asignaturas}
              value={asignaturaSeleccionada}
              onChange={(event, newValue) => {
                setAsignaturaSeleccionada(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Asignatura" />}
            />
          </div>
        </div>
      </div>
      {error && (
        <div className="error-message-container">
          <div className="error-message">{error}</div>
        </div>
      )}
      <div className="generar-button" style={{ marginTop: '20px' }}>
        <Button variant="contained" onClick={handleGenerarClick}>
          Generar
        </Button>
      </div>
      <div className="generar-qrcode" style={{ marginTop: '20px' }}>
        {qrData && <QRCode value={qrData} includeMargin={true} renderAs={'canvas'} size={268}
                    style={{ height: "auto", maxWidth: "80%", width: "80%" }}/>}
      </div>
    </div>
  );
};

export default Generar;
