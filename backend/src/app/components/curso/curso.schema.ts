import { Schema, model, Document } from "mongoose";
import { Curso, Recurso } from '../../models/curso.model';

const definition: Partial<Record<keyof Curso, any>> = {

    profACargo: { type: String },
    nombre: { type: String },
    año: { type: Number },
    semestre: { type: Number},
    cratedAt: { type: Date},
    participantes: { type: Array},
    recursos: { type: Array },
  
}

const schema: Schema<Curso> = new Schema(definition)

export default model<Curso & Document>('Curso', schema, 'Cursos');