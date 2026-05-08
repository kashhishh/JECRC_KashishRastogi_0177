🏦 Bank Account Hierarchy with Controlled State Management
Advanced OOP Banking System using C# Encapsulation & Inheritance

📌 Project Overview
The Bank Account Hierarchy with Controlled State Management project is an advanced Object-Oriented Programming (OOP) implementation in C# that simulates real-world banking operations using:


✅ Encapsulation


✅ Inheritance


✅ Method Overriding


✅ Controlled State Management


✅ Polymorphism


✅ Secure Balance Handling


The system models different bank account types while enforcing strict business rules such as:


Minimum balance validation


Overdraft protection


Transaction fee deduction


Interest calculation



🏗️ System Architecture
                    ┌────────────────────┐                    │    BankAccount     │                    │    (Base Class)    │                    └─────────┬──────────┘                              │              ┌───────────────┴───────────────┐              │                               │   ┌────────────────────┐         ┌────────────────────┐   │   SavingsAccount   │         │   CurrentAccount   │   └────────────────────┘         └────────────────────┘

🚀 Key Features
🔒 Controlled State Management
The balance property uses:
private set;
This ensures balance modifications can happen only through controlled methods like:


Deposit()


Withdraw()


ApplyInterest()


DeductTransactionFee()



🧠 Core OOP Concepts Demonstrated
ConceptImplementationEncapsulationPrivate setters for balanceInheritanceSavings & Current inherit BankAccountPolymorphismOverridden Withdraw() methodsAbstractionShared banking operationsMethod OverridingSpecialized withdrawal logic

📂 Base Class : BankAccount
The BankAccount class serves as the foundation for all account types.

📌 Properties
PropertyTypeDescriptionaccountNumberstringRead-only account numberbalancedoubleEncapsulated account balance

📌 Methods
MethodDescriptionDeposit()Adds money after validationWithdraw()Withdraws money if balance permitsGetBalance()Returns current balance

💰 SavingsAccount
The SavingsAccount class adds interest functionality and minimum balance validation.

📌 Additional Properties
PropertyTypeinterestRatedoubleminimumBalancedouble
Default Minimum Balance:
1000

⚠️ Minimum Balance Rule
Withdrawal is blocked if balance falls below minimum balance.

❌ Example
Input
Withdraw 4500
Output
Withdrawal Failed: Minimum balance requirement 1000

📈 Apply Interest
Savings accounts can apply interest dynamically.

✅ Example
Input
ApplyInterest 5
Output
Interest Applied,Rate:5,New Balance:5250

💳 CurrentAccount
The CurrentAccount class supports overdraft functionality and transaction fees.

📌 Additional Properties
PropertyTypeoverdraftLimitdoubletransactionFeedouble

⚡ Overdraft Support
Current accounts can withdraw beyond available balance within overdraft limit.

💸 Transaction Fee Deduction

✅ Example Output
Fee Deducted,Amount:50,Remaining:4950

📥 Input Format
LineDescription1Account Type (Savings or Current)2Account Number3Initial Deposit4First Operation5Second Operation

📌 Supported Operations

Savings Account Operations
OperationDescriptionDeposit amountDeposit moneyWithdraw amountWithdraw moneyGetBalanceDisplay current balanceApplyInterest rateApply interest

Current Account Operations
OperationDescriptionDeposit amountDeposit moneyWithdraw amountWithdraw moneyGetBalanceDisplay balanceDeductTransactionFeeDeduct fee

🧪 Sample Execution

💰 Savings Account Example
Input
SavingsSAV1235000Withdraw 4500GetBalanceApplyInterest 5

Output
Withdrawal Failed: Minimum balance requirement 1000Current Balance: 5000Interest Applied,Rate:5,New Balance:5250

💳 Current Account Example
Input
CurrentCUR1013000Withdraw 4500DeductTransactionFee

Output
Fee Deducted,Amount:50,Remaining:-1550

⚙️ Technologies Used
TechnologyPurposeC#Core Programming Language.NETRuntime FrameworkOOPArchitecture DesignConsole ApplicationExecution Environment

📂 Project Structure
📦 BankAccountHierarchy ┣ 📜 Program.cs ┣ 📜 BankAccount.cs ┣ 📜 SavingsAccount.cs ┣ 📜 CurrentAccount.cs ┗ 📜 README.md

▶️ How to Run

🔹 Using Visual Studio


Open Visual Studio


Create Console Application


Replace Program.cs


Run the application



🔹 Using .NET CLI
Build Project
dotnet build
Run Project
dotnet run

🎯 Learning Outcomes
After completing this project, you will understand:
✅ Encapsulation in C#
✅ Controlled State Management
✅ Inheritance & Polymorphism
✅ Business Rule Enforcement
✅ Banking System Logic
✅ Method Overriding
✅ Secure Property Handling
✅ Real-World OOP Design

🌟 Real-World Applications
This architecture resembles systems used in:


Banking Software


Financial Applications


ATM Systems


Digital Wallets


Payment Platforms


Loan Management Systems


Core Banking Solutions



🚀 Future Enhancements


Add Authentication System


Add Transaction History


Add Database Integration


Add Loan Accounts


Add Online Transfers


Add Interest Scheduling


Add Exception Handling


Add Multi-User Support



👨‍💻 Author
Developed as an advanced C# OOP banking project demonstrating secure state management, inheritance, encapsulation, and enterprise-level account handling systems.