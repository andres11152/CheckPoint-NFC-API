import { Student } from '../../../domain/entities/Student.js';
import { StudentSchema } from '../entities/StudentSchema.js';
export class StudentTypeOrmRepository {
    constructor(dataSource) {
        this.repository = dataSource.getRepository(StudentSchema);
    }
    /**
     * Mapeador para convertir un objeto simple de la base de datos
     * en una instancia de la clase de dominio `Student`.
     */
    toDomain(plainStudent) {
        if (!plainStudent) {
            return null;
        }
        const student = new Student(plainStudent.id, plainStudent.name, plainStudent.lastName, plainStudent.nfcId);
        // Se preserva la fecha de creación original de la base de datos
        student.createdAt = plainStudent.createdAt;
        return student;
    }
    async save(student) {
        const savedStudent = await this.repository.save(student);
        return this.toDomain(savedStudent); // Se retorna una instancia de la clase
    }
    async update(student) {
        const updatedStudent = await this.repository.save(student);
        return this.toDomain(updatedStudent); // Se retorna una instancia de la clase
    }
    async findById(id) {
        const plainStudent = await this.repository.findOne({ where: { id } });
        return this.toDomain(plainStudent); // Se retorna una instancia de la clase
    }
    async findByNfcId(nfcId) {
        const plainStudent = await this.repository.findOne({ where: { nfcId } });
        return this.toDomain(plainStudent); // Se retorna una instancia de la clase
    }
    async findAll() {
        const plainStudents = await this.repository.find();
        // Se convierte cada objeto del arreglo en una instancia de la clase
        return plainStudents.map(student => this.toDomain(student));
    }
    async deleteById(id) {
        const deleteResult = await this.repository.delete(id);
        return !!deleteResult.affected && deleteResult.affected > 0;
    }
}
