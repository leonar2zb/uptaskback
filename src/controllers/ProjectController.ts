import { Request, Response } from "express"
import Project from "../models/Project"
import colores from "colors"

export class ProjectController {

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json({ data: projects })
        } catch (error) {
            console.log(colores.bgRed('Error listando proyectos. Detalles a continuación'))
            console.log(error)
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        //const id = req.params['id'] como array
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            if (project)
                res.json({ data: project })
            else
                res.status(404).json({ error: 'Producto no encontrado' })
        } catch (error) {
            console.log(colores.bgRed(`Error localizando el proyecto: ${id}. Detalles a continuación`))
            console.log(error)
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findByIdAndUpdate(id, req.body, { new: true })
            if (project) {
                res.json({ data: project })
            }
            else
                res.status(404).json({ error: 'Producto no encontrado' })
        } catch (error) {
            console.log(colores.bgRed(`Error localizando el proyecto: ${id}. Detalles a continuación`))
            console.log(error)
        }
    }

    /* otra forma de actualizar: buscar, modificar y guardar. 
    Más lento(2 operaciones) pero mayor control. Escoger según necesidad
    static updateProject = async (req: Request, res: Response) => {
        //const id = req.params['id'] como array
        const { id } = req.params
        const { projectName, clientName, description } = req.body
        try {
            const project = await Project.findById(id)
            if (project) {
                project.projectName = projectName
                project.clientName = clientName
                project.description = description
                project.save()
                res.json({ data: project })
            }
            else
                res.status(404).json({ error: 'Producto no encontrado' })
        } catch (error) {
            console.log(colores.bgRed(`Error localizando el proyecto: ${id}. Detalles a continuación`))
            console.log(error)
        }
    }*/

    static createProject = async (req: Request, res: Response) => {
        try {
            const project = new Project(req.body)
            await project.save()
            // await Project.create(req.body) // Otra forma sin new y save
            console.log(colores.bgCyan(`Creado proyecto para ${project.clientName}`))
            res.json({ "data": 'Se ha creado el proyecto' })
            // res.send('Se ha creado el proyecto')
        } catch (error) {
            console.log(colores.bgRed('Ha ocurrido un error. Detalles a continuación'))
            console.log(error)
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findByIdAndDelete(id)
            /* otra forma sería buscarlo y luego borrarlo pero podemos procesar la info
            antes de borrar (pej ver si cumple algo(de un usuario, etc)) para ello se hace 
            el findById y luego si se va a borrar project.deleteOne() */
            if (project) {
                res.json({ data: 'Eliminado' })
            }
            else
                res.status(404).json({ error: 'Producto no encontrado' })
        } catch (error) {
            console.log(colores.bgRed(`Error localizando el proyecto: ${id}. Detalles a continuación`))
            console.log(error)
        }
    }
}