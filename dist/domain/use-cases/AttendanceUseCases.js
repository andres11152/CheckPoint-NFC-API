"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceUseCases = void 0;
const uuid_1 = require("uuid");
const Attendance_1 = require("../entities/Attendance");
const pdfkit_1 = __importDefault(require("pdfkit"));
const xlsx = __importStar(require("xlsx"));
class AttendanceUseCases {
    constructor(attendanceRepository, studentRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
    }
    registerAttendance(nfcId) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.studentRepository.findByNfcId(nfcId);
            if (!student) {
                throw new Error('Estudiante no encontrado con ese tag NFC.');
            }
            const lastAttendance = yield this.attendanceRepository.findLastByStudentId(student.id);
            const newAttendanceType = !lastAttendance || lastAttendance.type === Attendance_1.AttendanceType.EXIT
                ? Attendance_1.AttendanceType.ENTRY
                : Attendance_1.AttendanceType.EXIT;
            const newAttendance = new Attendance_1.Attendance((0, uuid_1.v4)(), student, newAttendanceType);
            return this.attendanceRepository.save(newAttendance);
        });
    }
    getAttendanceHistory(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.attendanceRepository.find(filters);
        });
    }
    exportHistoryToExcel(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.getAttendanceHistory(filters);
            const formattedData = records.map(record => ({
                'Estudiante': record.student ? `${record.student.name} ${record.student.lastName}` : 'Desconocido',
                'Fecha y Hora': new Date(record.timestamp).toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
                'Tipo': record.type === 'entry' ? 'Entrada' : 'Salida',
            }));
            const worksheet = xlsx.utils.json_to_sheet(formattedData);
            const workbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook, worksheet, 'Asistencias');
            // --- AJUSTE CLAVE AQUÍ ---
            // Cambiamos la forma en que se genera el buffer para mayor compatibilidad
            const workbookOutput = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            return Buffer.from(workbookOutput);
        });
    }
    exportHistoryToPdf(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.getAttendanceHistory(filters);
            const doc = new pdfkit_1.default();
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
                const buffers = [];
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => resolve(Buffer.concat(buffers)));
                doc.end();
            });
        });
    }
}
exports.AttendanceUseCases = AttendanceUseCases;
