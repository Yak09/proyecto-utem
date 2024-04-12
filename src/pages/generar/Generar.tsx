
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import './Generar.scss'

import MiniDrawer from '../../components/drawer.tsx'

  const top100Films = [
      { label: '08:00 - 09:30', periodo: 1 },
      { label: '09:40 - 11:10', periodo: 2 },
      { label: '11:20 - 12:50', periodo: 3 },
      { label: '13:00 - 14:30', periodo: 4 },
      { label: '14:40 - 16:10', periodo: 5 },
      { label: '16:20 - 17:50', periodo: 6 },
      { label: '18:00 - 19:30', periodo: 7 },
      { label: '19:40 - 21:10', periodo: 8 },
      { label: '21:20 - 22:50', periodo: 9 },]

const Generar = () => {
    return(
        <div className='generar-container'>
            <MiniDrawer />
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