# Customer Preference Analysis

## 📌 Project Overview

Customer Preference Analysis is a C# console application that analyzes customer purchasing behavior across different product categories in an e-commerce platform.

The project demonstrates the use of:

- HashSet
- Set Operations
- Union
- Intersection
- Difference
- Customer Pattern Analysis

This project is useful for understanding customer segmentation and cross-category buying behavior.

---

# 🚀 Features

✅ Track customers from multiple categories

✅ Find customers who bought from ANY category

✅ Find customers who bought from ALL categories

✅ Find customers who bought ONLY from Electronics

✅ Identify cross-category buyers

✅ Perform efficient set operations using HashSet

---

# 🛠 Technologies Used

- C#
- .NET Console Application
- HashSet Collection
- Set Operations

---

# 📂 Categories Used

## Electronics Customers

C001, C002, C003, C005, C008

## Clothing Customers

C002, C004, C005, C006, C009

## Books Customers

C003, C005, C007, C008, C010

---

# 📊 Operations Performed

## 1. Union Operation

Find customers who purchased from ANY category.

### Result

C001, C002, C003, C004, C005, C006, C007, C008, C009, C010

Total Customers: 10

---

## 2. Intersection Operation

Find customers who purchased from ALL categories.

### Result

C005

Total Customers: 1

---

## 3. Difference Operation

Find customers who purchased ONLY from Electronics.

### Result

C001, C008

Total Customers: 2

---

## 4. Electronics AND Books but NOT Clothing

Find customers who purchased from Electronics and Books but not Clothing.

### Result

C003, C008

Total Customers: 2

---

# 🧠 Concepts Used

| Concept | Description |
|----------|-------------|
| HashSet | Stores unique customer IDs |
| UnionWith() | Combines all customers |
| IntersectWith() | Finds common customers |
| ExceptWith() | Removes matching customers |
| Count | Calculates total customers |

---

# 💻 Sample Output

```text
--- Customer Preference Analysis ---

1. Customers in ANY category (Union):

C001 C002 C003 C004 C005 C006 C007 C008 C009 C010

Total: 10 customers


2. Customers in ALL categories (Intersection):

C005

Total: 1 customer


3. Customers ONLY in Electronics:

C001 C008

Total: 2 customers


4. Customers in Electronics AND Books but NOT Clothing:

C003 C008

Total: 2 customers