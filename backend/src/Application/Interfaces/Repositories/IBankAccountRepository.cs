using Core.Entities;

namespace Application.Interfaces.Repositories
{
    public interface IBankAccountRepository
    {
        Task<Account?> GetByIdAsync(Guid id);
        Task SaveChangesAsync();
    }
}
