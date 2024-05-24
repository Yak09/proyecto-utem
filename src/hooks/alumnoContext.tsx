import React, { createContext, useContext } from "react";
import {Alumno} from '../interfaces/interfaces.tsx'


export const AlumnoContext = createContext<Alumno | undefined>(undefined);