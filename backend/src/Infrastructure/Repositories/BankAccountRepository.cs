using Application.Interfaces.Repositories;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class BankAccountRepository : IBankAccountRepository
    {
        private readonly ApplicationDbContext _context;

        public BankAccountRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Account?> GetByAccountNumberAsync(string accountNumber)
        {
            return await _context.Accounts.FirstOrDefaultAsync(x => x.AccountNumber == accountNumber);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
