
export interface Alumno {
    carrera: string,
    correo: string,
    nombre: string,
    telefono: string, 
    _id: string,
}

export interface Asistencia{
    alumno_id: string,
    curso_id: string,
    fecha: number,
    lat: number,
    lng: number,
    asistencia: boolean
}

export interface Asistencia_info{
    nombre: string,
    nombre_asignatura: string,
    periodo : string
}