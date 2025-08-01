import { Attendance } from '../../entities/Attendance';

// DTO para los filtros del historial y reportes.
export type AttendanceHistoryFilters = {
  studentId?: string;
  startDate?: Date;
  endDate?: Date;
};

export interface AttendanceServicePort {
  /**
   * Registra una entrada o salida usando el ID de un tag NFC.
   * @param nfcId - El ID del tag NFC leído.
   * @returns El registro de asistencia creado.
   */
  registerAttendance(nfcId: string): Promise<Attendance>;

  /**
   * Obtiene el historial de asistencias con filtros opcionales.
   * @param filters - Filtros para acotar la búsqueda.
   * @returns Un arreglo de registros de asistencia.
   */
  getAttendanceHistory(filters: AttendanceHistoryFilters): Promise<Attendance[]>;

  /**
   * Exporta el historial de asistencias a un archivo Excel.
   * @param filters - Filtros para el reporte.
   * @returns Un buffer con el contenido del archivo .xlsx.
   */
  exportHistoryToExcel(filters: AttendanceHistoryFilters): Promise<Buffer>;
  
  /**
   * Exporta el historial de asistencias a un archivo PDF.
   * @param filters - Filtros para el reporte.
   * @returns Un buffer con el contenido del archivo .pdf.
   */
  exportHistoryToPdf(filters: AttendanceHistoryFilters): Promise<Buffer>;
}