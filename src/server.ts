import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes'
import { corsConfig } from './config/cors';
import cors from 'cors'

dotenv.config() // cargar variables definidas en fichero .env

connectDB()


const server = express()

server.use(cors(corsConfig))

// habilitar json
server.use(express.json())

// Routes
server.use('/api/projects', projectRoutes)

export default server