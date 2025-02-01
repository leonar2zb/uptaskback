import type { Response, Request, NextFunction } from "express"
import Project, { IProject } from "../models/Project"

// Redefinir el Interface Request de Express para agregar la propiedad personalizada
// project que agregaremos en el middleware para pasar al siguiente
declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export const validateProjectExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params
        const project = await Project.findById(projectId)
        if (!project) {
            const error = new Error('Proyecto no encontrado')
            res.status(404).json({ error: error.message })
            return
        }
        req.project = project
        next()
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' })
        return
    }

}