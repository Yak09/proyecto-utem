import './perfil.scss';

import { useContext } from 'react';
import { AlumnoContext } from '../../hooks/alumnoContext.tsx';
import { useAuth0 } from "@auth0/auth0-react";

const Perfil = () => {
    const alumnoDatos = useContext(AlumnoContext);
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!isAuthenticated) {
        return  (
            <div className="perfil-container">
                {/*<MiniDrawer />*/}
                <h2>Perfil del Estudiante</h2>
                <div className="perfil-content">
                    <div className="perfil-image">
                        <img src="https://sgu.utem.cl/pgai/perfil_foto.php?rut=18534389&sexo=1&t_usu=" alt="Imagen de perfil" />
                    </div>
                    <div className="perfil-details">
                        <div className="perfil-item">
                            <span>Nombre Completo:</span>
                            <span>{alumnoDatos?.nombre}</span>
                        </div>
                        <div className="perfil-item">
                            <span>Correo Electrónico:</span>
                            <span>{alumnoDatos?.correo}</span>
                        </div>
                        <div className="perfil-item">
                            <span>Carrera:</span>
                            <span>{alumnoDatos?.carrera}</span>
                        </div>
                        <div className="perfil-item">
                            <span>Número de Teléfono:</span>
                            <span>{alumnoDatos?.telefono}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="perfil-container">
            <h2>Perfil del Estudiante</h2>
            <div className="perfil-content">
                <div className="perfil-image">
                    <img src="https://sgu.utem.cl/pgai/perfil_foto.php?rut=18534389&sexo=1&t_usu=" alt="Imagen de perfil" />
                </div>
                <div className="perfil-details">
                    <div className="perfil-item">
                        <span>Nombre Completo:</span>
                        <span>{user.name}</span>
                    </div>
                    <div className="perfil-item">
                        <span>Correo Electrónico:</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="perfil-item">
                        <span>Carrera:</span>
                        <span>{alumnoDatos?.carrera}</span>
                    </div>
                    <div className="perfil-item">
                        <span>Número de Teléfono:</span>
                        <span>{alumnoDatos?.telefono}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
