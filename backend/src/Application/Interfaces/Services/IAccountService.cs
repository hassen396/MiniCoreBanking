using Application.DTOs;
using Core.Entities;
namespace Application.Interfaces.Services
{
public interface IAccountService
{
    Task<Account> CreateAccountAsync(Guid userId);
    Task<Account?> GetAccountByIdAsync(Guid accountId);
    Task<List<Account>> GetUserAccountsAsync(Guid userId);
    Task<AccountBalanceDto> GetBalanceAsync(Guid accountId);
}
}