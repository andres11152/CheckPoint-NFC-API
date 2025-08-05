import { Student } from '../../entities/Student';
import { CreateStudentDto } from '../../../domain/ports/in/StudentServicePort';

export interface StudentRepositoryPort {
  /**
   * Guarda un nuevo estudiante en la base de datos.
   * @param student - La entidad de dominio a guardar.
   * @returns La entidad guardada.
   */
  save(student: Student): Promise<Student>;

  /**
   * Actualiza un estudiante existente.
   * @param student - La entidad con los datos actualizados.
   * @returns La entidad actualizada.
   */
  update(student: Student): Promise<Student>;

  /**
   * Busca un estudiante por su ID.
   * @param id - El ID del estudiante.
   * @returns La entidad Student o null si no se encuentra.
   */
  findById(id: string): Promise<Student | null>;

  /**
   * Busca un estudiante por su ID de NFC.
   * @param nfcId - El ID del tag NFC asociado.
   * @returns La entidad Student o null si no se encuentra.
   */
  findByNfcId(nfcId: string): Promise<Student | null>;

  /**
   * Obtiene todos los estudiantes.
   * @returns Un arreglo de todas las entidades Student.
   */
  findAll(): Promise<Student[]>;

  /**
   * Elimina un estudiante por su ID.
   * @param id - El ID del estudiante a eliminar.
   * @returns `true` si se eliminó, `false` si no.
   */
  deleteById(id: string): Promise<boolean>;

  bulkCreate(students: CreateStudentDto[]): Promise<void>;  

}