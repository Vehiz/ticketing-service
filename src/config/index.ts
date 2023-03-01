import dotEnv from 'dotenv'
dotEnv.config()

export const PORT = process.env.PORT as string
export const DB_URL = process.env.MONGO_URI as string
export const APP_SECRET = process.env.APP_SECRET as string