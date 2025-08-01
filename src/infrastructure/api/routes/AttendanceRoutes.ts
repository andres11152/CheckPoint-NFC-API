import { Router } from 'express';
import { AppDataSource } from '../../config/data-source';
import { authMiddleware } from '../middlewares/authMiddleware';

// Importa las implementaciones necesarias
import { AttendanceTypeOrmRepository } from '../../persistence/repositories/AttendanceTypeOrmRepository';
import { StudentTypeOrmRepository } from '../../persistence/repositories/StudentTypeOrmRepository';
import { AttendanceUseCases } from '../../../domain/use-cases/AttendanceUseCases';
import { AttendanceController } from '../controllers/AttendanceController';

const router = Router();

// --- Inyección de Dependencias ---
const attendanceRepository = new AttendanceTypeOrmRepository(AppDataSource);
const studentRepository = new StudentTypeOrmRepository(AppDataSource);
const attendanceService = new AttendanceUseCases(attendanceRepository, studentRepository);
const attendanceController = new AttendanceController(attendanceService);

// --- Definición de las Rutas ---

/**
 * Registro de asistencia vía NFC (PÚBLICO, sin JWT)
 * Espera { nfcId: string } en el body
 * POST /api/attendance/
 */
router.post('/', (req, res) => attendanceController.register(req, res));

/**
 * Rutas PROTEGIDAS (requieren JWT para acceso administrativo)
 * Ejemplo: /api/attendance/history
 */
router.get('/history', authMiddleware, (req, res) => attendanceController.getHistory(req, res));
router.get('/export/pdf', authMiddleware, (req, res) => attendanceController.exportPdf(req, res));
router.get('/export/excel', authMiddleware, (req, res) => attendanceController.exportExcel(req, res));

export default router;
