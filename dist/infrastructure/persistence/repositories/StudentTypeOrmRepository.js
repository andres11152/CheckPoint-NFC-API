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
exports.StudentTypeOrmRepository = void 0;
const Student_1 = require("../../../domain/entities/Student");
const StudentSchema_1 = require("../entities/StudentSchema");
class StudentTypeOrmRepository {
    constructor(dataSource) {
        this.repository = dataSource.getRepository(StudentSchema_1.StudentSchema);
    }
    /**
     * Mapeador para convertir un objeto simple de la base de datos
     * en una instancia de la clase de dominio `Student`.
     */
    toDomain(plainStudent) {
        if (!plainStudent) {
            return null;
        }
        const student = new Student_1.Student(plainStudent.id, plainStudent.name, plainStudent.lastName, plainStudent.nfcId);
        // Se preserva la fecha de creación original de la base de datos
        student.createdAt = plainStudent.createdAt;
        return student;
    }
    save(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedStudent = yield this.repository.save(student);
            return this.toDomain(savedStudent); // Se retorna una instancia de la clase
        });
    }
    update(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedStudent = yield this.repository.save(student);
            return this.toDomain(updatedStudent); // Se retorna una instancia de la clase
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const plainStudent = yield this.repository.findOne({ where: { id } });
            return this.toDomain(plainStudent); // Se retorna una instancia de la clase
        });
    }
    findByNfcId(nfcId) {
        return __awaiter(this, void 0, void 0, function* () {
            const plainStudent = yield this.repository.findOne({ where: { nfcId } });
            return this.toDomain(plainStudent); // Se retorna una instancia de la clase
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const plainStudents = yield this.repository.find();
            // Se convierte cada objeto del arreglo en una instancia de la clase
            return plainStudents.map(student => this.toDomain(student));
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.repository.delete(id);
            return !!deleteResult.affected && deleteResult.affected > 0;
        });
    }
}
exports.StudentTypeOrmRepository = StudentTypeOrmRepository;
