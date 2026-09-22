# NFC Attendance API

NFC Attendance API is a secure RESTful backend to manage student attendance via NFC. It features admin authentication, student CRUD, bulk Excel import, export options, and a robust, scalable architecture.

## Features

- JWT Authentication for admin endpoints
- Register attendance via NFC (public endpoint)
- CRUD operations for students (create, update, delete, search by NFC ID)
- Bulk import students from Excel files
- Attendance history and export (PDF/Excel)
- TypeORM + Express.js + Clean Architecture (Hexagonal)
- Professional, scalable project structure

## Technologies

- Node.js / Express.js
- TypeScript
- TypeORM
- PostgreSQL (or compatible)
- JWT Authentication
- Multer (file upload)
- ExcelJS

## API Endpoints

### Authentication

- `POST /api/auth/login` — Login with credentials (returns JWT)
- `GET /api/auth/me` — Get current authenticated user (protected)

### Students

> All endpoints below require JWT in the `Authorization` header.

- `POST /api/students` — Create student
- `GET /api/students` — List all students
- `GET /api/students/:id` — Get student by ID
- `PUT /api/students/:id` — Update student
- `DELETE /api/students/:id` — Delete student
- `POST /api/students/nfc` — Find student by NFC ID
- `POST /api/students/import` — Bulk import students (Excel file, field: `file`)

### Attendance

- `POST /api/attendance` — Register attendance by NFC (public, expects `{ nfcId }`)
- `GET /api/attendance/history` — List attendance records (protected)
- `GET /api/attendance/export/pdf` — Export attendance to PDF (protected)
- `GET /api/attendance/export/excel` — Export attendance to Excel (protected)

## Setup

1. **Clone the repo**
```bash
git clone https://github.com/youruser/nfc-attendance-api.git
cd nfc-attendance-api/server
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file**
```ini
PORT=3000

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_EXPIRES_IN=1h
JWT_SECRET=
```

4. **Run migrations & start the server**
```bash
npm run typeorm migration:run
npm run dev
```

## Deployment

Production-ready. You can deploy on [Render.com](https://render.com/), [Vercel](https://vercel.com/) or any Node.js-friendly host.

---

## Folder Structure

server/
│
├── src/
│ │
│ ├── domain/
│ │ ├── entities/
│ │ │ ├── Admin.ts
│ │ │ ├── Attendance.ts
│ │ │ └── Student.ts
│ │ │
│ │ ├── ports/
│ │ │ ├── in/
│ │ │ │ ├── AttendanceServicePort.ts
│ │ │ │ ├── AuthServicePort.ts
│ │ │ │ └── StudentServicePort.ts
│ │ │ │
│ │ │ └── out/
│ │ │ ├── AdminRepositoryPort.ts
│ │ │ ├── AttendanceRepositoryPort.ts
│ │ │ └── StudentRepositoryPort.ts
│ │ │
│ │ └── use-cases/
│ │ ├── AttendanceUseCases.ts
│ │ ├── AuthUseCases.ts
│ │ └── StudentUseCases.ts
│ │
│ ├── infrastructure/
│ │ ├── api/
│ │ │ ├── controllers/
│ │ │ │ ├── AttendanceController.ts
│ │ │ │ ├── AuthController.ts
│ │ │ │ └── StudentController.ts
│ │ │ │
│ │ │ ├── middlewares/
│ │ │ │ └── authMiddleware.ts
│ │ │ │
│ │ │ └── routes/
│ │ │ ├── AttendanceRoutes.ts
│ │ │ ├── AuthRoutes.ts
│ │ │ └── StudentRoutes.ts
│ │ │
│ │ ├── config/
│ │ │ └── data-source.ts
│ │ │
│ │ └── persistence/
│ │ ├── entities/
│ │ │ └── (TypeORM entities if needed)
│ │ └── repositories/
│ │ ├── AdminTypeOrmRepository.ts
│ │ ├── AttendanceTypeOrmRepository.ts
│ │ └── StudentTypeOrmRepository.ts
│ │
│ ├── types/
│ │ └── express/
│ │ └── index.d.ts
│ │
│ └── app.ts
│
├── .env
├── .gitignore
└── README.md

---

## Security

- All admin endpoints require a valid JWT.
- Passwords are securely hashed.
- CORS enabled for secure client access.

## License

MIT

---

**Developed by Andrés Betancourt**
