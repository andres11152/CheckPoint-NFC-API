import { DataSource, Repository } from 'typeorm';
import { Student } from '../../../domain/entities/Student.js';
import { StudentRepositoryPort } from '../../../domain/ports/out/StudentRepositoryPort.js';
import { StudentSchema } from '../entities/StudentSchema.js';

export class StudentTypeOrmRepository implements StudentRepositoryPort {
  private repository: Repository<Student>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(StudentSchema);
  }

  /**
   * Mapeador para convertir un objeto simple de la base de datos
   * en una instancia de la clase de dominio `Student`.
   */
  private toDomain(plainStudent: Student | null): Student | null {
    if (!plainStudent) {
      return null;
    }
    const student = new Student(
      plainStudent.id,
      plainStudent.name,
      plainStudent.lastName,
      plainStudent.nfcId
    );
    // Se preserva la fecha de creación original de la base de datos
    (student as any).createdAt = plainStudent.createdAt; 
    return student;
  }

  async save(student: Student): Promise<Student> {
    const savedStudent = await this.repository.save(student);
    return this.toDomain(savedStudent)!; // Se retorna una instancia de la clase
  }

  async update(student: Student): Promise<Student> {
    const updatedStudent = await this.repository.save(student);
    return this.toDomain(updatedStudent)!; // Se retorna una instancia de la clase
  }

  async findById(id: string): Promise<Student | null> {
    const plainStudent = await this.repository.findOne({ where: { id } });
    return this.toDomain(plainStudent); // Se retorna una instancia de la clase
  }

  async findByNfcId(nfcId: string): Promise<Student | null> {
    const plainStudent = await this.repository.findOne({ where: { nfcId } });
    return this.toDomain(plainStudent); // Se retorna una instancia de la clase
  }

  async findAll(): Promise<Student[]> {
    const plainStudents = await this.repository.find();
    // Se convierte cada objeto del arreglo en una instancia de la clase
    return plainStudents.map(student => this.toDomain(student)!);
  }

  async deleteById(id: string): Promise<boolean> {
    const deleteResult = await this.repository.delete(id);
    return !!deleteResult.affected && deleteResult.affected > 0;
  }
}