import { Router } from 'express';
import { AppDataSource } from '../../config/data-source.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; // 1. Importa el middleware
// Importa las implementaciones que necesitas
import { AttendanceTypeOrmRepository } from '../../persistence/repositories/AttendanceTypeOrmRepository.js';
import { StudentTypeOrmRepository } from '../../persistence/repositories/StudentTypeOrmRepository.js';
import { AttendanceUseCases } from '../../../domain/use-cases/AttendanceUseCases.js';
import { AttendanceController } from '../controllers/AttendanceController.js';
const router = Router();
// --- Inyección de Dependencias ---
const attendanceRepository = new AttendanceTypeOrmRepository(AppDataSource);
const studentRepository = new StudentTypeOrmRepository(AppDataSource);
const attendanceService = new AttendanceUseCases(attendanceRepository, studentRepository);
const attendanceController = new AttendanceController(attendanceService);
// --- Definición de las Rutas ---
// Ruta PÚBLICA para el lector NFC
router.post('/attendance', (req, res) => attendanceController.register(req, res));
// Rutas PROTEGIDAS para el panel de administración
router.get('/attendance/history', authMiddleware, (req, res) => attendanceController.getHistory(req, res));
router.get('/attendance/export/pdf', authMiddleware, (req, res) => attendanceController.exportPdf(req, res));
router.get('/attendance/export/excel', authMiddleware, (req, res) => attendanceController.exportExcel(req, res));
export default router;
