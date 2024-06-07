
export interface Alumno {
    carrera: string,
    correo: string,
    nombre: string,
    telefono: string, 
    _id: string,
}
export interface Profesor {
    correo: string,
    nombre: string, 
    _id: string,
}

export interface Asistencia{
    alumno_id: string,
    curso_id: string,
    fecha_profesor: string,
    fecha_alumno: string,
    lat: number,
    lng: number,
    asistencia: boolean
}

export interface Asistencia_info{
    nombre: string,
    nombre_asignatura: string,
    periodo : string
}

export interface Clase{
    curso_id: string,
    fecha: string
}