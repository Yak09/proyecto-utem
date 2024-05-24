import axios from 'axios';
import { Alumno } from '../interfaces/interfaces';

export const fetchAlumnoData = async (): Promise<Alumno> => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/alumno_info',
        {
            params:{
                _id: "66444c94e3afe1e1f9c4e3b0"
            }
        }
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos del alumno:', error);
    throw error;
  }
};
