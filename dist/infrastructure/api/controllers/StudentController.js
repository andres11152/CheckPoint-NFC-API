export class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async createStudent(req, res) {
        try {
            const student = await this.studentService.createStudent(req.body);
            res.status(201).json(student);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAllStudents(req, res) {
        try {
            const students = await this.studentService.getAllStudents();
            res.status(200).json(students);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getStudentById(req, res) {
        try {
            const student = await this.studentService.findStudentById(req.params.id);
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
    }
    async updateStudent(req, res) {
        try {
            const student = await this.studentService.updateStudent(req.params.id, req.body);
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
    }
    async deleteStudent(req, res) {
        try {
            const success = await this.studentService.deleteStudent(req.params.id);
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
    }
    async importStudents(req, res) {
        try {
            if (!req.file) {
                res.status(400).json({ message: 'No se ha subido ningún archivo.' });
                return;
            }
            const result = await this.studentService.importStudentsFromExcel(req.file.buffer);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
