import { v4 as uuidv4 } from 'uuid';
import * as xlsx from 'xlsx';
import { Student } from '../entities/Student';
import { CreateStudentDto, StudentServicePort, UpdateStudentDto } from '../ports/in/StudentServicePort';
import { StudentRepositoryPort } from '../ports/out/StudentRepositoryPort';

// Implementa el puerto de entrada, definiendo CÓMO se realizan las operaciones.
export class StudentUseCases implements StudentServicePort {
  
  // La lógica depende de un repositorio (puerto de salida) que se inyecta.
  constructor(private readonly studentRepository: StudentRepositoryPort) {}

  async createStudent(studentData: CreateStudentDto): Promise<Student> {
    const student = new Student(
      uuidv4(),
      studentData.name,
      studentData.lastName,
      studentData.nfcId
    );
    return this.studentRepository.save(student);
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.findAll();
  }

  async findStudentById(id: string): Promise<Student | null> {
    return this.studentRepository.findById(id);
  }

  async updateStudent(id: string, studentData: UpdateStudentDto): Promise<Student | null> {
    const existingStudent = await this.studentRepository.findById(id);
    if (!existingStudent) {
      return null;
    }
    
    // Actualiza solo los campos proporcionados
    Object.assign(existingStudent, studentData);

    return this.studentRepository.update(existingStudent);
  }

  async deleteStudent(id: string): Promise<boolean> {
    return this.studentRepository.deleteById(id);
  }
  async findByNfcId(nfcId: string): Promise<Student | null> {
  return this.studentRepository.findByNfcId(nfcId);
}


  async importStudentsFromExcel(fileBuffer: Buffer): Promise<{ success: boolean; message: string; }> {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json<{ Nombre: string; Apellido: string; ID_NFC: string }>(worksheet);

    try {
      for (const row of data) {
        if (!row.Nombre || !row.Apellido || !row.ID_NFC) {
          console.warn('Fila inválida en Excel, omitiendo:', row);
          continue;
        }
        const studentDto: CreateStudentDto = {
          name: row.Nombre,
          lastName: row.Apellido,
          nfcId: String(row.ID_NFC),
        };
        await this.createStudent(studentDto);
      }
      return { success: true, message: 'Estudiantes importados correctamente.' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error durante la importación.' };
    }
  }
}