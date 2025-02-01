import { Router } from "express"
import { ProjectController } from "../controllers/ProjectController"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation"
import { TaskController } from "../controllers/TaskController"
import { validateProjectExists } from "../middleware/project"

const router = Router()

router.post('/',
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    handleInputErrors,
    ProjectController.createProject)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id').exists().withMessage('Debe especificar el id'),
    param('id').isMongoId().withMessage('ID incorrecto.'),
    handleInputErrors,
    ProjectController.getProjectById)

router.put('/:id',
    param('id').isMongoId().withMessage('ID incorrecto.'),
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    handleInputErrors,
    ProjectController.updateProject)

router.delete('/:id',
    param('id').isMongoId().withMessage('ID incorrecto.'),
    handleInputErrors,
    ProjectController.deleteProject)

router.post('/:projectId/tasks',
    param('projectId').isMongoId().withMessage('ID incorrecto.'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    handleInputErrors,
    validateProjectExists,
    TaskController.createTask)

router.get('/:projectId/tasks',
    param('projectId').isMongoId().withMessage('ID incorrecto.'),
    handleInputErrors,
    validateProjectExists,
    TaskController.getTasks)

router.get('/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage('ID incorrecto.'),
    param('taskId').isMongoId().withMessage('ID incorrecto.'),
    handleInputErrors,
    validateProjectExists,
    TaskController.getTaskById)

export default router