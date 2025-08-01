// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendemos la interface Request para incluir user
export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader || !authHeader.toString().startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  const token = authHeader.toString().split(' ')[1];
  const secret = process.env.JWT_SECRET || 'una-clave-secreta-por-defecto';

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Guardamos el payload en req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
