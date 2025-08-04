# 🏫 NFC Attendance API

RESTful API for student management and attendance tracking using NFC cards. Built with Node.js, Express, PostgreSQL, and a hexagonal architecture for scalability and maintainability. Includes JWT authentication, bulk import via Excel, attendance history, and complete Swagger documentation.

---

## 🚀 Features

- **Student Management:** Create, read, update, and delete students. Find by NFC ID.
- **Attendance Registration:** Register entries and exits, link with NFC cards.
- **Bulk Import:** Upload Excel or CSV files to create multiple students at once.
- **Authentication:** Secure endpoints with JWT-based login.
- **Swagger Documentation:** All endpoints fully documented and testable via Swagger UI.
- **Hexagonal Architecture:** Clear separation between domain, application, and infrastructure.
- **PostgreSQL Database:** Relational model, migration-ready.
- **Ready for Deploy:** Render (API), Clever Cloud (Database), AWS S3 (for file storage if needed).
- **Advanced Error Handling:** Consistent, clear error responses.
- **CORS:** Configurable for modern frontend consumption (React, Vue, etc).

---

## 🧱 Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL**
- **JWT** for authentication
- **Swagger** (swagger-ui-express)
- **CORS** and advanced middleware
- **ExcelJS/xlsx** for Excel import/export
- **Deployment:** Render, Clever Cloud, AWS S3 (optional)
- **Hexagonal Architecture (ports & adapters)**

---

## 📦 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/nfc-attendance-api.git
   cd nfc-attendance-api
Install dependencies:

bash
Copiar
Editar
npm install
# or
yarn install
Configure environment variables:
Create a .env file in the root directory with the following content (adapt to your environment):

env
Copiar
Editar
PORT=4000
DATABASE_URL=postgres://user:password@host:port/dbname
JWT_SECRET=supersecretkey
CORS_ORIGINS=https://yourfrontend.com,https://localhost:5173
Run migrations and seeds (if applicable):

bash
Copiar
Editar
# Adjust to your ORM/migration tool
npm run migrate
npm run seed
Start the server:

bash
Copiar
Editar
npm run dev
# or
yarn dev
The API will be available at http://localhost:4000 (or your chosen port).

📚 API Documentation
Once the server is running, visit:

bash
Copiar
Editar
http://localhost:4000/api/docs
You’ll find interactive Swagger documentation for all endpoints, including authentication, student management, attendance, and bulk import.

🚦 Example Endpoints
POST /api/auth/login – Login, receive JWT token

GET /api/students – List all students (requires JWT)

POST /api/students – Create student (requires JWT)

POST /api/students/import – Bulk import students via Excel/CSV (requires JWT)

POST /api/attendance – Register attendance by student (requires JWT)

GET /api/attendance – List attendance records (requires JWT)

🔒 Security
All sensitive endpoints require a valid JWT token in the Authorization: Bearer <token> header.

CORS origins are configurable in your .env file.

Never expose your JWT_SECRET or database credentials.

🛠️ Contributing
Contributions, issues, and feature requests are welcome!

Fork the repo

Create your branch (git checkout -b feature/foo)

Commit your changes

Push to your branch

Open a Pull Request

📝 License
This project is MIT licensed.

Developed by Andrés Betancourt
Contact: andres.betancourt@skycode.agency

yaml
Copiar
Editar

---

Let me know if you want a shorter version or specific examples!
