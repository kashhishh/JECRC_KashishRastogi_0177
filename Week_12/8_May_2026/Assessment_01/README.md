🚀 Data Query Pipeline Hierarchy
Advanced LINQ-Style Query Processing System in C#

📌 Project Overview
The Data Query Pipeline Hierarchy project is an advanced Object-Oriented Programming (OOP) implementation in C# that simulates a lightweight LINQ-style query engine with deferred execution capabilities.
The system is designed using a hierarchical query architecture where multiple query types inherit from a common base class and override core behaviors dynamically.
This project demonstrates:


✅ Inheritance & Polymorphism


✅ Deferred Execution using IEnumerable


✅ Dynamic Query Processing


✅ LINQ-Based Data Filtering


✅ Aggregation Operations


✅ Runtime Query Execution


✅ Extensible Query Pipeline Design



🏗️ System Architecture
                   ┌─────────────────┐                   │      Query      │                   │  (Base Class)   │                   └────────┬────────┘                            │             ┌──────────────┴──────────────┐             │                             │   ┌──────────────────┐        ┌──────────────────┐   │   FilterQuery    │        │  AggregateQuery  │   └──────────────────┘        └──────────────────┘

✨ Key Features
🔹 Base Query Engine
The Query class acts as the foundation of the pipeline.
Core Responsibilities


Maintains original data source


Supports deferred execution


Provides virtual methods for extensibility


Tracks execution state


Base Properties
PropertyDescriptiondataSourceStores original integer datasetisExecutedTracks execution status
Base Methods
MethodPurposeApply()Builds query without executingExecute()Forces query executionGetQueryType()Identifies query type

🔍 FilterQuery Module
The FilterQuery class performs intelligent data filtration using custom predicates.
✔ Supported Predicates
PredicateDescription>10Filters values greater than 10<5Filters values less than 5evenFilters even numbersoddFilters odd numbers

⚡ Deferred Execution
Filtering is prepared during Apply() but executed only when Execute() is called.
This mimics real-world LINQ behavior.

📤 Execution Output
Filter Executed,Predicate:>10,Result Count:3

📊 AggregateQuery Module
The AggregateQuery class performs analytical operations on datasets.

✔ Supported Operations
OperationFunctionSumCalculates total sumAverageCalculates mean valueMaxFinds maximum elementMinFinds minimum element

📤 Execution Output
Aggregation Executed,Operation:Sum,Result:70

🧠 Advanced Concepts Demonstrated
✅ Object-Oriented Programming


Inheritance


Method Overriding


Polymorphism


Encapsulation


Dynamic Dispatch



✅ LINQ & Deferred Execution
The project replicates the internal behavior of LINQ queries where execution is delayed until results are explicitly requested.

✅ Real-World Query Pipeline Design
This architecture resembles backend query processors used in:


Data Analytics Systems


ETL Pipelines


Business Intelligence Engines


Query Optimization Frameworks


Database Abstraction Layers



📥 Input Format
Filter Query Example
Input
Filter15 3 8 12 5 20 7>10
Output
Filter Executed,Predicate:>10,Result Count:3

📥 Aggregate Query Example
Input
Aggregate15 3 8 12 5 20 7Sum
Output
Aggregation Executed,Operation:Sum,Result:70

📂 Project Structure
📦 DataQueryPipeline ┣ 📜 Program.cs ┣ 📜 Query.cs ┣ 📜 FilterQuery.cs ┣ 📜 AggregateQuery.cs ┗ 📜 README.md

⚙️ Technologies Used
TechnologyPurposeC#Core Programming Language.NETRuntime EnvironmentLINQQuery ProcessingOOPArchitecture Design

▶️ How to Run
🔹 Using Visual Studio


Open Visual Studio


Create a Console Application


Replace Program.cs


Paste the provided code


Run the application



🔹 Using .NET CLI
Build Project
dotnet build
Run Project
dotnet run

🎯 Learning Outcomes
By completing this project, you will gain practical understanding of:


Designing scalable query systems


Implementing LINQ-like execution pipelines


Using deferred execution efficiently


Applying OOP principles in enterprise systems


Building extensible architectures



🌟 Why This Project Stands Out
✔ Simulates real LINQ behavior
✔ Demonstrates enterprise-level OOP design
✔ Clean and extensible architecture
✔ Strong use of inheritance & polymorphism
✔ Real-world query execution workflow
✔ Beginner-friendly yet industry-relevant

🚀 Future Enhancements


Add SortQuery


Add GroupByQuery


Add asynchronous query execution


Implement generic query engine


Add expression tree support


Integrate with databases



👨‍💻 Author
Developed as an advanced C# OOP and LINQ implementation project focused on query pipeline architecture and deferred execution systems.