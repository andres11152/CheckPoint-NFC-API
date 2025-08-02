import { Request, Response } from 'express';
import { StudentServicePort } from '../../../domain/ports/in/StudentServicePort';

export class StudentController {
  constructor(private readonly studentService: StudentServicePort) {}

  async createStudent(req: Request, res: Response): Promise<void> {
    try {
      const student = await this.studentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllStudents(req: Request, res: Response): Promise<void> {
    try {
      const students = await this.studentService.getAllStudents();
      res.status(200).json(students);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async getStudentById(req: Request, res: Response): Promise<void> {
    try {
      const student = await this.studentService.findStudentById(req.params.id);
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: 'Estudiante no encontrado.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateStudent(req: Request, res: Response): Promise<void> {
    try {
      const student = await this.studentService.updateStudent(req.params.id, req.body);
       if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: 'Estudiante no encontrado.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteStudent(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.studentService.deleteStudent(req.params.id);
      if (success) {
        res.status(204).send(); // No Content
      } else {
        res.status(404).json({ message: 'Estudiante no encontrado.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async importStudents(req: Request, res: Response): Promise<void> {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No se ha subido ningún archivo.' });
            return;
        }
        const result = await this.studentService.importStudentsFromExcel(req.file.buffer);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }
  
  async findByNfcId(req: Request, res: Response): Promise<void> {
  try {
    const { nfcId } = req.body;

    if (!nfcId) {
      res.status(400).json({ message: 'Falta el campo nfcId.' });
      return;
    }

    const student = await this.studentService.findByNfcId(nfcId);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado.' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error interno del servidor.' });
  }
}

}