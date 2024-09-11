import { NextFunction, Request,Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY =  process.env.SECRET_KEY || "asd"

export const CheckCredentialsMiddelware = (req: Request, res: Response, next:NextFunction) => {
    const token = req.headers['authorization'];

    if (!token || !Object.keys(req.headers).includes("authorization")) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    // Verificar el token
    jwt.verify(token,SECRET_KEY, (err: any, decoded: any) => {
        console.log(err)
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        next();
    });
}