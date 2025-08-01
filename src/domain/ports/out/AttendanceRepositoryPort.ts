import { Attendance } from '../../entities/Attendance';
import { AttendanceHistoryFilters } from '../in/AttendanceServicePort'; // Reutilizamos los filtros

export interface AttendanceRepositoryPort {
  /**
   * Guarda un nuevo registro de asistencia.
   * @param attendance - La entidad de asistencia a guardar.
   * @returns La entidad guardada.
   */
  save(attendance: Attendance): Promise<Attendance>;

  /**
   * Busca el último registro de asistencia para un estudiante específico.
   * @param studentId - El ID del estudiante.
   * @returns El último registro de Attendance o null si no hay ninguno.
   */
  findLastByStudentId(studentId: string): Promise<Attendance | null>;

  /**
   * Busca registros de asistencia aplicando filtros.
   * @param filters - Los filtros de búsqueda (studentId, fechas).
   * @returns Un arreglo de registros de asistencia.
   */
  find(filters: AttendanceHistoryFilters): Promise<Attendance[]>;
}