namespace Application.Interfaces.Services
{
    public interface ITransactionService
    {
        Task DepositAsync(string accountNumber, decimal amount);
        Task WithdrawAsync(string accountNumber, decimal amount);
        Task TransferAsync(string fromAccountNumber, string toAccountNumber, decimal amount);
    }
}