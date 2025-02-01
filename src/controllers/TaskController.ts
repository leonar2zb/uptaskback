import { Request, Response } from "express";
import colores from 'colors'
import Task from "../models/Task";
import Project from "../models/Project";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const { projectId } = req.params
            const project = await Project.findById(projectId)
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                res.status(404).json({ error: error.message })
                return
            }
            const task = new Task(req.body)
            task.project = project.id
            project.tasks.push(task) // agregar la tarea al proyecto
            await task.save()
            await project.save()
            console.log(colores.bgCyan(`Creado tarea ${task.name} para ${project.projectName}`))
            res.json({ "data": 'Se ha creado la tarea' })
        } catch (error) {
            console.log(colores.bgRed('Ha ocurrido un error. Detalles a continuación'))
            console.log(error)
        }
    }

}