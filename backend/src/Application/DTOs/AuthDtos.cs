namespace DotnetJwtAuthTemplate.DTOs;

public class AuthDtos
{
    public record RegisterRequest(string Email, string Password, string? UserName, string FirstName, string LastName);
    public record UpdateUserRequest(string FirstName, string LastName);
    public record LoginRequest(string Email, string Password);
    public record AuthResponse(string AccessToken);
}