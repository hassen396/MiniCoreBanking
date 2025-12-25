using Application.DTOs;
using Core.Entities;
using Core.Enums;
namespace Application.Interfaces.Services
{
public interface IAccountService
{
    Task<List<Account>> GetAllAccountsAsync(int pageNumber, int pageSize);
    Task<int> GetAccountsCountAsync();
    Task<Account> CreateAccountAsync(Guid userId, AccountType type);
    Task<Account?> GetAccountByIdAsync(Guid accountId);
    Task<List<Account>> GetUserAccountsAsync(Guid userId);
    Task<AccountBalanceDto> GetBalanceAsync(Guid accountId);
}
}