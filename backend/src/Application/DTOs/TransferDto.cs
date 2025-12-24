namespace Application.DTOs
{
    public class TransferDto
    {
        public required string FromAccountNumber { get; set; }
        public required string ToAccountNumber { get; set; }
        public decimal Amount { get; set; }
    }
}
