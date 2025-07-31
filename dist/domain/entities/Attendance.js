"use strict";
// src/domain/entities/Attendance.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = exports.AttendanceType = void 0;
var AttendanceType;
(function (AttendanceType) {
    AttendanceType["ENTRY"] = "entry";
    AttendanceType["EXIT"] = "exit";
})(AttendanceType || (exports.AttendanceType = AttendanceType = {}));
class Attendance {
    // El constructor ahora recibe el objeto Student
    constructor(id, student, type) {
        this.id = id;
        this.student = student;
        this.type = type;
        this.timestamp = new Date();
    }
}
exports.Attendance = Attendance;
