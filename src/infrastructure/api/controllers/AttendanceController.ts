import { Request, Response } from 'express';
import { AttendanceServicePort } from '../../../domain/ports/in/AttendanceServicePort';

export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceServicePort) {}

  async register(req: Request, res: Response): Promise<void> {
  try {
    const { nfcId, studentId, status } = req.body;

    // Validación: al menos uno debe venir
    if (!nfcId && !studentId) {
      res.status(400).json({ message: 'El nfcId o studentId es requerido.' });
      return;
    }

    // Llamar al caso de uso con un DTO que soporte ambos
    const attendance = await this.attendanceService.registerAttendance({ nfcId, studentId, status });

    res.status(201).json(attendance);
  } catch (error: any) {
    if (error.message.includes('Estudiante no encontrado')) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
  }
}


  async getHistory(req: Request, res: Response): Promise<void> {
    try {
      // Los filtros vienen del query string, ej: /history?studentId=123&startDate=...
      const history = await this.attendanceService.getAttendanceHistory(req.query);
      res.status(200).json(history);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async exportPdf(req: Request, res: Response): Promise<void> {
    try {
      const pdfBuffer = await this.attendanceService.exportHistoryToPdf(req.query);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=reporte_asistencia.pdf');
      res.send(pdfBuffer);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  
   async exportExcel(req: Request, res: Response): Promise<void> {
    try {
      const excelBuffer = await this.attendanceService.exportHistoryToExcel(req.query);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=reporte_asistencia.xlsx');
      res.send(excelBuffer);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}