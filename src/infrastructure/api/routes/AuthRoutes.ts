import { Router } from 'express';
import { AppDataSource } from '../../config/data-source';
import { AdminTypeOrmRepository } from '../../persistence/repositories/AdminTypeOrmRepository';
import { AuthUseCases } from '../../../domain/use-cases/AuthUseCases';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware'; // Debes tener un middleware JWT que valide el token

const router = Router();

// --- Inyección de Dependencias Manual ---
const adminRepository = new AdminTypeOrmRepository(AppDataSource);
const authService = new AuthUseCases(adminRepository);
const authController = new AuthController(authService);

// --- Ruta de login SIN middleware de autenticación ---
router.post('/login', (req, res) => authController.login(req, res));

// --- Nueva ruta para obtener usuario actual ---
router.get('/me', authMiddleware, (req, res) => {
  // El middleware debe colocar la info del usuario en req.user
  if (!req.user) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  // Devuelve info pública del usuario
  res.json({
    id: req.user.id,
    username: req.user.username,
    roles: req.user.roles || [],
  });
});

export default router;
