import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import './Generar.scss';
import QRCode from 'qrcode.react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Clase } from '../../interfaces/interfaces.tsx';
import { useGeolocated } from "react-geolocated";
import { toPng } from 'html-to-image';
import download from 'downloadjs';

import MiniDrawer from '../../components/drawer.tsx';

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
  const location = useLocation();
  const { selectedDate, selectedPeriodo, cursoId } = location.state || {};
  const URL = import.meta.env.VITE_API_URL;
  const [asignaturas, setAsignaturas] = useState([]);
  const [fecha, setFecha] = useState(new Date().toLocaleDateString());
  const fecha_ISO = new Date().toISOString();
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(horarioAlumno.find(h => h.periodo === selectedPeriodo) || null);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState(null);
  const [qrData, setQRData] = useState('');
  const [error, setError] = useState('');
  const [getLocation, setGetLocation] = useState(false);
  const { user, isLoading } = useAuth0();
  const namespace = 'https://your-namespace.com/';
  const roles = user[namespace + 'roles'] || [];
  const qrRef = useRef(null);
  
  const { coords } = useGeolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
    watchPosition: getLocation,
    watchLocationPermissionChange: true // Solo obtener la geolocalización si getLocation es true
  });

  useEffect(() => {
    const fetchAsignaturas = async () => {
      if (roles[0] === "Profesor") {
        try {
          const response = await axios.get(URL + "/cursos/profesor", {
            params: {
              _id: roles[1]
            }
          });
          const fetchedAsignaturas = response.data.map(asignatura => ({
            label: asignatura.nombre,
            id: asignatura._id
          }));
          setAsignaturas(fetchedAsignaturas);

          if (cursoId) {
            const selectedAsignatura = fetchedAsignaturas.find(a => a.id === cursoId);
            setAsignaturaSeleccionada(selectedAsignatura);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        try {
          const response = await axios.get(URL + "/asignaturas/alumno", {
            params: {
              _id: roles[1]
            }
          });
          const fetchedAsignaturas = response.data[0].cursos_info.map(asignatura => ({
            label: asignatura.nombre,
            id: asignatura._id
          }));
          setAsignaturas(fetchedAsignaturas);

          if (cursoId) {
            const selectedAsignatura = fetchedAsignaturas.find(a => a.id === cursoId);
            setAsignaturaSeleccionada(selectedAsignatura);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchAsignaturas();
  }, [roles, URL, cursoId]);

  const handleGenerarClick = async () => {
    if (!user?.name || !horarioSeleccionado || !asignaturaSeleccionada) {
      setError('No se pueden dejar campos vacíos para generar el código QR.');
      return;
    }
    console.log(roles[0])
    if (roles[0] === "Profesor") {
      const qrDataString = {
        fecha: fecha_ISO,
        horario: horarioSeleccionado ? horarioSeleccionado.periodo : '',
        curso_id: asignaturaSeleccionada ? asignaturaSeleccionada.id : '',
      };
      const response_qr_profesor = await axios.post(URL + "/jwt/encriptar", qrDataString);
      setError('');
      try {
        const info_clase = {
          curso_id: asignaturaSeleccionada.id,
          fecha: fecha_ISO,
          periodo: horarioSeleccionado.periodo
        };
        const response_clase = await axios.post(URL + "/inicio_clase", info_clase);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de clase',
          text: response_clase.data.mensaje,
        });
        setQRData(response_qr_profesor.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.detail,
        });
      }
    } 
    else {
      setGetLocation(true);
      const qrDataString = {
        alumno_id: roles[1],
        curso_id: asignaturaSeleccionada ? asignaturaSeleccionada.id : '',
        horario: horarioSeleccionado.periodo,
        fecha_alumno: fecha_ISO,
        lat: coords?.latitude,
        lng: coords?.longitude
      };
      console.log(qrDataString);
      const response_qr_alumno = await axios.post(URL + "/jwt/encriptar", qrDataString);
      setQRData(response_qr_alumno.data);
      setError('');
      setGetLocation(false);
    }
  };

  const handleDownloadClick = async () => {
    if (qrRef.current) {
      const dataUrl = await toPng(qrRef.current);
      download(dataUrl, 'qr-code.png');
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
        {qrData && (
          <div ref={qrRef}>
            <QRCode value={qrData} includeMargin={true} renderAs={'canvas'} size={268}
              style={{ height: "auto", maxWidth: "80%", width: "80%" }} />
          </div>
        )}
      </div>
      {qrData && (
        <div className="generar-button" style={{ marginTop: '20px' }}>
          <Button variant="contained" onClick={handleDownloadClick}>
            Descargar QR
          </Button>
        </div>
      )}
    </div>
  );
};

export default Generar;
