"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.StudentUseCases = void 0;
const uuid_1 = require("uuid");
const xlsx = __importStar(require("xlsx"));
const Student_1 = require("../entities/Student");
// Implementa el puerto de entrada, definiendo CÓMO se realizan las operaciones.
class StudentUseCases {
    // La lógica depende de un repositorio (puerto de salida) que se inyecta.
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    createStudent(studentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = new Student_1.Student((0, uuid_1.v4)(), studentData.name, studentData.lastName, studentData.nfcId);
            return this.studentRepository.save(student);
        });
    }
    getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.studentRepository.findAll();
        });
    }
    findStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.studentRepository.findById(id);
        });
    }
    updateStudent(id, studentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingStudent = yield this.studentRepository.findById(id);
            if (!existingStudent) {
                return null;
            }
            // Actualiza solo los campos proporcionados
            Object.assign(existingStudent, studentData);
            return this.studentRepository.update(existingStudent);
        });
    }
    deleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.studentRepository.deleteById(id);
        });
    }
    importStudentsFromExcel(fileBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet);
            try {
                for (const row of data) {
                    if (!row.Nombre || !row.Apellido || !row.ID_NFC) {
                        console.warn('Fila inválida en Excel, omitiendo:', row);
                        continue;
                    }
                    const studentDto = {
                        name: row.Nombre,
                        lastName: row.Apellido,
                        nfcId: String(row.ID_NFC),
                    };
                    yield this.createStudent(studentDto);
                }
                return { success: true, message: 'Estudiantes importados correctamente.' };
            }
            catch (error) {
                console.error(error);
                return { success: false, message: 'Error durante la importación.' };
            }
        });
    }
}
exports.StudentUseCases = StudentUseCases;
