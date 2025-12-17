using Application.Interfaces.Services;
using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController(IAccountService accountService, UserManager<ApplicationUser> userManager)
        {
            _accountService = accountService;
            _userManager = userManager;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAccount()
        {
            var userIdString = _userManager.GetUserId(User);
            if (userIdString == null)
                return Unauthorized();
            if (!Guid.TryParse(userIdString, out var userId))
            {
                return BadRequest("Invalid User ID");
            }
            var account = await _accountService.CreateAccountAsync(userId);
            return Ok(account);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccount(Guid id)
        {
            var result = await _accountService.GetAccountByIdAsync(id);
            if (result == null) return NotFound("Account not found");

            return Ok(result);
        }

        [HttpGet("mine")]
        public async Task<IActionResult> GetMyAccounts()
        {
            var userIdString = _userManager.GetUserId(User);
            if (userIdString == null)
                return Unauthorized();
            if (!Guid.TryParse(userIdString, out var userId))
            {
                return BadRequest("Invalid User ID");
            }
            var accounts = await _accountService.GetUserAccountsAsync(userId);

            return Ok(accounts);
        }

        [HttpGet("{accountId}/balance")]
        public async Task<IActionResult> GetBalance(Guid accountId)
        {
            var balance = await _accountService.GetBalanceAsync(accountId);
            return Ok(balance);
        }
    }
}
