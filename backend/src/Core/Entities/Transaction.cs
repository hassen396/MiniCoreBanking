using Core.Enums;
namespace Core.Entities
{
    public class Transaction
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string AccountNumber { get; set; }

        public decimal Amount { get; set; }

        public string? Remarks { get; set; }
        public TransactionType Type { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public Account? Account { get; set; }
    }
}