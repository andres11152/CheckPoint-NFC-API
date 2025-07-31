"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../../config/data-source");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // 1. Importa el middleware
// Importa las implementaciones que necesitas
const AttendanceTypeOrmRepository_1 = require("../../persistence/repositories/AttendanceTypeOrmRepository");
const StudentTypeOrmRepository_1 = require("../../persistence/repositories/StudentTypeOrmRepository");
const AttendanceUseCases_1 = require("../../../domain/use-cases/AttendanceUseCases");
const AttendanceController_1 = require("../controllers/AttendanceController");
const router = (0, express_1.Router)();
// --- Inyección de Dependencias ---
const attendanceRepository = new AttendanceTypeOrmRepository_1.AttendanceTypeOrmRepository(data_source_1.AppDataSource);
const studentRepository = new StudentTypeOrmRepository_1.StudentTypeOrmRepository(data_source_1.AppDataSource);
const attendanceService = new AttendanceUseCases_1.AttendanceUseCases(attendanceRepository, studentRepository);
const attendanceController = new AttendanceController_1.AttendanceController(attendanceService);
// --- Definición de las Rutas ---
// Ruta PÚBLICA para el lector NFC
router.post('/attendance', (req, res) => attendanceController.register(req, res));
// Rutas PROTEGIDAS para el panel de administración
router.get('/attendance/history', authMiddleware_1.authMiddleware, (req, res) => attendanceController.getHistory(req, res));
router.get('/attendance/export/pdf', authMiddleware_1.authMiddleware, (req, res) => attendanceController.exportPdf(req, res));
router.get('/attendance/export/excel', authMiddleware_1.authMiddleware, (req, res) => attendanceController.exportExcel(req, res));
exports.default = router;
