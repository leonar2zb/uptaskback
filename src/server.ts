import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes'

dotenv.config() // cargar variables definidas en fichero .env

connectDB()


const server = express()

// habilitar json
server.use(express.json())

// Routes
server.use('/api/projects', projectRoutes)

export default server