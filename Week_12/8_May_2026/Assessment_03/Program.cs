using System;

public class BankAccount
{
    // Readonly property
    public string accountNumber { get; }

    // Private setter for encapsulation
    public double balance { get; private set; }

    public BankAccount(string accNumber, double initialDeposit)
    {
        accountNumber = accNumber;
        balance = initialDeposit;
    }

    // Deposit method
    public virtual bool Deposit(double amount)
    {
        if (amount > 0)
        {
            balance += amount;
            return true;
        }

        return false;
    }

    // Withdraw method
    public virtual bool Withdraw(double amount)
    {
        if (amount > 0 && amount <= balance)
        {
            balance -= amount;
            return true;
        }

        return false;
    }

    // Get balance
    public double GetBalance()
    {
        return balance;
    }

    // Protected helper method
    protected void UpdateBalance(double amount)
    {
        balance += amount;
    }
}

public class SavingsAccount : BankAccount
{
    public double interestRate { get; set; }
    public double minimumBalance { get; set; }

    public SavingsAccount(
        string accNumber,
        double initialDeposit
    ) : base(accNumber, initialDeposit)
    {
        minimumBalance = 1000;
    }

    // Override withdraw with minimum balance rule
    public override bool Withdraw(double amount)
    {
        if (GetBalance() - amount < minimumBalance)
        {
            Console.WriteLine(
                $"Withdrawal Failed: Minimum balance requirement {minimumBalance}"
            );

            return false;
        }

        return base.Withdraw(amount);
    }

    // Apply interest
    public void ApplyInterest(double rate)
    {
        interestRate = rate;

        double interest =
            GetBalance() * (interestRate / 100);

        UpdateBalance(interest);

        Console.WriteLine(
            $"Interest Applied,Rate:{interestRate},New Balance:{GetBalance()}"
        );
    }
}

public class CurrentAccount : BankAccount
{
    public double overdraftLimit { get; set; }
    public double transactionFee { get; set; }

    public CurrentAccount(
        string accNumber,
        double initialDeposit
    ) : base(accNumber, initialDeposit)
    {
        overdraftLimit = 2000;
        transactionFee = 50;
    }

    // Override withdraw with overdraft support
    public override bool Withdraw(double amount)
    {
        if (GetBalance() + overdraftLimit >= amount)
        {
            UpdateBalance(-amount);
            return true;
        }

        Console.WriteLine("Withdrawal Failed: Overdraft limit exceeded");

        return false;
    }

    // Deduct fee
    public void DeductTransactionFee()
    {
        UpdateBalance(-transactionFee);

        Console.WriteLine(
            $"Fee Deducted,Amount:{transactionFee},Remaining:{GetBalance()}"
        );
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        string accountType =
            Console.ReadLine()?.Trim() ?? "";

        string accountNumber =
            Console.ReadLine()?.Trim() ?? "";

        double initialDeposit =
            double.Parse(Console.ReadLine() ?? "0");

        string operation1 =
            Console.ReadLine()?.Trim() ?? "";

        string operation2 =
            Console.ReadLine()?.Trim() ?? "";

        // SAVINGS ACCOUNT
        if (accountType.Equals(
            "Savings",
            StringComparison.OrdinalIgnoreCase))
        {
            SavingsAccount savings =
                new SavingsAccount(
                    accountNumber,
                    initialDeposit
                );

            ProcessSavingsOperation(savings, operation1);
            ProcessSavingsOperation(savings, operation2);
        }

        // CURRENT ACCOUNT
        else if (accountType.Equals(
            "Current",
            StringComparison.OrdinalIgnoreCase))
        {
            CurrentAccount current =
                new CurrentAccount(
                    accountNumber,
                    initialDeposit
                );

            ProcessCurrentOperation(current, operation1);
            ProcessCurrentOperation(current, operation2);
        }

        else
        {
            Console.WriteLine("Invalid Account Type");
        }
    }

    // Savings Operations
    static void ProcessSavingsOperation(
        SavingsAccount account,
        string operation
    )
    {
        string[] parts = operation.Split(' ');

        switch (parts[0].ToLower())
        {
            case "deposit":

                double depositAmount =
                    double.Parse(parts[1]);

                account.Deposit(depositAmount);

                break;

            case "withdraw":

                double withdrawAmount =
                    double.Parse(parts[1]);

                account.Withdraw(withdrawAmount);

                break;

            case "getbalance":

                Console.WriteLine(
                    $"Current Balance: {account.GetBalance()}"
                );

                break;

            case "applyinterest":

                double rate =
                    double.Parse(parts[1]);

                account.ApplyInterest(rate);

                break;
        }
    }

    // Current Operations
    static void ProcessCurrentOperation(
        CurrentAccount account,
        string operation
    )
    {
        string[] parts = operation.Split(' ');

        switch (parts[0].ToLower())
        {
            case "deposit":

                double depositAmount =
                    double.Parse(parts[1]);

                account.Deposit(depositAmount);

                break;

            case "withdraw":

                double withdrawAmount =
                    double.Parse(parts[1]);

                account.Withdraw(withdrawAmount);

                break;

            case "getbalance":

                Console.WriteLine(
                    $"Current Balance: {account.GetBalance()}"
                );

                break;

            case "deducttransactionfee":

                account.DeductTransactionFee();

                break;
        }
    }
}