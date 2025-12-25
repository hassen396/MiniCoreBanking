using Core.Entities;

namespace Application.Interfaces.Repositories
{
    public interface IAccountRepository
    {
        Task<List<Account>> GetAllAccountsAsync(int pageNumber, int pageSize);
        Task<int> GetAccountsCountAsync();
        Task<Account> CreateAsync(Account account);
        Task<Account?> GetByIdAsync(Guid id);
        Task<List<Account>> GetByUserIdAsync(Guid userId);
        Task<string> GetNextAccountNumberAsync();
        Task SaveChangesAsync();
    }
}
