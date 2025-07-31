// src/domain/entities/Student.ts
export class Student {
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
