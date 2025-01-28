import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db';

dotenv.config() // cargar variables definidas en fichero .env

connectDB()


const server = express()

export default server