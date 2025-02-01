import { Request, Response } from "express";
import colores from 'colors'
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const project = req.project //  desde el req desde el middleware project
            const task = new Task(req.body)
            task.project = project.id
            project.tasks.push(task) // agregar la tarea al proyecto
            await Promise.allSettled([task.save(), project.save()])
            res.json({ "data": 'Se ha creado la tarea' })
        } catch (error) {
            console.log(colores.bgRed('Ha ocurrido un error. Detalles a continuación'))
            console.log(error)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static getTasks = async (req: Request, res: Response) => {
        try {
            const project = req.project //  desde el req desde el middleware project
            const { tasks } = await project.populate('tasks')
            res.json({ "data": tasks })
        } catch (error) {
            console.log(colores.bgRed('Ha ocurrido un error. Detalles a continuación'))
            console.log(error)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

}