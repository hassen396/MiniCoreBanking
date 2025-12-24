using Core.Entities;

namespace Application.Interfaces.Repositories
{
    public interface IBankAccountRepository
    {
        Task<Account?> GetByAccountNumberAsync(string accountNumber);
        Task SaveChangesAsync();
    }
}
