// express.d.ts
import { JwtPayload } from 'jsonwebtoken';
import { UserInterface } from './interfaces/UserInterface';

declare module 'express' {
  export interface Request {
    user?: JwtPayload | UserInterface; 
  }
}