using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SLU.CS.LAB.Data;
using SLU.CS.LAB.Data.SeedUser;
using SLU.CS.LAB.Dtos;
using SLU.CS.LAB.Helpers;
using SLU.CS.LAB.Models;

namespace SLU.CS.LAB.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
        {
            private readonly ISLUCSLABRepository _repo;
            private readonly IMapper _mapper;
            public MessagesController(ISLUCSLABRepository repository, IMapper mapper)
            {
                _mapper = mapper;
                _repo = repository;

            }

            [HttpGet("{id}", Name = "GetMessage")] //get single message
            public async Task<IActionResult> GetMessage(int userId, int id)
            {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // checks is user current  checks token, needs to match token
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(id);

                if (messageFromRepo == null)
                    return NotFound();
                return Ok(messageFromRepo);
            }
        //[AllowAnonymous]
            [HttpGet]
            public async Task<IActionResult> GetMessagesForUser(int userId,
                [FromQuery] MessageParams messageParams)
            {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // checks is user current  checks token, needs to match token
                return Unauthorized();

            messageParams.UserId = userId;

                var messagesFromRepo = await _repo.GetMessagesForUser(messageParams);

                var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            return Ok(messages);
            }

            [HttpGet("thread/{recipientId}")]
            public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
            {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // checks is user current  checks token, needs to match token
                return Unauthorized();

            var messagesFromRepo = await _repo.GetMessagesThread(userId, recipientId);

                var messageThread = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

                return Ok(messageThread);
            }

            [HttpPost]
            public async Task<IActionResult> CreateMessage(int userId,
                MessageForCreationDto messageForCreationDto)
            {

                var sender = await _repo.GetUser(userId);

            if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageForCreationDto.SenderId = userId;

                var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);

                if (recipient == null)
                    return BadRequest("Could not find user");

                var message = _mapper.Map<Message>(messageForCreationDto);

                _repo.Add(message);

                if (await _repo.SaveAll())
                {
                    var messageToReturn = _mapper.Map<MessageToReturnDto>(message);
                    return CreatedAtAction("GetMessage",
                         new { userId, id = message.Id }, messageToReturn);
                }

                throw new Exception("Creating the message failed on save");
            }

            [HttpPost("{id}")] // dont want to delete messages of both side so HttpPost
            public async Task<IActionResult> DeleteMessage(int id, int userId)
            {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // checks is user current  checks token, needs to match token
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(id);

                if (messageFromRepo.SenderId == userId)
                    messageFromRepo.SenderDeleted = true;

                if (messageFromRepo.RecipientId == userId)
                    messageFromRepo.RecipientDeleted = true;

                if (messageFromRepo.SenderDeleted && messageFromRepo.RecipientDeleted)
                    _repo.Delete(messageFromRepo);

                if (await _repo.SaveAll())
                    return NoContent();

                throw new Exception("Error deleting the message");

            }

            [HttpPost("{id}/read")]
            public async Task<IActionResult> MarkMessageRead(int id, int userId)  // we can do this inside GetMessageThread
            {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // checks is user current  checks token, needs to match token
                return Unauthorized();

            var message = await _repo.GetMessage(id);

                if (message.RecipientId != userId)
                    return Unauthorized();

                message.IsRead = true;
                message.DateRead = DateTime.Now;

                await _repo.SaveAll();

                return NoContent();
            }
    }
}
