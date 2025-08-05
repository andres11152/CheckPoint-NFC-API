import { DataSource, Repository } from "typeorm";
import { Student } from "../../../domain/entities/Student";
import { StudentRepositoryPort } from "../../../domain/ports/out/StudentRepositoryPort";
import { StudentSchema } from "../entities/StudentSchema";
import { CreateStudentDto } from '../../../domain/ports/in/StudentServicePort';
import { v4 as uuidv4 } from 'uuid';

export class StudentTypeOrmRepository implements StudentRepositoryPort {
  private repository: Repository<Student>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(StudentSchema);
  }

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
    (student as any).createdAt = plainStudent.createdAt;
    return student;
  }

  async save(student: Student): Promise<Student> {
    const savedStudent = await this.repository.save(student);
    return this.toDomain(savedStudent)!;
  }

  async update(student: Student): Promise<Student> {
    const updatedStudent = await this.repository.save(student);
    return this.toDomain(updatedStudent)!;
  }

  async findById(id: string): Promise<Student | null> {
    const plainStudent = await this.repository.findOne({ where: { id } });
    return this.toDomain(plainStudent);
  }

  async findByNfcId(nfcId: string): Promise<Student | null> {
    console.log("Buscando por nfcId:", `"${nfcId}"`);
    const plainStudent = await this.repository.findOne({ where: { nfcId } });
    return this.toDomain(plainStudent);
  }

  async findAll(): Promise<Student[]> {
    const plainStudents = await this.repository.find();
    return plainStudents.map((student) => this.toDomain(student)!);
  }

  async deleteById(id: string): Promise<boolean> {
    const deleteResult = await this.repository.delete(id);
    return !!deleteResult.affected && deleteResult.affected > 0;
  }

  // ✅ BULK CREATE - AJUSTE SEGURO
  async bulkCreate(students: CreateStudentDto[]): Promise<void> {
    const studentEntities = students.map(dto => ({
      id: uuidv4(), // Generar uuid manualmente por cada estudiante
      name: dto.name,
      lastName: dto.lastName,
      nfcId: dto.nfcId,
      createdAt: new Date()
    }));

    await this.repository
      .createQueryBuilder()
      .insert()
      .into(StudentSchema)
      .values(studentEntities)
      .execute();
  }
}
