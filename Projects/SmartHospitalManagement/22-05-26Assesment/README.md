# 🏥 Central Hospital Platform

A full-stack, multi-branch hospital management system built for scale — real-time emergency tracking, conflict-aware scheduling, role-based access, and cloud-ready infrastructure.

---

## ⚡ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | ASP.NET Core Web API |
| Realtime | SignalR |
| Database | SQL Server |
| Auth | JWT-style authentication |
| Infra | Docker, Azure DevOps |

---

## 🧩 Platform Modules

- **Appointment Scheduler** — Conflict prevention for overlapping doctor slots
- **Emergency Tracking** — Live emergency event streaming via SignalR
- **Symptom Checker** — AI-assisted patient symptom intake
- **Lab Reports** — Upload, manage, and share diagnostic results
- **Prescriptions & Billing** — Full invoicing and prescription lifecycle
- **Analytics & Audit** — Role-scoped dashboards with full audit trails
- **Notifications** — Realtime alerts for appointments and emergencies

---

## 🏗️ Architecture
React :5173  ──►  ASP.NET Core API :5187  ──►  SQL Server
│
SignalR Hub  ⇄  All connected clients
---

## 👤 Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@hospital.local | Admin@123 |
| Doctor | doctor@hospital.local | Doctor@123 |
| Patient | patient@hospital.local | Patient@123 |

---

## 🚀 Quick Start

### Local Development

**1. Start the API**
```powershell
dotnet run --project .\src\Hospital.Api\Hospital.Api.csproj --urls http://localhost:5187
```

**2. Install and start the frontend**
```powershell
cd .\web
npm install
npm run dev
```

**3. Open** → http://localhost:5173

---

### Docker (one command)

```powershell
docker compose -f .\infra\docker\docker-compose.yml up --build
```

Spins up the API, frontend, and SQL Server together.

---

## 🗂️ Project Structure

├── src/
│   └── Hospital.Api/          # ASP.NET Core Web API
│       ├── Controllers/        # Patients, Doctors, Appointments, Billing, Auth...
│       ├── Hubs/               # SignalR hub
│       └── Repositories/       # In-memory (swap for EF Core/Dapper)
├── web/                        # React + Vite frontend
├── infra/
│   ├── docker/                 # Dockerfiles + docker-compose
│   ├── azure-pipeline.yml      # Azure DevOps CI/CD
│   └── schema.sql              # SQL Server schema


---

## 🔌 API Surface

| Domain | Endpoints |
|---|---|
| Auth | Login, token refresh |
| Patients | CRUD + medical history |
| Doctors | CRUD + availability |
| Appointments | Book, cancel, conflict check |
| Lab Reports | Upload, retrieve, share |
| Prescriptions | Create, track, fulfill |
| Billing | Invoice, payment status |
| Emergency | Create, assign, track |
| Analytics | Utilization, revenue, trends |
| Audit | Full system event log |

---

## 🗺️ Production Roadmap

- [ ] Replace in-memory repositories with SQL Server via EF Core or Dapper
- [ ] Integrate ASP.NET Core Identity and official JWT bearer middleware
- [ ] Add Azure SignalR Service and Application Insights telemetry
- [ ] Integrate payment gateway SDK and pharmacy microservice
- [ ] Add test projects — booking conflicts, authorization, API contracts

---

## 📄 License

MIT