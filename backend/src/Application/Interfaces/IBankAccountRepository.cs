using Core.Entities;

namespace Application.Interfaces
{
    public interface IBankAccountRepository
    {
        Task<Account?> GetByIdAsync(Guid id);
        Task SaveChangesAsync();
    }
}
