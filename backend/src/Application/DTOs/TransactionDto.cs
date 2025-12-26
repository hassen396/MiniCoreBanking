using System;

namespace Application.DTOs
{
    public class TransactionDto
    {
        public Guid Id { get; set; }
        public required string AccountNumber { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; } = string.Empty;
        public string? Remarks { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
