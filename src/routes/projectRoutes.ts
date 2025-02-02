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


// Rutas para tareas
// Nota: se pudiera validar de una vez y para todas las rutas que llevan el mismo
// parámetro projectId y ejecutar el middleware correspondiente y por tanto se pudiera
// quitar esa validación de todas y la llamada al middleware. Para eso usar esto:
// router.param('projectId', validateProjectExists) //si poner dos puntos (:)
// esto se ejecutaría antes que todas las demás. En este caso no me conviene.

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

router.put('/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage('ID incorrecto.'),
    param('taskId').isMongoId().withMessage('ID incorrecto.'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    // body('status').isIn(["pending", "onHold", "inProgress", "underReview", "completed"]).withMessage('Estado no válido'),
    handleInputErrors,
    validateProjectExists,
    TaskController.updateTaskById)

router.delete('/:projectId/tasks/:taskId',
    param('projectId').isMongoId().withMessage('ID incorrecto.'),
    param('taskId').isMongoId().withMessage('ID incorrecto.'),
    handleInputErrors,
    validateProjectExists,
    TaskController.deleteTaskById)

router.post('/:projectId/tasks/:taskId/status',
    param('projectId').isMongoId().withMessage('ID incorrecto.'),
    param('taskId').isMongoId().withMessage('ID incorrecto.'),
    body('status').isIn(["pending", "onHold", "inProgress", "underReview", "completed"]).withMessage('Estado no válido'),
    handleInputErrors,
    validateProjectExists,
    TaskController.updateStatus)

export default router