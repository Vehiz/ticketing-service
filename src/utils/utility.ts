import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../config'
import { UserPayload } from '../interface/user.dto'

export const generateToken = async(payload:UserPayload)=>{
   return jwt.sign(payload, APP_SECRET, {expiresIn:"1d"})
}