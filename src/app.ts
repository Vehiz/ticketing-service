import express, { Application } from 'express';
import cors from 'cors';
import logger from 'morgan';
import v1 from "./v1/v1";

export const expressApp = async(app:express.Application)=>{
    app.use(express.json())
    app.use(cors())
    app.use(logger('dev'))
    app.use('/api/v1', v1)

}