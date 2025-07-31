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
exports.AttendanceController = void 0;
class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nfcId } = req.body;
                if (!nfcId) {
                    res.status(400).json({ message: 'El nfcId es requerido.' });
                    return;
                }
                const attendance = yield this.attendanceService.registerAttendance(nfcId);
                res.status(201).json(attendance);
            }
            catch (error) {
                // Manejo de error específico si el estudiante no existe
                if (error.message.includes('Estudiante no encontrado')) {
                    res.status(404).json({ message: error.message });
                    return;
                }
                res.status(500).json({ message: error.message });
            }
        });
    }
    getHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Los filtros vienen del query string, ej: /history?studentId=123&startDate=...
                const history = yield this.attendanceService.getAttendanceHistory(req.query);
                res.status(200).json(history);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    exportPdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pdfBuffer = yield this.attendanceService.exportHistoryToPdf(req.query);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=reporte_asistencia.pdf');
                res.send(pdfBuffer);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    exportExcel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const excelBuffer = yield this.attendanceService.exportHistoryToExcel(req.query);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=reporte_asistencia.xlsx');
                res.send(excelBuffer);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.AttendanceController = AttendanceController;
