using API.DTOs;
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
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateAccount([FromBody] CreateAccountDto createAccountDto)
        {
            if (string.IsNullOrWhiteSpace(createAccountDto.UserName))
                return BadRequest("Username is required");

            var targetUser = await _userManager.FindByNameAsync(createAccountDto.UserName);
            if (targetUser == null)
                return NotFound("User not found");

            var account = await _accountService.CreateAccountAsync(targetUser.Id, createAccountDto.Type);
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

        [Authorize(Roles = "Admin")]
        [HttpGet("get-accounts-count")]
        public async Task<ActionResult> GetAccountsCount()
        {
            var count = await _accountService.GetAccountsCountAsync();
            return Ok(count);
        }
        //paginated list of accounts return 15 per page
        [Authorize(Roles = "Admin")]
        [HttpGet("list")]
        public async Task<IActionResult> GetAccountsList([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 15)
        {
            if (pageNumber <= 0 || pageSize <= 0)
            {
                return BadRequest("Page and pageSize must be greater than 0");
            }


            var pagedAccounts = await _accountService.GetAllAccountsAsync(pageNumber, pageSize);
            // var pagedAccounts = allAccounts
            //     .Skip((pageNumber - 1) * pageSize)
            //     .Take(pageSize)
            //     .ToList();

            return Ok(new
            {
                Page = pageNumber,
                PageSize = pageSize,
                TotalCount = _accountService.GetAccountsCountAsync().Result,
                Accounts = pagedAccounts
            });

        }
    }
}