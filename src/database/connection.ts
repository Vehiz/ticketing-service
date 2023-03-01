import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import { DB_URL } from '../config'

export const dbConnection = ()=>{
    mongoose.set('strictQuery', false)
    mongoose.connect(DB_URL)
    console.log('Db connected')
}