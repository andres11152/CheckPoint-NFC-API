import { Router } from 'express';
import multer from 'multer';
import { AppDataSource } from '../../config/data-source';
import { StudentTypeOrmRepository } from '../../persistence/repositories/StudentTypeOrmRepository';
import { StudentUseCases } from '../../../domain/use-cases/StudentUseCases';
import { StudentController } from '../controllers/StudentController';
import { authMiddleware } from '../middlewares/authMiddleware'; // 1. Importa el middleware

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// --- Inyección de Dependencias ----
const studentRepository = new StudentTypeOrmRepository(AppDataSource);
const studentService = new StudentUseCases(studentRepository);
const studentController = new StudentController(studentService);

// 2. Aplica el middleware a TODAS las rutas de este archivo
router.use(authMiddleware);

// --- Definición de Rutas (ahora todas están protegidas) ---
router.post('/students', (req, res) => studentController.createStudent(req, res));
router.get('/students', (req, res) => studentController.getAllStudents(req, res));
router.get('/students/:id', (req, res) => studentController.getStudentById(req, res));
router.put('/students/:id', (req, res) => studentController.updateStudent(req, res));
router.delete('/students/:id', (req, res) => studentController.deleteStudent(req, res));

// Ruta para la importación de archivo Excel
router.post('/students/import', upload.single('file'), (req, res) => studentController.importStudents(req, res));

export default router;