NFC Attendance API
A robust backend API for managing student attendance via NFC technology. Built with Node.js, Express, TypeScript, and TypeORM, this project enables schools or organizations to manage students, register attendance via NFC cards, and perform bulk student imports from Excel files. The API is secure, supports JWT authentication, and is production-ready (deployed on Render).

🚀 Features
User Authentication: Secure JWT-based login and user info retrieval.

Student Management: CRUD operations for students, including NFC card management.

Attendance Registration: Register attendance via NFC or manually.

Bulk Import: Import students in bulk from Excel/CSV.

Export: Export attendance history to PDF or Excel.

Role-based Access: Protected endpoints for admin actions.

TypeORM + PostgreSQL: Clean and scalable database integration.

🗂️ Project Structure
bash
Copiar
Editar
src/
  |- application/         # Use cases & service logic
  |- core/                # Domain models & interfaces
  |- infrastructure/
      |- api/             # Express routes, controllers, middlewares
      |- config/          # TypeORM & app config
      |- persistence/     # TypeORM repositories
  |- index.ts             # App entry point (Express setup)
🌐 API Endpoints
Auth (/api/auth)
POST /login
Authenticate and obtain JWT token.

GET /me
Get current user info (requires JWT).

Students (/api/students)
All require Authorization: Bearer <token>

POST /
Create a student.

GET /
List all students.

GET /:id
Get student by ID.

PUT /:id
Update student.

DELETE /:id
Delete student.

POST /nfc
Find by NFC ID.

POST /import
Bulk import students (file upload).

Attendance (/api/attendance)
POST /
Register attendance by NFC ID (public endpoint, no JWT required).

GET /history
Get attendance records (admin only).

GET /export/pdf
Export history as PDF (admin only).

GET /export/excel
Export history as Excel (admin only).

🔐 Authentication
Login via /api/auth/login (POST)
Returns a JWT token.

Protected endpoints require Authorization: Bearer <token> in headers.

🏃‍♂️ Quick Start
1. Clone the repository
bash
Copiar
Editar
git clone https://github.com/your-username/nfc-attendance-api.git
cd nfc-attendance-api
2. Install dependencies
bash
Copiar
Editar
npm install
3. Configure environment variables
Create a .env file in the root:

ini
Copiar
Editar
PORT=3000
DATABASE_URL=postgres://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret
4. Run database migrations (if needed)
bash
Copiar
Editar
npm run typeorm migration:run
5. Start the server
bash
Copiar
Editar
npm run dev    # for development (nodemon)
npm run build  # build for production
npm start      # run in production
🧪 Example Usage
Login

http
Copiar
Editar
POST /api/auth/login
{
  "username": "admin",
  "password": "admin123"
}
Response:

json
Copiar
Editar
{ "token": "..." }
Import students from Excel/CSV

Endpoint: POST /api/students/import

Content-Type: multipart/form-data

Field: file

📦 Deployment
Production-ready: Render or your preferred Node.js cloud provider.

Uses environment variables for all secrets.

Connects to PostgreSQL (can adapt to MySQL, etc. with TypeORM).

⚙️ Tech Stack
Node.js, Express.js

TypeScript

TypeORM

PostgreSQL

Multer (file upload)

JWT (auth)

ExcelJS (Excel parsing)

PDFKit (PDF export)

Modern folder structure (Clean/Hexagonal/DDD)

👤 Author
Andrés Betancourt

LinkedIn

GitHub

📄 License
MIT

⭐ Want to contribute?
Pull requests are welcome! Please open issues or discussions for bugs or suggestions.

Let me know if you want a Spanish version or to add specific setup/usage notes! 🚀
