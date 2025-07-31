// src/domain/entities/Attendance.ts

import { Student } from './Student'; // <-- Importa la clase Student

export enum AttendanceType {
  ENTRY = 'entry',
  EXIT = 'exit',
}

export class Attendance {
  readonly id: string;
  readonly student: Student; // <-- Cambia studentId por el objeto completo
  readonly timestamp: Date;
  readonly type: AttendanceType;

  // El constructor ahora recibe el objeto Student
  constructor(id: string, student: Student, type: AttendanceType) {
    this.id = id;
    this.student = student;
    this.type = type;
    this.timestamp = new Date();
  }
}