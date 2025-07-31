"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const data_source_1 = require("../../config/data-source");
const StudentTypeOrmRepository_1 = require("../../persistence/repositories/StudentTypeOrmRepository");
const StudentUseCases_1 = require("../../../domain/use-cases/StudentUseCases");
const StudentController_1 = require("../controllers/StudentController");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // 1. Importa el middleware
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// --- Inyección de Dependencias ----
const studentRepository = new StudentTypeOrmRepository_1.StudentTypeOrmRepository(data_source_1.AppDataSource);
const studentService = new StudentUseCases_1.StudentUseCases(studentRepository);
const studentController = new StudentController_1.StudentController(studentService);
// 2. Aplica el middleware a TODAS las rutas de este archivo
router.use(authMiddleware_1.authMiddleware);
// --- Definición de Rutas (ahora todas están protegidas) ---
router.post('/students', (req, res) => studentController.createStudent(req, res));
router.get('/students', (req, res) => studentController.getAllStudents(req, res));
router.get('/students/:id', (req, res) => studentController.getStudentById(req, res));
router.put('/students/:id', (req, res) => studentController.updateStudent(req, res));
router.delete('/students/:id', (req, res) => studentController.deleteStudent(req, res));
// Ruta para la importación de archivo Excel
router.post('/students/import', upload.single('file'), (req, res) => studentController.importStudents(req, res));
exports.default = router;
