

namespace Core.Entities;

public class Account
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }

    public decimal Balance { get; set; } = 0;

    public string AccountNumber { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt {get; set; }

    public ApplicationUser User { get; set; } = null!;
    public List<Transaction> Transactions { get; set; } = [];

}