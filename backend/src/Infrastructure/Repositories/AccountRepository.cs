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
        public async Task<Account?> GetByIdAsync(Guid id)
        {
            return await _context.Accounts.FindAsync(id);
        }

        public async Task<List<Account>> GetByUserIdAsync(Guid userId)
        {
            var accounts = await _context.Accounts.Where(a=> a.UserId == userId).ToListAsync();
            return  accounts;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}