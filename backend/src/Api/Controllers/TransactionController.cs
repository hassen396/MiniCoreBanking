using Application.DTOs;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("api/transactions")]
    [Authorize]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost("deposit")]
        public async Task<IActionResult> Deposit([FromBody] DepositDto dto)
        {
            await _transactionService.DepositAsync(dto.AccountNumber, dto.Amount);
            return Ok("Deposit successful");
        }

        [HttpPost("withdraw")]
        public async Task<IActionResult> Withdraw([FromBody] WithdrawDto dto)
        {
            await _transactionService.WithdrawAsync(dto.AccountNumber, dto.Amount);
            return Ok("Withdrawal successful");
        }

        [HttpPost("transfer")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Transfer([FromBody] TransferDto dto)
        {
            await _transactionService.TransferAsync(dto.FromAccountNumber, dto.ToAccountNumber, dto.Amount);
            return Ok("Transfer successful");
        }

        [HttpGet("{accountNumber}/transactions")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetTransactions(
            string accountNumber,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var (items, total) = await _transactionService.GetTransactionsAsync(accountNumber, pageNumber, pageSize);
            var dto = items.Select(t => new TransactionDto
            {
                Id = t.Id,
                AccountNumber = t.AccountNumber,
                Amount = t.Amount,
                Type = t.Type.ToString(),
                Remarks = t.Remarks,
                Timestamp = t.Timestamp
            });

            return Ok(new { items = dto, totalCount = total });
        }
    }
}
