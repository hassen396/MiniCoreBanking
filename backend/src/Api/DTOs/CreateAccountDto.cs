using Core.Enums;

namespace API.DTOs
{
    public class CreateAccountDto
    {
        public string? UserName { get; set; }
        public AccountType Type { get; set; }
    }
}