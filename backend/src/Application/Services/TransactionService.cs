using Application.Interfaces.Services;
using Application.Interfaces.Repositories;
using Core.Entities;
using Core.Enums;

namespace Application.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IBankAccountRepository _accountRepo;
        private readonly ITransactionRepository _transactionRepo;

        public TransactionService(
            IBankAccountRepository accountRepo,
            ITransactionRepository transactionRepo)
        {
            _accountRepo = accountRepo;
            _transactionRepo = transactionRepo;
        }

        public async Task DepositAsync(string accountNumber, decimal amount)
        {
            if (amount <= 0)
                throw new Exception("Amount must be greater than zero");

            var account = await _accountRepo.GetByAccountNumberAsync(accountNumber)
                ?? throw new Exception("Account not found");

            account.Balance += amount;

            await _transactionRepo.AddAsync(new Transaction
            {
                AccountNumber = accountNumber,
                Amount = amount,
                Type = TransactionType.Deposit
            });

            await _accountRepo.SaveChangesAsync();
            await _transactionRepo.SaveChangesAsync();
        }

        public async Task WithdrawAsync(string accountNumber, decimal amount)
        {
            if (amount <= 0)
                throw new Exception("Amount must be greater than zero");

            var account = await _accountRepo.GetByAccountNumberAsync(accountNumber)
                ?? throw new Exception("Account not found");

            if (account.Balance < amount)
                throw new Exception("Insufficient balance");

            account.Balance -= amount;

            await _transactionRepo.AddAsync(new Transaction
            {
                AccountNumber = accountNumber,
                Amount = amount,
                Type = TransactionType.Withdraw
            });

            await _accountRepo.SaveChangesAsync();
            await _transactionRepo.SaveChangesAsync();
        }

        public async Task TransferAsync(string fromAccountNumber, string toAccountNumber, decimal amount)
        {
            if (amount <= 0)
                throw new Exception("Invalid amount");

            var fromAccount = await _accountRepo.GetByAccountNumberAsync(fromAccountNumber)
                ?? throw new Exception("Source account not found");

            var toAccount = await _accountRepo.GetByAccountNumberAsync(toAccountNumber)
                ?? throw new Exception("Destination account not found");

            if (fromAccount.Balance < amount)
                throw new Exception("Insufficient balance");

            fromAccount.Balance -= amount;
            toAccount.Balance += amount;

            await _transactionRepo.AddAsync(new Transaction
            {
                AccountNumber = fromAccountNumber,
                Amount = amount,
                Type = TransactionType.Transfer
            });

            await _transactionRepo.AddAsync(new Transaction
            {
                AccountNumber = toAccountNumber,
                Amount = amount,
                Type = TransactionType.Transfer
            });

            await _accountRepo.SaveChangesAsync();
            await _transactionRepo.SaveChangesAsync();
        }
    }
}
