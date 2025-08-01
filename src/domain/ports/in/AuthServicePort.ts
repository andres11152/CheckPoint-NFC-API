import { Request } from 'express';

export interface AuthServicePort {
  login(email: string, password: string): Promise<string>; // retorna el token
  verifyToken(token: string): any; // retorna el payload o lanza error
  getUserFromRequest(req: Request): any;
}
