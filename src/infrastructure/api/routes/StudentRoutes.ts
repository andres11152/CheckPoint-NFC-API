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

// Aplica el middleware de autenticación a TODAS las rutas (excepto import, donde lo aplicamos individualmente si quieres pruebas)
router.use(authMiddleware);

// --- Definición de Rutas (relativas a /api/students) ---
router.post('/', (req, res) => studentController.createStudent(req, res));
router.get('/', (req, res) => studentController.getAllStudents(req, res));
router.get('/:id', (req, res) => studentController.getStudentById(req, res));
router.put('/:id', (req, res) => studentController.updateStudent(req, res));
router.delete('/:id', (req, res) => studentController.deleteStudent(req, res));
router.post('/nfc', (req, res) => studentController.findByNfcId(req, res));

// Ruta de prueba para debug MULTER (puedes dejarla mientras pruebas):
router.post('/import/debug', upload.single('file'), (req, res) => {
  console.log('¿Llega el archivo?:', !!req.file, req.file?.originalname);
  res.json({
    gotFile: !!req.file,
    fileName: req.file?.originalname,
    fieldName: req.file?.fieldname,
    size: req.file?.size
  });
});

// Ruta real para importación de archivo Excel
router.post('/import', upload.single('file'), async (req, res) => {
  // Puedes dejar un log aquí al menos durante pruebas:
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha subido ningún archivo.' });
  }
  // Delegar al controller:
  await studentController.importStudents(req, res);
});

export default router;
