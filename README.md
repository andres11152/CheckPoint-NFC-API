# NFC Attendance API

NFC Attendance API is a secure RESTful backend to manage student attendance via NFC. It features admin authentication, student CRUD, bulk Excel import, export options, and a robust, scalable architecture.

## Features

- 🔒 JWT Authentication for admin endpoints
- 🏷️ Register attendance via NFC (public endpoint)
- 👨‍🎓 CRUD operations for students (create, update, delete, search by NFC ID)
- 📥 Bulk import students from Excel files
- 📊 Attendance history and export (PDF/Excel)
- 🛡️ TypeORM + Express.js + Clean Architecture (Hexagonal)
- 📝 Professional, scalable project structure

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


///

Legacy Bridge - Fintech Integration Challenge
📋 Table of Contents
Overview
Architecture
Database Schema
Getting Started
Data Normalization Strategy
Rule Engine Configuration
Error Handling
Frontend Application
Video Walkthroughs
Future Roadmap
Overview
This project implements a Middleware Integration solution for Acme Corp, designed to ingest, clean, normalize, and visualize financial transaction data from a legacy XML-based banking system.

Core Challenge: The client's transaction data is locked in a legacy system that outputs raw, inconsistent XML. This solution bridges that system to a modern PostgreSQL database and serves clean, categorized data to a React frontend dashboard.

Key Features
✅ XML Parsing: Handles inconsistent XML structures (arrays vs single objects)
✅ Data Sanitization: Cleans dirty amounts ($5.50 → 5.50), messy descriptions, and non-ISO dates
✅ Normalized Database: PostgreSQL schema with Merchants and Transactions entities
✅ Extensible Rule Engine: JavaScript-based categorization via external JSON config
✅ Enterprise Security: Helmet, Rate Limiting (100 req/15min), Zod validation
✅ Structured Logging: JSON-formatted error logs with full context for observability
Architecture
The solution follows a layered architecture ensuring separation of concerns:

graph TB
    subgraph "Presentation Layer"
        A[React Frontend<br/>Port: 5173]
    end

    subgraph "Infrastructure Layer"
        B[Express REST API<br/>Port: 3001]
        C[Security Middleware<br/>Helmet + Rate Limit]
    end

    subgraph "Application Layer"
        D[Ingestion Service<br/>XML Parser]
        E[Rule Engine<br/>Categorization]
        F[Data Sanitizer<br/>Amounts, Dates, Strings]
    end

    subgraph "Domain Layer"
        G[Transaction Entity]
        H[Merchant Entity]
    end

    subgraph "Data Access Layer"
        I[Prisma ORM Client]
    end

    subgraph "Database"
        J[(PostgreSQL<br/>Render Cloud)]
    end

    subgraph "External Data Source"
        K[Legacy XML File<br/>sample.xml]
    end

    A -->|HTTP Request| B
    B --> C
    C -->|Calls| I
    K -->|Reads| D
    D -->|Parses| F
    F -->|Sanitizes| E
    E -->|Categorizes| G
    G -->|References| H
    H -->|Persists via| I
    I -->|SQL Queries| J

    style A fill:#4A90E2,stroke:#2E5C8A,color:#fff
    style B fill:#50C878,stroke:#2E7D4E,color:#fff
    style C fill:#F39C12,stroke:#C87F0A,color:#fff
    style D fill:#9B59B6,stroke:#6C3483,color:#fff
    style E fill:#9B59B6,stroke:#6C3483,color:#fff
    style F fill:#9B59B6,stroke:#6C3483,color:#fff
    style G fill:#E74C3C,stroke:#A93226,color:#fff
    style H fill:#E74C3C,stroke:#A93226,color:#fff
    style I fill:#34495E,stroke:#1C2833,color:#fff
    style J fill:#2C3E50,stroke:#17202A,color:#fff
    style K fill:#95A5A6,stroke:#5D6D7E,color:#fff
Layer Responsibilities
Layer	Components	Responsibility
Presentation	React Frontend	User interface, data visualization, filtering
Infrastructure	Express API, Middleware	HTTP routing, security headers, rate limiting
Application	Ingestion, Rule Engine, Sanitizer	Business logic, data transformation, categorization
Domain	Transaction, Merchant	Core business entities and rules
Data Access	Prisma ORM	Database abstraction, query building
Database	PostgreSQL	Persistent storage, relational integrity
Directory Structure:

src/
├── ingestion/          # XML parsing, sanitization, rule engine
├── db/                 # Database client (Prisma), SQL DDL scripts
├── utils/              # Logger, Zod schemas
├── server.js           # Express API with security middleware
└── prisma/             # Prisma schema and migrations
Database Schema
Design Principles
Normalization: Merchants are separated from Transactions to avoid data redundancy
Referential Integrity: Foreign key merchant_id links transactions to their respective merchant
Precision: DECIMAL(12,2) for amounts to avoid floating-point errors in financial calculations
Entity Relationship
merchants (1) ─────< (N) transactions
DDL (SQL Schema)
The complete SQL schema is available in src/db/init.sql. Key tables:

CREATE TABLE "merchants" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "normalized_name" TEXT UNIQUE NOT NULL
);

CREATE TABLE "transactions" (
    "id" SERIAL PRIMARY KEY,
    "txn_id" TEXT UNIQUE NOT NULL,
    "merchant_id" INTEGER REFERENCES "merchants"("id") ON DELETE SET NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" CHAR(3) NOT NULL,
    "category" TEXT NOT NULL,
    "txn_date" DATE NOT NULL,
    "raw_description" TEXT NOT NULL
);
Why This Design:

normalized_name in merchants ensures deduplication (e.g., "AMZN MKTP US" → "AMZN MKTP US")
DECIMAL type prevents precision loss for financial amounts
UNIQUE constraint on txn_id prevents duplicate transactions
Foreign key relationship allows efficient JOIN queries for merchant summaries
Getting Started
Prerequisites
Node.js v18 or higher
PostgreSQL 14+ (or access to a cloud instance like Render)
Installation
Clone the repository

git clone <your-repo-url>
cd legacy-bridge-backend
Install dependencies

npm install
Configure environment variables
Create a .env file in the root directory:

DATABASE_URL="postgresql://user:password@host:5432/dbname"
NODE_ENV="development"
⚠️ Security Notice for Evaluators
For demonstration purposes only, this repository includes a .env file with credentials to a live Render PostgreSQL instance. This allows immediate testing without local database setup.

In production environments, sensitive credentials should NEVER be committed to version control. Instead, use:

Platform Environment Variables (Render, Vercel, AWS Parameter Store)
Secret Management Services (HashiCorp Vault, AWS Secrets Manager, Google Secret Manager)
CI/CD Secrets (GitHub Actions Secrets, GitLab CI/CD Variables)
The .env file would be listed in .gitignore and credentials rotated after evaluation.

Setup database

npm run db:migrate
This applies Prisma migrations to create the merchants and transactions tables.

Run ingestion (populate data)

npm run ingest
This parses the sample XML (sample.xml), sanitizes data, and inserts it into PostgreSQL.

📊 Pre-loaded Demo Data
The Render database instance already contains sample transactions from the provided XML payload. You can:

View data immediately by running the frontend (no ingestion needed for first-time evaluation)
Re-run ingestion with npm run ingest to see the idempotent behavior (data won't duplicate thanks to upsert logic)
Clear and re-populate by dropping tables via Prisma Studio (npm run db:studio) and running migrations + ingestion again
Start the backend API

npm start
Server runs on http://localhost:3001

Development mode (with hot-reload)

npm run dev
Data Normalization Strategy
Challenge: Dirty Legacy Data
The XML payload contains inconsistent data that must be cleaned before storage.

1. Amount Normalization
Problem: Amounts are strings, some with currency symbols ("$5.50", "120.50")
Solution: src/ingestion/sanitizer.js uses Decimal.js for arbitrary-precision arithmetic:

function cleanAmount(amount) {
  const cleaned = amount.replace(/[^0-9.]/g, ""); // Remove $, commas
  return new Decimal(cleaned); // Preserves precision (0.1 + 0.2 = 0.3)
}
2. Date Normalization
Problem: Dates in multiple formats ("2023/10/01", "Oct 02, 2023", "2023-10-03")
Solution: dayjs with custom parse formats:

function normalizeDate(date) {
  return dayjs(date, ["YYYY/MM/DD", "YYYY-MM-DD", "MMM DD, YYYY"]).format(
    "YYYY-MM-DD"
  );
}
3. Description Cleanup
Problem: Messy merchant names ("UBER *TRIP 882", "AMZN Mktp US*123")
Solution: Extract normalized merchant identifier:

function normalizeMerchant(desc) {
  return desc
    .toUpperCase()
    .replace(/[*0-9]/g, "")
    .trim();
  // "UBER *TRIP 882" → "UBER  TRIP "
}
Rule Engine Configuration
Requirement: Extensible Categorization
The categorization logic must be configurable without modifying core code.

Implementation
File: src/ingestion/rules.json

[
  {
    "category": "eCommerce",
    "keywords": ["AMZN", "EBAY", "SHOPIFY"]
  },
  {
    "category": "Transport & Food",
    "keywords": ["STARBUCKS", "UBER", "LYFT"]
  }
]
Adding a New Rule
Open src/ingestion/rules.json
Add a new object:
{
  "category": "Subscriptions",
  "keywords": ["NETFLIX", "SPOTIFY", "ADOBE"]
}
No code changes required. The next ingestion run applies the new rule automatically.
How It Works
The ruleEngine.js dynamically loads rules.json at startup:

const rules = JSON.parse(fs.readFileSync("rules.json", "utf8"));

function categorize(description) {
  const upper = description.toUpperCase();
  for (const rule of rules) {
    if (rule.keywords.some((k) => upper.includes(k))) {
      return rule.category;
    }
  }
  return "Uncategorized";
}
Error Handling
Strategy: Three-Level Defense
If the Legacy API returns bad data, the system handles errors gracefully:

1. Schema Validation (Pre-Processing)
Tool: Zod schemas (src/utils/schemas.js)
What: Validates required fields, data types, string lengths
If fails: Logs error with txn_id and raw payload, skips transaction
2. Graceful Degradation (During Processing)
Pattern: Individual try/catch per transaction in the loop
Behavior: A single malformed transaction logs an error but does NOT stop the batch
for (const t of txns) {
  try {
    const validated = rawTransactionSchema.parse(t); // May throw ZodError
    // ... process transaction
  } catch (err) {
    logger.error("Failed to ingest transaction", err, {
      txn_id: t?.txn_id || "unknown",
      raw_payload: t,
    });
    // Continue to next transaction
  }
}
3. Structured Logging (Observability)
Format: JSON logs with timestamp, level, message, error stack, and context
Example Output:
{
  "timestamp": "2023-12-19T15:30:45.123Z",
  "level": "error",
  "message": "Failed to ingest transaction",
  "error_message": "Invalid amount format",
  "txn_id": "tx_002",
  "raw_payload": {"txn_id": "tx_002", "amount": "ABC", ...},
  "stack": "Error: Invalid amount format at cleanAmount..."
}
Benefits:

Machine-parsable (can send to CloudWatch, Datadog, ELK)
Enables alerting on specific error patterns (e.g., txn_id === 'unknown')
Preserves raw payload for manual replay/debugging
Frontend Application
Technology
Framework: React 18 with Vite
State Management: React Hooks (useState, useEffect)
Styling: CSS Modules (scoped, minimal)
HTTP Client: Axios
Features
Transaction Table

Displays: Date, Merchant, Category, Amount
Responsive design (Desktop table + Mobile card view)
Category Filter

Dropdown to filter transactions by category
Client-side filtering for simplicity
Merchant Summary

Aggregated view of total spending per merchant
Demonstrates data enrichment capability
Running the Frontend
Location: ../legacy-bridge-frontend/

cd ../legacy-bridge-frontend
npm install
npm run dev
Frontend runs on http://localhost:5173 and proxies API calls to http://localhost:3001.

Important: The backend must be running for the frontend to fetch data.

Video Walkthroughs
As per the challenge requirements, two videos are included:

Video A: Product Deliverable (Client-Facing)
Duration: 3 minutes
Audience: Acme Corp stakeholders (non-technical)
Content:

Demo of the frontend dashboard
How categorization rules improve spending visibility
Business value of clean financial data
Link: [TO BE ADDED BEFORE SUBMISSION]

Video B: Technical Deep Dive (Engineer-Facing)
Duration: 5 minutes
Audience: Internal engineering team
Content:

Architecture walkthrough
XML parsing strategy (xml2js, edge case handling)
Database normalization rationale
Rule engine configuration demo
Error logging approach
Link: [TO BE ADDED BEFORE SUBMISSION]

Infrastructure & Deployment
Current Setup
Database: PostgreSQL hosted on Render (production-grade cloud instance)
Advantage: High availability, immediate access for evaluators
Local Alternative: Use src/db/init.sql for on-premise PostgreSQL setup
Future Roadmap & Scalability
While the current solution meets all functional requirements, the following enhancements are identified for ultra-high-scale scenarios (e.g., millions of transactions/hour):

Streaming Ingestion
Replace fs.readFileSync with Node.js Streams to handle multi-GB XML files without memory pressure.

Batch Processing
Use prisma.createMany for bulk inserts to reduce database round-trip latency.

Dynamic Rules (Hot-Reload)
Store rules in Redis or a database table to update categorization logic without restarting the service.

Message Queue Integration
Decouple ingestion from processing using BullMQ or RabbitMQ for traffic spike resilience.

Scripts Reference
Command	Description
npm install	Install dependencies
npm run db:migrate	Apply Prisma migrations to PostgreSQL
npm run db:generate	Regenerate Prisma Client
npm run ingest	Run ingestion script (parse XML → insert to DB)
npm start	Start production server (port 3001)
npm run dev	Start development server with hot-reload
Submitted for the Solutions Engineer Take-Home Challenge

