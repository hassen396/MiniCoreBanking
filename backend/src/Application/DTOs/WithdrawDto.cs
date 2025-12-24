namespace Application.DTOs
{
    public class WithdrawDto
    {
        public required string AccountNumber { get; set; }
        public decimal Amount { get; set; }
    }
}
