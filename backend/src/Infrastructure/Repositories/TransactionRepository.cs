using Application.Interfaces.Repositories;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Infrastructure.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ApplicationDbContext _context;

        public TransactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Transaction transaction)
        {
            await _context.Transactions.AddAsync(transaction);
        }

        public async Task<List<Transaction>> GetByAccountNumberAsync(string accountNumber, int skip, int take)
        {
            return await _context.Transactions
                .Where(t => t.AccountNumber == accountNumber)
                .OrderByDescending(t => t.Timestamp)
                .Skip(skip)
                .Take(take)
                .ToListAsync();
        }

        public async Task<int> CountByAccountNumberAsync(string accountNumber)
        {
            return await _context.Transactions.CountAsync(t => t.AccountNumber == accountNumber);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
