import { DataSource, Repository } from 'typeorm';
import { Attendance } from '../../../domain/entities/Attendance.js';
import { Student } from '../../../domain/entities/Student.js'; // Importar Student
import { AttendanceHistoryFilters } from '../../../domain/ports/in/AttendanceServicePort.js';
import { AttendanceRepositoryPort } from '../../../domain/ports/out/AttendanceRepositoryPort.js';
import { AttendanceSchema } from '../entities/AttendanceSchema.js';

export class AttendanceTypeOrmRepository implements AttendanceRepositoryPort {
  private repository: Repository<Attendance>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(AttendanceSchema);
  }

  // --- Mapeadores de Dominio ---
  private toStudentDomain(plainStudent: any): Student | null {
    if (!plainStudent) return null;
    const student = new Student(
      plainStudent.id,
      plainStudent.name,
      plainStudent.lastName,
      plainStudent.nfcId
    );
    (student as any).createdAt = plainStudent.createdAt;
    return student;
  }

  private toAttendanceDomain(plainAttendance: any): Attendance | null {
    if (!plainAttendance) return null;
    const student = this.toStudentDomain(plainAttendance.student);
    if (!student) return null; // No debería pasar si hay un join

    const attendance = new Attendance(
      plainAttendance.id,
      student,
      plainAttendance.type
    );
    (attendance as any).timestamp = plainAttendance.timestamp;
    return attendance;
  }
  // -----------------------------

  async save(attendance: Attendance): Promise<Attendance> {
    const saved = await this.repository.save(attendance);
    return this.toAttendanceDomain(saved)!;
  }

  async findLastByStudentId(studentId: string): Promise<Attendance | null> {
    const plainAttendance = await this.repository.findOne({
      where: { student: { id: studentId } },
      order: { timestamp: 'DESC' },
      relations: ['student'],
    });
    return this.toAttendanceDomain(plainAttendance);
  }

  async find(filters: AttendanceHistoryFilters): Promise<Attendance[]> {
    const queryBuilder = this.repository.createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.student', 'student')
      .orderBy('attendance.timestamp', 'DESC');

    if (filters.studentId) {
      queryBuilder.andWhere('attendance.student.id = :studentId', { studentId: filters.studentId });
    }
    if (filters.startDate) {
      queryBuilder.andWhere('attendance.timestamp >= :startDate', { startDate: filters.startDate });
    }
    if (filters.endDate) {
      queryBuilder.andWhere('attendance.timestamp <= :endDate', { endDate: filters.endDate });
    }
    
    const plainAttendances = await queryBuilder.getMany();
    
    // Convertir cada objeto simple en una instancia de la clase Attendance
    return plainAttendances.map(att => this.toAttendanceDomain(att)!).filter(att => att !== null);
  }
}