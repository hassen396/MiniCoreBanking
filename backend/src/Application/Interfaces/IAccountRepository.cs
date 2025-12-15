using Core.Entities;

namespace Application.Interfaces
{
    public interface IAccountRepository
    {
        Task<Account> CreateAsync(Account account);
        Task<Account?> GetByIdAsync(Guid id); 
        Task<List<Account>> GetByUserIdAsync(Guid userId);
        Task SaveChangesAsync();
    }
}
