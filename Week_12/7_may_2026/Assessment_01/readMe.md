Warehouse Stock Tracker
Overview

Warehouse Stock Tracker is a C# Console Application that helps manage product inventory across multiple warehouse locations using a Dictionary for fast stock operations.

The system supports:

Adding stock
Removing stock
Checking product quantity
Bulk stock addition
Displaying current inventory

This project demonstrates the use of:

C# Collections (Dictionary)
Conditional Statements
Loops
String Manipulation
Input Validation
Features
ADD Stock

Add quantity to a product.

Example:

ADD 1001 50
REMOVE Stock

Remove quantity from a product.

Validation:

Cannot remove more stock than available.

Example:

REMOVE 1001 20
CHECK Stock

Display current stock quantity of a product.

Example:

CHECK 1001
BULK Add

Add multiple products in a single operation.

Example:

BULK 1003:75,1004:40
DISPLAY Inventory

Shows all products with stock greater than zero.

Example:

DISPLAY
Technologies Used
C#
.NET Console Application
Dictionary Collection
Project Structure
WarehouseStockTracker/
│
├── Program.cs
├── WarehouseStockTracker.csproj
└── README.md
How to Run the Project
Step 1: Open Project Folder

Open the project in:

Visual Studio
OR
Visual Studio Code
Step 2: Run the Project

Open terminal and execute:

dotnet run
Sample Input
11
ADD 1001 50
ADD 1002 30
CHECK 1001
ADD 1001 25
REMOVE 1002 10
BULK 1003:75,1004:40
CHECK 1002
REMOVE 1002 25
DISPLAY
ADD 1001 10
DISPLAY
Sample Output
Product 1001: 50 units
Product 1002: 20 units

--- Current Inventory ---
1001: 75 units
1002: 20 units
1003: 75 units
1004: 40 units

--- Updated Inventory ---
1001: 85 units
1002: 20 units
1003: 75 units
1004: 40 units
Concepts Covered
Dictionary CRUD Operations
Input Parsing
String Splitting
Validation Handling
Inventory Management Logic
Console-Based Application Development
Future Improvements
Database Integration
File Storage Support
User Authentication
GUI Dashboard
Product Categories
Export Inventory Reports
Author

Kashish Rastogi