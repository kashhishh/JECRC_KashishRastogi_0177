🚀 Employee Management System (EMS) – Full Stack Docker Project
📌 Overview

This project is a Full Stack Employee Management System (EMS) built using modern technologies and deployed using Docker containers. It demonstrates a complete real-world architecture with frontend, backend, and database integration.

🏗️ Architecture
EMSMVC (Frontend UI)
        ↓ HTTP Calls
EMSWebAPI (Backend API)
        ↓ Entity Framework Core
SQL Server (Database)

✔ All components are containerized and connected via Docker network

⚙️ Tech Stack
💻 ASP.NET Core MVC (.NET 8) – Frontend
🔗 ASP.NET Core Web API – Backend
🗄️ SQL Server 2022 – Database
🐳 Docker & Docker Compose – Containerization
📡 HttpClient – API Communication
📄 Swagger – API Testing
✨ Features
🔹 Backend (Web API)
CRUD Operations for Employee
Entity Framework Core integration
RESTful API design
Swagger UI for testing
🔹 Frontend (MVC)
Employee Dashboard UI
Add / Edit / Delete Employees
API consumption using HttpClient
Clean and responsive UI
🔹 Database
SQL Server running in Docker
Manual table creation (no migrations)
Persistent data storage
📊 Employee Model
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }
    public string Email { get; set; }
    public decimal Salary { get; set; }
}
🐳 Docker Setup
📁 Project Structure
EMS-Docker-Project/
│
├── EMSMVC/
├── EMSWebAPI/
├── docker-compose.yml
▶️ Run Project using Docker
docker compose up --build
🌐 Application URLs
Service	URL
MVC UI	http://localhost:5001

Web API	http://localhost:5000/swagger

SQL Server	localhost,1434
🗄️ Database Setup (Manual)
CREATE DATABASE EMSDB;
GO

USE EMSDB;
GO

CREATE TABLE Employees (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100),
    Department NVARCHAR(100),
    Email NVARCHAR(100),
    Salary DECIMAL(10,2)
);
🔄 API Endpoints
Method	Endpoint	Description
GET	/api/employees	Get all employees
GET	/api/employees/{id}	Get employee by ID
POST	/api/employees	Add new employee
PUT	/api/employees/{id}	Update employee
DELETE	/api/employees/{id}	Delete employee
📸 Output Screens
🔹 Swagger API

✔ API tested successfully

🔹 MVC Dashboard

✔ Employees displayed with CRUD actions

🔹 Docker Containers

✔ All services running properly

🔹 SQL Server

✔ Data stored and verified

🚀 Key Learnings
End-to-end full stack development
API consumption using HttpClient
Docker containerization and networking
SQL Server integration with containers
Debugging real-world deployment issues
📈 Future Improvements
🔐 Add Authentication & Authorization
☁️ Deploy on Cloud (Azure / AWS)
📊 Add Dashboard Analytics
🔄 Implement CI/CD pipeline