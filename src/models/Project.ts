import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose"
import { ITask } from "./Task"

// creando un tipo con las propiedades de Document y las definidas
export interface IProject extends Document {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask>[]
}

// definir el esquema que coincide con el tipo anterior 
// https://mongoosejs.com/docs/schematypes.html
const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [{
        type: Types.ObjectId,
        ref: 'Task'
    }
    ]
}, { timestamps: true })

// conectando ambos. Nombre único
const Project = mongoose.model<IProject>('Projec', ProjectSchema)

export default Project