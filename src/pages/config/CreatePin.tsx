import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import QrCodeIcon from '@mui/icons-material/QrCode';
import './config.scss';

const CreatePin = () => {
    return (
        <>
            <div className="config-container">
                <div className='titlePin'>
                    <h2>Parece que aún no tienes tu pin <br/> de registro de asistencia</h2>
                </div>
                <h3>Haz click en “Crear pin” para continuar</h3> <br/>
                {/* Utiliza Link para enlazar al botón con la ruta de Config */}
                <Link to="../Config">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        size="large" // Cambia el tamaño del botón a grande
                        style={{ 
                            width: '200px', // Personaliza el ancho del botón
                            height: '50px', // Personaliza la altura del botón
                            fontSize: '18px', // Personaliza el tamaño de la fuente
                        }} 
                        startIcon={<QrCodeIcon />} // Coloca el icono al inicio del botón
                    >
                        Crear Pin
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default CreatePin;
