using Core.Entities;

namespace Application.Interfaces.Repositories
{
    public interface ITransactionRepository
    {
        Task AddAsync(Transaction transaction);
        Task<List<Transaction>> GetByAccountNumberAsync(string accountNumber, int skip, int take);
        Task<int> CountByAccountNumberAsync(string accountNumber);
        Task SaveChangesAsync();
    }
}
