import { Request, Response } from "express"
import Project from "../models/Projects"
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
}