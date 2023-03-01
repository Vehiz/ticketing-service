import { Router } from "express";
import { updateUser } from "../controller/userController";
import userRouter from '../routes/userRoutes';


const v1 = Router()

v1.use("/user", userRouter )


export default v1;