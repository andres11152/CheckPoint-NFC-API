"use strict";
// src/domain/entities/Student.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(id, name, lastName, nfcId) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.nfcId = nfcId;
        this.createdAt = new Date();
    }
    // Aquí irían métodos de negocio, por ejemplo:
    getFullName() {
        return `${this.name} ${this.lastName}`;
    }
}
exports.Student = Student;
