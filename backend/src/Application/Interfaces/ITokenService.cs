using Core.Entities;

namespace Application.Interfaces;

public interface ITokenService
{
    string CreateAccessToken(ApplicationUser user);
    Task<RefreshToken> CreateRefreshTokenAsync(string userId, string createdByIp);
    Task<RefreshToken> RotateRefreshTokenAsync(RefreshToken currentToken, string createdByIp);
    Task<RefreshToken> GetRefreshTokenAsync(string token);
    Task RevokeRefreshTokenAsync(RefreshToken token, string revokedByIp, string? revokedBy = null);
}