"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceTypeOrmRepository = void 0;
const Attendance_1 = require("../../../domain/entities/Attendance");
const Student_1 = require("../../../domain/entities/Student"); // Importar Student
const AttendanceSchema_1 = require("../entities/AttendanceSchema");
class AttendanceTypeOrmRepository {
    constructor(dataSource) {
        this.repository = dataSource.getRepository(AttendanceSchema_1.AttendanceSchema);
    }
    // --- Mapeadores de Dominio ---
    toStudentDomain(plainStudent) {
        if (!plainStudent)
            return null;
        const student = new Student_1.Student(plainStudent.id, plainStudent.name, plainStudent.lastName, plainStudent.nfcId);
        student.createdAt = plainStudent.createdAt;
        return student;
    }
    toAttendanceDomain(plainAttendance) {
        if (!plainAttendance)
            return null;
        const student = this.toStudentDomain(plainAttendance.student);
        if (!student)
            return null; // No debería pasar si hay un join
        const attendance = new Attendance_1.Attendance(plainAttendance.id, student, plainAttendance.type);
        attendance.timestamp = plainAttendance.timestamp;
        return attendance;
    }
    // -----------------------------
    save(attendance) {
        return __awaiter(this, void 0, void 0, function* () {
            const saved = yield this.repository.save(attendance);
            return this.toAttendanceDomain(saved);
        });
    }
    findLastByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const plainAttendance = yield this.repository.findOne({
                where: { student: { id: studentId } },
                order: { timestamp: 'DESC' },
                relations: ['student'],
            });
            return this.toAttendanceDomain(plainAttendance);
        });
    }
    find(filters) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const plainAttendances = yield queryBuilder.getMany();
            // Convertir cada objeto simple en una instancia de la clase Attendance
            return plainAttendances.map(att => this.toAttendanceDomain(att)).filter(att => att !== null);
        });
    }
}
exports.AttendanceTypeOrmRepository = AttendanceTypeOrmRepository;
