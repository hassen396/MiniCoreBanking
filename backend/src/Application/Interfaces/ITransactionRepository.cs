using Core.Entities;

namespace Application.Interfaces
{
    public interface ITransactionRepository
    {
        Task AddAsync(Transaction transaction);
        Task SaveChangesAsync();
    }
}
