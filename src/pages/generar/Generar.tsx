
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import './Generar.scss'

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },]

const Generar = () => {
    return(
        <div className='generar-container'>
            <h2> Generar QR</h2>
            <div className='generar-content'>
                <div className='generar-details'>
                    <div className='generar-item'>
                        <span>Nombre Completo:</span>
                        <span>Martin Daniel Martínez Allende</span>
                    </div>
                    <div className='generar-item'>
                        <span>Fecha de solicitud:</span>
                        <span>dd/mm/yy</span>
                    </div>
                    <div className='generar-item'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            renderInput={(params) => <TextField {...params} label="Horario" />}
                            />
                    </div>
                    <div className='generar-item'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            renderInput={(params) => <TextField {...params} label="Asignatura" />}
                            />
                    </div>
                </div>
            </div>
            <div className='generar-button'>
                <Button variant="contained">Generar</Button>
            </div>
        </div>
    )
    
    }
    
    export default Generar