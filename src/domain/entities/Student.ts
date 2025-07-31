// src/domain/entities/Student.ts

export class Student {
  readonly id: string; // Es solo un dato, no una columna
  name: string;
  lastName: string;
  nfcId: string;
  createdAt: Date;

  constructor(id: string, name: string, lastName: string, nfcId: string) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.nfcId = nfcId;
    this.createdAt = new Date();
  }

  // Aquí irían métodos de negocio, por ejemplo:
  getFullName(): string {
    return `${this.name} ${this.lastName}`;
  }
}