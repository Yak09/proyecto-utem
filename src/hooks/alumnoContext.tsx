import { createContext, useContext } from "react";
import Alumno from '../interfaces/interfaces.tsx'


export const AlumnoContext = createContext<Alumno | null>(null);

/*{export function useAlumnoContext(){
    const alumno_context = useContext(AlumnoContext);

    if (!alumno_context) { throw new Error("useGetComplexObject must be used within a Provider") }
  return alumno_context;
}
}*/