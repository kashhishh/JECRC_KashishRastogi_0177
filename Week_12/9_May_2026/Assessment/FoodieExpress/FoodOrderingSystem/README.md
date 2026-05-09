# 🍔 FoodieExpress — Online Food Ordering System

A full-stack web application built with **ASP.NET Core 9**, **Entity Framework Core**, and **SQL Server**.
Customers can browse food, manage a cart, and place orders. Admins can manage items, categories, and track orders.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Option A — Run Locally (Recommended for Development)](#-option-a--run-locally-recommended)
- [Option B — Run with Docker](#-option-b--run-with-docker)
- [Default Credentials](#-default-credentials)
- [Features by Module](#-features-by-module)
- [API Endpoints](#-api-endpoints)
- [Folder Structure](#-folder-structure)

---

## 🛠 Tech Stack

| Layer          | Technology                        |
|----------------|-----------------------------------|
| Frontend       | HTML, CSS, Bootstrap 5, JavaScript |
| Backend        | ASP.NET Core 9 MVC                |
| API            | ASP.NET Core 9 Web API            |
| Database       | SQL Server (LocalDB / Docker)     |
| ORM            | Entity Framework Core 9           |
| Authentication | ASP.NET Core Identity             |
| Containerization | Docker + Docker Compose          |
| CI/CD          | Azure DevOps Pipelines            |

---

## 📁 Project Structure

```
FoodOrderingSystem/
├── FoodOrderingSystem.sln                  ← Solution file
├── docker-compose.yml                      ← Docker orchestration
├── azure-pipelines.yml                     ← Azure DevOps CI/CD
├── README.md
└── src/
    ├── FoodOrderingSystem.Core/            ← Entities, Interfaces, ViewModels
    ├── FoodOrderingSystem.Infrastructure/  ← DbContext, Repositories, Services, Migrations
    ├── FoodOrderingSystem.API/             ← REST API (port 5001)
    └── FoodOrderingSystem.Web/             ← MVC Frontend (port 5000 / 7xxx dev)
```

---

## ✅ Prerequisites

### For Local Development (Option A)

| Tool | Version | Download |
|------|---------|----------|
| .NET SDK | **9.0+** | https://dotnet.microsoft.com/download |
| SQL Server | Any edition (LocalDB included with VS) | https://www.microsoft.com/en-us/sql-server/sql-server-downloads |
| Visual Studio 2022 **or** VS Code | Latest | https://visualstudio.microsoft.com/ |
| dotnet-ef (CLI tool) | 9.0+ | `dotnet tool install --global dotnet-ef` |

> 💡 **SQL Server LocalDB** is automatically installed with Visual Studio. No separate SQL Server install needed for local dev.

### For Docker (Option B)

| Tool | Download |
|------|----------|
| Docker Desktop | https://www.docker.com/products/docker-desktop |

---

## 🖥 Option A — Run Locally (Recommended)

### Step 1 — Open the Project

```bash
# Navigate to project root (where FoodOrderingSystem.sln is)
cd FoodOrderingSystem
```

Or open `FoodOrderingSystem.sln` in **Visual Studio 2022**.

---

### Step 2 — Restore NuGet Packages

```bash
dotnet restore
```

---

### Step 3 — Configure the Database Connection

Open `src/FoodOrderingSystem.Web/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=FoodOrderingDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

> ✅ This uses **SQL Server LocalDB** — no configuration needed if you have Visual Studio installed.
> 
> If you use a **full SQL Server** instance, replace with:
> ```
> Server=YOUR_SERVER;Database=FoodOrderingDb;User Id=sa;Password=YOUR_PASSWORD;TrustServerCertificate=True;
> ```

---

### Step 4 — Apply Database Migrations

```bash
dotnet ef database update \
  --project src/FoodOrderingSystem.Infrastructure \
  --startup-project src/FoodOrderingSystem.Web
```

This will:
- Create the `FoodOrderingDb` database
- Apply all tables (Users, Categories, FoodItems, Cart, Orders…)
- Automatically **seed** default data on first run

---

### Step 5 — Run the Web Application

```bash
dotnet run --project src/FoodOrderingSystem.Web
```

Open your browser and go to:
```
https://localhost:7xxx   ← HTTPS (port shown in terminal)
http://localhost:5xxx    ← HTTP
```

> 📌 The exact port is shown in the terminal output after running.

---

### Step 6 — (Optional) Run the API

```bash
dotnet run --project src/FoodOrderingSystem.API
```

API base URL: `https://localhost:7yyy/api`

---

### Running in Visual Studio 2022

1. Open `FoodOrderingSystem.sln`
2. Right-click the solution → **Set Startup Projects** → choose **Multiple Startup Projects**
3. Set both `FoodOrderingSystem.Web` and `FoodOrderingSystem.API` to **Start**
4. Press **F5** to run

---

## 🐳 Option B — Run with Docker

### Step 1 — Make sure Docker Desktop is running

### Step 2 — Build and Start all containers

```bash
# From the project root (where docker-compose.yml is)
cd FoodOrderingSystem
docker-compose up --build
```

This starts **3 containers**:

| Container       | Description           | Port              |
|-----------------|-----------------------|-------------------|
| `food_sqlserver` | SQL Server 2022      | `localhost:1433`  |
| `food_web`       | MVC Web Application  | `http://localhost:5000` |
| `food_api`       | REST API             | `http://localhost:5001` |

### Step 3 — Open in Browser

```
http://localhost:5000        ← Web App
http://localhost:5001/api    ← REST API
```

### Stop Containers

```bash
docker-compose down
```

### Stop and remove all data (fresh start)

```bash
docker-compose down -v
```

---

## 🔑 Default Credentials

After the app starts, these are automatically seeded:

### Admin Account
| Field    | Value                  |
|----------|------------------------|
| Email    | `admin@foodorder.com`  |
| Password | `Admin@123`            |
| Role     | Admin                  |

> ⚠️ **Change the admin password after first login in production!**

### Customer Account
Register a new account from the **Register** page — new users are automatically assigned the **Customer** role.

---

## 🎯 Features by Module

### Module 1 — User Authentication
- ✅ Register new customer account
- ✅ Login / Logout
- ✅ Forgot Password (mock — logs reset link to console/logs)
- ✅ Role-based access (Admin / Customer)

### Module 2 — Food Management (Admin Only)
- ✅ Add / Edit / Delete food items
- ✅ Upload food images (stored in `wwwroot/images/food/`)
- ✅ Manage categories (Add / Delete)
- ✅ Toggle availability of items

### Module 3 — Customer Module
- ✅ Browse all available food items
- ✅ Search food by name or description
- ✅ Filter by category
- ✅ Add items to cart
- ✅ Update quantity / Remove from cart
- ✅ Proceed to checkout

### Module 4 — Order Management
- ✅ Place order (mock checkout — no real payment)
- ✅ View order history
- ✅ View & print invoice
- ✅ Admin: update order status (Pending → Confirmed → Preparing → Out for Delivery → Delivered)

---

## 🌐 API Endpoints

Base URL: `http://localhost:5001/api` (local) or `http://localhost:5001/api` (Docker)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/fooditems` | Get all available food items |
| GET | `/api/fooditems/{id}` | Get food item by ID |
| GET | `/api/fooditems/search?term=burger` | Search food items |
| GET | `/api/fooditems/category/{id}` | Get items by category |
| GET | `/api/categories` | Get all categories |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/{id}` | Get order by ID |
| PUT | `/api/orders/{id}/status` | Update order status |

---

## 🗄 Database Schema (Key Tables)

```
AspNetUsers         ← Identity users (ApplicationUser)
AspNetRoles         ← Roles: Admin, Customer
Categories          ← Food categories
FoodItems           ← Food items with price, image, category
Carts               ← One cart per user
CartItems           ← Items in a cart
Orders              ← Placed orders
OrderItems          ← Items within an order
```

---

## 🚀 Azure DevOps CI/CD

The `azure-pipelines.yml` has 4 stages:

| Stage | Description |
|-------|-------------|
| **Build** | Restore → Build → Test → Publish artifacts |
| **Docker** | Build Web & API Docker images (triggers on `main` branch) |
| **Deploy Staging** | Deploy to staging environment |
| **Deploy Production** | Deploy to production (requires manual approval gate) |

To use it:
1. Push this project to an Azure DevOps Git repo
2. Go to **Pipelines** → **New Pipeline** → point to `azure-pipelines.yml`
3. Configure a Docker Registry service connection for image pushing

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| `LocalDB not found` | Install Visual Studio or [SQL Server LocalDB](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb) |
| `Port already in use` | Change port in `appsettings.json` or stop the conflicting app |
| `Migration not found` | Run `dotnet ef database update ...` (see Step 4) |
| `Docker SQL Server unhealthy` | Wait 20–30 seconds after `docker-compose up`, then refresh |
| `Access Denied page` | You need to log in as Admin (`admin@foodorder.com`) |
| `Images not showing` | Make sure `wwwroot/images/food/` directory exists (auto-created on upload) |

---

## 👤 Author

Built with ASP.NET Core 9, Entity Framework Core 9, Bootstrap 5.

---

*Happy Ordering! 🍕🍔🍝*
