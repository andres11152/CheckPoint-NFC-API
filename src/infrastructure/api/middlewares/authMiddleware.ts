import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extiende la interfaz Request de Express para añadir la propiedad 'user'
interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // 1. Obtener el token del encabezado de autorización
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  const token = authHeader.split(' ')[1]; // Extrae el token de "Bearer <token>"

  // 2. Verificar el token
  try {
    const secret = process.env.JWT_SECRET || 'una-clave-secreta-por-defecto-muy-segura';
    const decoded = jwt.verify(token, secret);
    
    // 3. (Opcional) Añadir el payload decodificado a la petición para uso futuro
    req.user = decoded;
    
    // 4. Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};