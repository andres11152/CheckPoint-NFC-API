import { v4 as uuidv4 } from 'uuid';
import { Attendance, AttendanceType } from '../entities/Attendance';
import { AttendanceHistoryFilters, AttendanceServicePort } from '../ports/in/AttendanceServicePort';
import { AttendanceRepositoryPort } from '../ports/out/AttendanceRepositoryPort';
import { StudentRepositoryPort } from '../ports/out/StudentRepositoryPort';
import PDFDocument from 'pdfkit';
import * as xlsx from 'xlsx';

export class AttendanceUseCases implements AttendanceServicePort {
  constructor(
    private readonly attendanceRepository: AttendanceRepositoryPort,
    private readonly studentRepository: StudentRepositoryPort
  ) {}

  async registerAttendance(data: { nfcId?: string; studentId?: string }): Promise<Attendance> {
    let studentId = data.studentId;

    if (!studentId && data.nfcId) {
      const student = await this.studentRepository.findByNfcId(data.nfcId);
      if (!student) {
        throw new Error('Estudiante no encontrado con ese tag NFC.');
      }
      studentId = student.id;
    }

    if (!studentId) {
      throw new Error('studentId o nfcId son requeridos.');
    }

    const student = await this.studentRepository.findById(studentId);
    if (!student) {
      throw new Error('Estudiante no encontrado.');
    }

    const lastAttendance = await this.attendanceRepository.findLastByStudentId(student.id);
    const newAttendanceType =
      !lastAttendance || lastAttendance.type === AttendanceType.EXIT
        ? AttendanceType.ENTRY
        : AttendanceType.EXIT;

    const newAttendance = new Attendance(uuidv4(), student, newAttendanceType);

    return this.attendanceRepository.save(newAttendance);
  }

  async getAttendanceHistory(filters: AttendanceHistoryFilters): Promise<Attendance[]> {
    return this.attendanceRepository.find(filters);
  }

  async exportHistoryToExcel(filters: AttendanceHistoryFilters): Promise<Buffer> {
    const records = await this.getAttendanceHistory(filters);

    const formattedData = records.map(record => ({
      'Estudiante': record.student ? `${record.student.name} ${record.student.lastName}` : 'Desconocido',
      'Fecha y Hora': new Date(record.timestamp).toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
      'Tipo': record.type === 'entry' ? 'Entrada' : 'Salida',
    }));

    const worksheet = xlsx.utils.json_to_sheet(formattedData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Asistencias');

    const workbookOutput = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    return Buffer.from(workbookOutput);
  }

  async exportHistoryToPdf(filters: AttendanceHistoryFilters): Promise<Buffer> {
    const records = await this.getAttendanceHistory(filters);
    const doc = new PDFDocument();

    doc.fontSize(18).text('Reporte de Asistencia', { align: 'center' });
    doc.moveDown();

    records.forEach((record) => {
      const studentName = record.student
        ? `${record.student.name} ${record.student.lastName}`
        : 'Estudiante Desconocido';

      const date = record.timestamp.toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
      });
      const type = record.type === 'entry' ? 'Entrada' : 'Salida';
      doc.fontSize(12).text(`${studentName} - ${type} - ${date}`);
    });

    return new Promise((resolve) => {
      const buffers: any[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.end();
    });
  }
}
