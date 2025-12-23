using Application.Interfaces.Services;
using Core.Entities;
using DotnetJwtAuthTemplate.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DotnetJwtAuthTemplate.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;

    public AuthController(UserManager<ApplicationUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }
    [Authorize(Roles ="Admin")]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] AuthDtos.RegisterRequest request)
    {
        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            FirstName = request.FirstName,
            LastName = request.LastName
        };
        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        await _userManager.AddToRoleAsync(user, "User");
        return Ok("user created successfully");
    }

    //update existing user
    [Authorize(Roles ="Admin")]
    [HttpPost("update-user")]
    public async Task<IActionResult> UpdateUser(AuthDtos.UpdateUserRequest updatedUserRequest)
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return Unauthorized();
        //update the user
        user.UpdatedAt = DateTime.UtcNow;
        user.FirstName = updatedUserRequest.FirstName;
        user.LastName = updatedUserRequest.LastName;
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        return Ok("user updated successfully");    
    }

    [HttpPost("register-admin")]
    public async Task<IActionResult> RegisterAdmin([FromBody] AuthDtos.RegisterRequest request)
    {
        var user = new ApplicationUser
        {
            UserName =  request.Email,
            Email = request.Email,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            FirstName = request.FirstName,
            LastName = request.LastName
        };
        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        await _userManager.AddToRoleAsync(user, "Admin");
        return Ok("admin created successfully");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthDtos.LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null) return Unauthorized();
        if (!await _userManager.CheckPasswordAsync(user, request.Password)) return Unauthorized();
        var accessToken = _tokenService.CreateAccessToken(user);
        var refreshToken = await _tokenService.CreateRefreshTokenAsync(user.Id.ToString(),
            HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown");
        //ser http only cookie for refresh token
        Response.Cookies.Append("refreshToken", refreshToken.Token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = refreshToken.Expires
        });
        return Ok(new AuthDtos.AuthResponse(accessToken));
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        if (!Request.Cookies.TryGetValue("refreshToken", out var token)) return Unauthorized();
        var rt = await _tokenService.GetRefreshTokenAsync(token);
        if (rt == null || !rt.IsActive) return Unauthorized();
        //rotate token
        var newRt = await _tokenService.RotateRefreshTokenAsync(rt,
            HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown");

        var user = await _userManager.FindByIdAsync(newRt.UserId);
        if (user == null) return Unauthorized();

        var newAccessToken = _tokenService.CreateAccessToken(user);
        //set new refresh token in http only cookie
        Response.Cookies.Append("refreshToken", newRt.Token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = newRt.Expires
        });

        return Ok(new AuthDtos.AuthResponse(newAccessToken));
    }
    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId == null) return Unauthorized();
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return Unauthorized();
        return Ok(new {  user.Id, user.FirstName, user.LastName, user.UserName, user.Email });
    }

    //admin only
    [Authorize(Roles = "Admin")]
    [HttpGet("admin-only")]
    public IActionResult AdminOnly()
    {
        return Ok("you are an admin");
    }

    //user and admin
    [Authorize(Roles = "User,Admin")]
    [HttpGet("user-and-admin")]
    public IActionResult UserAndAdmin()
    {
        return Ok("you are a user or an admin");
    }

    //any authenticated user
    [Authorize]
    [HttpGet("any-authenticated")]
    public IActionResult AnyAuthenticated()
    {
        return Ok("you are authenticated");
    }

    //role User
    [Authorize(Roles = "User")]
    [HttpGet("user-only")]
    public IActionResult UserOnly()
    {
        return Ok("you are a user");
    }
}