import { Router } from 'express';
import { AppDataSource } from '../../config/data-source'; // Importa tu data-source
import { AdminTypeOrmRepository } from '../../persistence/repositories/AdminTypeOrmRepository';
import { AuthUseCases } from '../../../domain/use-cases/AuthUseCases';
import { AuthController } from '../controllers/AuthController';

const router = Router();

// --- Inyección de Dependencias Manual ---
// 1. Se crea una instancia del Repositorio
const adminRepository = new AdminTypeOrmRepository(AppDataSource);
// 2. Se inyecta el Repositorio en el Caso de Uso
const authService = new AuthUseCases(adminRepository);
// 3. Se inyecta el Caso de Uso en el Controlador
const authController = new AuthController(authService);

// --- Definición de la Ruta ---
router.post('/login', (req, res) => authController.login(req, res));

export default router;