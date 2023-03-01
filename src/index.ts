import express from 'express';
import { expressApp } from './app';
import { dbConnection } from './database/connection';
import {PORT} from './config';

const Server = async()=>{
    const app = express();
    // const PORT = 4001
     dbConnection()
    await expressApp(app)

    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
    }).on('error', (err)=>{
        console.log(err)
        process.exit(1)
    })
}

Server()
