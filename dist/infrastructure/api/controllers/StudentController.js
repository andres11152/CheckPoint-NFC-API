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
exports.StudentController = void 0;
class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    createStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield this.studentService.createStudent(req.body);
                res.status(201).json(student);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getAllStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield this.studentService.getAllStudents();
                res.status(200).json(students);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getStudentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield this.studentService.findStudentById(req.params.id);
                if (student) {
                    res.status(200).json(student);
                }
                else {
                    res.status(404).json({ message: 'Estudiante no encontrado.' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield this.studentService.updateStudent(req.params.id, req.body);
                if (student) {
                    res.status(200).json(student);
                }
                else {
                    res.status(404).json({ message: 'Estudiante no encontrado.' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.studentService.deleteStudent(req.params.id);
                if (success) {
                    res.status(204).send(); // No Content
                }
                else {
                    res.status(404).json({ message: 'Estudiante no encontrado.' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    importStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    res.status(400).json({ message: 'No se ha subido ningún archivo.' });
                    return;
                }
                const result = yield this.studentService.importStudentsFromExcel(req.file.buffer);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.StudentController = StudentController;
