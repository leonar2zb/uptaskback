import { Request, Response } from "express"
import Project from "../models/Projects"
import colores from "colors"

export class ProjectController {
    static getAllProjects = async (req: Request, res: Response) => {
        res.send('Listando todos los proyectos')
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