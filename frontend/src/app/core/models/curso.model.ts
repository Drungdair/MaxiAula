export interface Curso {
    _id: string;            /* Identificador del curso */
    profACargo: string;     /* RUT del profesor a cargo*/
    descripcion: string;    /* profesor a cargo */
    nombre: string;         /* Nombre del curso*/
    anio: number;           /* año de imparticion del curso */
    semestre: number;       /* semestre de imparticion del curso */
    cratedAt: Date;         /* Fecha de creacion del curso */
    participantes: string[];/* arreglo de ruts de los participantes del curso */ 
    recursos?: Recurso[];   /* arreglo de los recursos opcionales correspondientes al curso*/
    notas?: Notas[];        /* Las notas del curso en un arreglo de notas que guarda el rut las notas y el promedio de cada alumno */
    tareas?: Tarea[];       /* Tareas que pueda tener el curso */
    portadaURL?: string;    /* Imagen de portada del curso */
    linkChat?: string;      /* Link para el chat del curso */
}

export interface Recurso {
    documentoURL?: string;
    imagenURL?: string;         
    videoURL?: string;          
    audioURL?: string;
}

export interface Notas {
    rutAlumno: string;       /* rut del alumno */
    notas: number[];  /* arreglo de las notas del alumno */
    promedio: number; /* promedio de las notas del alumno */
}

export interface Tarea {
    nombreTarea: string;
    descripcion: string;
    fechaLimite: Date;
    estado: number;
}