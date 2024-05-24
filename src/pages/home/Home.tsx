import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import QrCodeIcon from '@mui/icons-material/QrCode';
import '../config/config.scss';

import Example from '../../components/Carousel.tsx'
import MiniDrawer from '../../components/drawer.tsx'
import { AlumnoContext, useAlumnoContext } from '../../hooks/alumnoContext.tsx';
import { useContext } from 'react';

const CreatePin = () => {

    const data = useContext(AlumnoContext);
    console.log(data?._id);
    return (
        <>  
            <Example style={{ height: '320px' }}/>
            <div className="config-container">
            <MiniDrawer />
            

                <h3>Registro de Asistencia</h3> <br/>
                {/* Utiliza Link para enlazar al botón con la ruta de Config */}
                <Link to="../Generar">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        style={{ 
                            width: '200px', // Personaliza el ancho del botón
                            height: '50px', // Personaliza la altura del botón
                            fontSize: '18px', // Personaliza el tamaño de la fuente
                            margin: '15px',
                        }} 
                        startIcon={<QrCodeIcon />} // Coloca el icono al inicio del botón
                    >
                        Generar QR
                    </Button>
                </Link>

                <Link to="../escanear">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        style={{ 
                            width: '200px', // Personaliza el ancho del botón
                            height: '50px', // Personaliza la altura del botón
                            fontSize: '18px', // Personaliza el tamaño de la fuente
                        }} 
                        startIcon={<QrCodeIcon />} // Coloca el icono al inicio del botón
                    >
                        Escanear QR
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default CreatePin;
