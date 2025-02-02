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

    static getTaskById = async (req: Request, res: Response) => {
        try {
            const project = req.project //  desde el req desde el middleware project
            const { taskId } = req.params
            const task = await Task.findOne({ _id: taskId, project: project.id }).exec();
            if (!task) {
                res.status(404).json({ error: 'Hubo un error y no se encuentra' })
                return
            }
            res.json({ task })
        } catch (error) {
            console.log(colores.bgRed('Ha ocurrido un error. Detalles a continuación'))
            console.log(error)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateTaskById = async (req: Request, res: Response) => {
        try {
            const project = req.project //  desde el req desde el middleware project
            const { taskId } = req.params
            const task = await Task.findOne({ _id: taskId, project: project.id }).exec();
            if (!task) {
                res.status(404).json({ error: 'Hubo un error y no se encuentra' })
                return
            }
            await task.updateOne(req.body)
            res.json({ msg: 'Se ha actualizado' })
        } catch (error) {
            console.log(colores.bgRed('Ha ocurrido un error. Detalles a continuación'))
            console.log(error)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static deleteTaskById = async (req: Request, res: Response) => {
        try {
            const project = req.project //  desde el req desde el middleware project
            const { taskId } = req.params
            const result = await Task.deleteOne({ _id: taskId, project: project.id });
            if (result.deletedCount === 0) {
                res.status(404).json({ error: 'Hubo un error y no se encuentra' })
                return
            }
            // ahora quitarla del project también   
            // Método 1 para poco volumen: filtrar dejando los diferentes al que eliminamos y guardar cambios
            // project.tasks = project.tasks.filter(task => taskId !== task.toString()) 
            // await project.save()
            // Método 2 óptimo para volumen de datos sin filtrar todo el array
            await project.updateOne({ $pull: { tasks: taskId } })
            res.json({ msg: 'Se ha eliminado' })
        } catch (error) {
            console.log(colores.bgRed('Ha ocurrido un error. Detalles a continuación'))
            console.log(error)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static updateStatus = async (req: Request, res: Response) => {
        try {
            const project = req.project //  desde el req desde el middleware project
            const { taskId } = req.params
            const task = await Task.findOne({ _id: taskId, project: project.id });
            if (!task) {
                res.status(404).json({ error: 'Hubo un error y no se encuentra' })
                return
            }
            const { status } = req.body
            await task.updateOne({ status })
            res.json({ msg: 'Se ha actualizado' })
        } catch (error) {
            console.log(colores.bgRed('Ha ocurrido un error. Detalles a continuación'))
            console.log(error)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

}