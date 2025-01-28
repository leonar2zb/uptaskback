import mongoose from "mongoose";
import colors from 'colors'
import { exit } from 'node:process'

export const connectDB = async () => {
    try {        
        const { connection } = await mongoose.connect(process.env.DATABASE_URL)
        console.log(colors.cyan(`Conectado a ${connection.host} puerto ${connection.port}`))
    } catch (error) {
        console.log(colors.bgRed('Error conectando. Detalles a continuación'))
        console.log(error)
        exit(1)
    }
}