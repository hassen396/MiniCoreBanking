using Application.DTOs;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Core.Entities;
using Core.Enums;


namespace Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _repository;
        public AccountService(IAccountRepository repository)
        {
            _repository = repository;
        }
        public async Task<Account> CreateAccountAsync(Guid userId, AccountType type)
        {
            var nextNumber = await _repository.GetNextAccountNumberAsync();
            var account = new Account
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Balance = 0m,
                CreatedAt = DateTime.UtcNow,
                Type = type,
                AccountNumber = nextNumber
            };
            await _repository.CreateAsync(account);
            return account;
        }

        public async Task<Account?> GetAccountByIdAsync(Guid accountId)
        {
            return await _repository.GetByIdAsync(accountId);
        }

        public async Task<List<Account>> GetUserAccountsAsync(Guid userId)
        {
            return await _repository.GetByUserIdAsync(userId);
        }
        public async Task<AccountBalanceDto> GetBalanceAsync(Guid accountId)
        {
            var account = await _repository.GetByIdAsync(accountId)
                ?? throw new Exception("Account not found");

            return new AccountBalanceDto
            {
                AccountId = account.Id,
                Balance = account.Balance
            };
        }
    }
}