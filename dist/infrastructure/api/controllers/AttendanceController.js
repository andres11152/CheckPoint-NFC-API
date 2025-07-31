export class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async register(req, res) {
        try {
            const { nfcId } = req.body;
            if (!nfcId) {
                res.status(400).json({ message: 'El nfcId es requerido.' });
                return;
            }
            const attendance = await this.attendanceService.registerAttendance(nfcId);
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
    }
    async getHistory(req, res) {
        try {
            // Los filtros vienen del query string, ej: /history?studentId=123&startDate=...
            const history = await this.attendanceService.getAttendanceHistory(req.query);
            res.status(200).json(history);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async exportPdf(req, res) {
        try {
            const pdfBuffer = await this.attendanceService.exportHistoryToPdf(req.query);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=reporte_asistencia.pdf');
            res.send(pdfBuffer);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async exportExcel(req, res) {
        try {
            const excelBuffer = await this.attendanceService.exportHistoryToExcel(req.query);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=reporte_asistencia.xlsx');
            res.send(excelBuffer);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
