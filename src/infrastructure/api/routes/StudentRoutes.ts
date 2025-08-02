import { Router } from 'express';
import multer from 'multer';
import { AppDataSource } from '../../config/data-source';
import { StudentTypeOrmRepository } from '../../persistence/repositories/StudentTypeOrmRepository';
import { StudentUseCases } from '../../../domain/use-cases/StudentUseCases';
import { StudentController } from '../controllers/StudentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// --- Inyección de Dependencias ----
const studentRepository = new StudentTypeOrmRepository(AppDataSource);
const studentService = new StudentUseCases(studentRepository);
const studentController = new StudentController(studentService);

// Aplica el middleware a TODAS las rutas
router.use(authMiddleware);

// --- Definición de Rutas (relativas a /api/students) ---
router.post('/', (req, res) => studentController.createStudent(req, res));
router.get('/', (req, res) => studentController.getAllStudents(req, res));
router.get('/:id', (req, res) => studentController.getStudentById(req, res));
router.put('/:id', (req, res) => studentController.updateStudent(req, res));
router.delete('/:id', (req, res) => studentController.deleteStudent(req, res));
router.post('/nfc', (req, res) => studentController.findByNfcId(req, res));

// Ruta para importación de archivo Excel
router.post('/import', upload.single('file'), (req, res) => studentController.importStudents(req, res));

export default router;
