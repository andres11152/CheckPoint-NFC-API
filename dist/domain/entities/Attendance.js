// src/domain/entities/Attendance.ts
export var AttendanceType;
(function (AttendanceType) {
    AttendanceType["ENTRY"] = "entry";
    AttendanceType["EXIT"] = "exit";
})(AttendanceType || (AttendanceType = {}));
export class Attendance {
    // El constructor ahora recibe el objeto Student
    constructor(id, student, type) {
        this.id = id;
        this.student = student;
        this.type = type;
        this.timestamp = new Date();
    }
}
