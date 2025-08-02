// import { Student } from '../../entities/Student';
import { Student } from '../../entities/Student';

// DTO (Data Transfer Object) para la creación de un estudiante.
// Define los datos que se esperan desde el exterior.
export type CreateStudentDto = {
  name: string;
  lastName: string;
  nfcId: string;
};

// DTO para la actualización. Hacemos los campos opcionales.
export type UpdateStudentDto = Partial<CreateStudentDto>;

export interface StudentServicePort {
  /**
   * Crea un nuevo estudiante.
   * @param studentData - Los datos para el nuevo estudiante.
   * @returns El estudiante creado.
   */
  createStudent(studentData: CreateStudentDto): Promise<Student>;

  /**
   * Obtiene todos los estudiantes.
   * @returns Un arreglo de todos los estudiantes.
   */
  getAllStudents(): Promise<Student[]>;

  /**
   * Busca un estudiante por su ID.
   * @param id - El ID del estudiante a buscar.
   * @returns El estudiante encontrado o null si no existe.
   */
  findStudentById(id: string): Promise<Student | null>;

  /**
   * Actualiza los datos de un estudiante.
   * @param id - El ID del estudiante a actualizar.
   * @param studentData - Los nuevos datos del estudiante.
   * @returns El estudiante actualizado o null si no existe.
   */
  updateStudent(id: string, studentData: UpdateStudentDto): Promise<Student | null>;

  /**
   * Elimina un estudiante.
   * @param id - El ID del estudiante a eliminar.
   * @returns `true` si se eliminó con éxito, `false` en caso contrario.
   */
  deleteStudent(id: string): Promise<boolean>;

  /**
   * Importa estudiantes masivamente desde un archivo Excel.
   * @param fileBuffer - El buffer del archivo .xlsx.
   * @returns Un objeto con el resultado de la operación.
   */
  importStudentsFromExcel(fileBuffer: Buffer): Promise<{ success: boolean; message: string; }>;

  /**
   * Busca un estudiante por su ID NFC.
   * @param nfcId - El ID NFC del estudiante.
   * @returns El estudiante encontrado o null si no existe.
   */
  findByNfcId(nfcId: string): Promise<Student | null>;
}
