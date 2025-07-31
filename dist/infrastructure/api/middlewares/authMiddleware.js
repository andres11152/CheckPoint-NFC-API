"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    // 1. Obtener el token del encabezado de autorización
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }
    const token = authHeader.split(' ')[1]; // Extrae el token de "Bearer <token>"
    // 2. Verificar el token
    try {
        const secret = process.env.JWT_SECRET || 'una-clave-secreta-por-defecto-muy-segura';
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // 3. (Opcional) Añadir el payload decodificado a la petición para uso futuro
        req.user = decoded;
        // 4. Continuar con el siguiente middleware o controlador
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};
exports.authMiddleware = authMiddleware;
