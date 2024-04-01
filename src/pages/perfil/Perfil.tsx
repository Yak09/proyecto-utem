import './perfil.scss'
const Perfil = ({alumnoName = 'John Doe',correo = 'john.doe@example.com', carrera = 'Ingeniería Informática', telefono = '569-4562-7890'}) => {
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
                        <span>{alumnoName}</span>
                    </div>
                    <div className="perfil-item">
                        <span>Correo Electrónico:</span>
                        <span>{correo}</span>
                    </div>
                    <div className="perfil-item">
                        <span>Carrera:</span>
                        <span>{carrera}</span>
                    </div>
                    <div className="perfil-item">
                        <span>Número de Teléfono:</span>
                        <span>{telefono}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;