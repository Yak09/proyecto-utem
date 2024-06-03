import { createContext } from "react";
import {Profesor} from '../interfaces/interfaces.tsx'


export const profesorContext = createContext<Profesor | null>(null);

/*{export function useAlumnoContext(){
    const alumno_context = useContext(AlumnoContext);

    if (!alumno_context) { throw new Error("useGetComplexObject must be used within a Provider") }
  return alumno_context;
}
}*/