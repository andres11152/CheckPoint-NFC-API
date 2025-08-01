import { Router } from 'express';
import { AppDataSource } from '../../config/data-source.js';
import { AdminTypeOrmRepository } from '../../persistence/repositories/AdminTypeOrmRepository.js';
import { AuthUseCases } from '../../../domain/use-cases/AuthUseCases.js';
import { AuthController } from '../controllers/AuthController.js';

const router = Router();

// --- Inyección de Dependencias Manual ---
const adminRepository = new AdminTypeOrmRepository(AppDataSource);
const authService = new AuthUseCases(adminRepository);
const authController = new AuthController(authService);

// --- Ruta de login SIN middleware de autenticación ---
router.post('/login', (req, res) => authController.login(req, res));

export default router;
