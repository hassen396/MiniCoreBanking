using Core.Entities;
using Infrastructure.Data;
using Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
namespace Infrastructure.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ApplicationDbContext _context;
        public AccountRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Account> CreateAsync(Account account)
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return account;
        }

        public async Task<int> GetAccountsCountAsync()
        {
            var count = await _context.Accounts.CountAsync();
            return count;
        }

        public async Task<Account?> GetByIdAsync(Guid id)
        {
            return await _context.Accounts.FindAsync(id);
        }

        public async Task<List<Account>> GetByUserIdAsync(Guid userId)
        {
            var accounts = await _context.Accounts.Where(a => a.UserId == userId).ToListAsync();
            return accounts;
        }

        public async Task<string> GetNextAccountNumberAsync()
        {
            var numbers = await _context.Accounts
                .Select(a => a.AccountNumber)
                .ToListAsync();

            long max = 0;
            foreach (var n in numbers)
            {
                if (!string.IsNullOrWhiteSpace(n) && long.TryParse(n, out var v))
                {
                    if (v > max) max = v;
                }
            }
            return (max + 1).ToString();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<List<Account>> GetAllAccountsAsync(int pageNumber = 1, int pageSize = 15)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 15;

            return await _context.Accounts
                .OrderBy(a => a.AccountNumber)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
    }
}