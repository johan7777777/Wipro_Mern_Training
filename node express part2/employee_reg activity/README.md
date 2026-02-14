# Employee Registration System

## Structure
```
employee_reg activity/
├── db/
│   └── connection.js          ← Database connection
├── middlewares/
│   └── employeeValidator.js    ← Email validation & uniqueness check
├── controllers/
│   └── employeeController.js   ← Registration logic
├── routes/
│   └── employeeRoutes.js      ← API routes
├── app.js                      ← Main server file
├── .env                        ← Environment variables
└── package.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create database table:
```sql
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  department VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Update .env file with your database credentials

4. Run server:
```bash
npm start
```

## API Endpoints

### Register Employee
POST http://localhost:3000/api/employees/register
Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "department": "IT"
}
```

### Get All Employees
GET http://localhost:3000/api/employees

## Features
- ✅ Email format validation
- ✅ Email uniqueness check (no duplicates)
- ✅ Proper error handling (server won't crash)
- ✅ All fields required (name, email, department)
