using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SLU.CS.LAB.Data;
using SLU.CS.LAB.Dtos;
using SLU.CS.LAB.Migrations;
using SLU.CS.LAB.Models;

namespace SLU.CS.LAB.Controllers
{
    //[Authorize]
    [Route("api/user/[controller]")]
    [ApiController]
    public class MessagesTestController : ControllerBase
    {
        private readonly DataContext _repo;
        private readonly IMapper _mapper;

        public MessagesTestController(DataContext repo, IMapper mapper)
        {
           _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("lastMessage/{id}")]
        public async Task<ActionResult> GetLastMessage(int id)
        {
            var otherUsers = await _repo.Users.Where(x => x.Id != id).ToListAsync();
            var lastMessageWithUsers = new ArrayList();
            foreach (var user in otherUsers)
            {
                var lastMessage = await _repo.Messages
                    .Include(u => u.Sender)
                    .Include(u => u.Recipient)
                    .Where(x => (x.SenderId == id && x.RecipientId == user.Id) || (x.SenderId == user.Id && x.RecipientId == id)).OrderByDescending(x => x.MessageSent).FirstOrDefaultAsync();
                if (lastMessage != null)
                {
                    lastMessageWithUsers.Add(lastMessage);
                }
            }
            var allMessages = _mapper.Map<IEnumerable<MessageToReturnDto>>(lastMessageWithUsers);

            return Ok(allMessages);
        }

        [HttpDelete("{userId}/{otherUserId}")]
        public async Task<IActionResult> DeleteMessage(int userId, int otherUserId)
        {

            var messageFromRepo = await _repo.Messages.Where(x => (x.SenderId == userId && x.RecipientId == otherUserId) || (x.SenderId == otherUserId && x.RecipientId == userId)).ToListAsync();

            if (messageFromRepo != null)
            {
                foreach (var item in messageFromRepo) {
                    _repo.Remove(item);
                }
                await _repo.SaveChangesAsync();
            }

            return Ok(messageFromRepo);

        }



        //[HttpGet("{id}")] //for single message
        //public async Task<IActionResult> GetSingleMessage(int userId, int id)
        //{
        //    //if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // checks is user current  checks token, needs to match token
        //    //    return Unauthorized();

        //    var message = await _repo.Messages.FirstOrDefaultAsync(m => m.Id == id);
        //    if (message == null)
        //        return NotFound();

        //    return Ok(message);
        //}

        //[HttpGet("latest")]
        //public async Task<IActionResult> GetLatestMessage(int userId, int id)
        //{
        //    //if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // checks is user current  checks token, needs to match token
        //    //    return Unauthorized();

        //    var message = await _repo.Messages.FirstOrDefaultAsync(m => m.Id == id);
        //    if (message == null)
        //        return NotFound();

        //    return Ok(message);
        //}


        //[HttpPost] // create a message
        //public async Task<IActionResult> CreateMessage(int userId, 
        //    MessageForCreationDto messageForCreationDto)
        //{
        //    var sender = await _repo.Users.FirstOrDefaultAsync(m => m.Id == userId);

        //    //if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //    //    return Unauthorized();

        //    messageForCreationDto.SenderId = userId;

        //    var recipient = await _repo.Users.FirstOrDefaultAsync(m => m.Id == messageForCreationDto.RecipientId);

        //    if (recipient == null)
        //        return BadRequest("Could not find user");

        //    var message = _mapper.Map<Message>(messageForCreationDto);

        //     _repo.Add(message);
        //     await _repo.SaveChangesAsync();

        //    var messageToReturn = _mapper.Map<MessageForCreationDto>(message);

        //    return Ok(messageToReturn);
        //}


        //[HttpGet("allMessages")]
        //public async Task<IActionResult> GetAll(int userId)
        //{
        //    var messages = await _repo.Messages.LastOrDefaultAsync(x => x.Id == userId);
        //    return Ok(messages);
        //}


        //[HttpGet("all/{recipientId}")]
        //public async Task<IActionResult> GetAllMessagesWithAUser(int userId, int recipientId)
        //{
        //    //if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // checks is user current  checks token, needs to match token
        //    //    return Unauthorized();

        //    var messages = await _repo.Messages
        //        .Include(u => u.Sender)
        //        .Include(u => u.Recipient)
        //       .Where(m => m.RecipientId == userId && m.RecipientDeleted == false
        //               && m.SenderId == recipientId
        //           || m.RecipientId == recipientId && m.SenderId == userId
        //               && m.SenderDeleted == false) // returns conversation between two users
        //       .OrderByDescending(m => m.MessageSent)
        //       .ToListAsync();

        //    var allMessages  = _mapper.Map<IEnumerable<MessageToReturnDto>>(messages);

        //    return Ok(allMessages);
        //}


        //[HttpPost("{id}/read")]
        //public async Task<IActionResult> MarkMessageRead(int id, int userId)  // we can do this inside GetMessageThread
        //{
        //    //if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) // checks is user current  checks token, needs to match token
        //    //    return Unauthorized();

        //    var message = await _repo.Messages.FirstOrDefaultAsync(x => x.Id == id);

        //    if (message.RecipientId != userId)
        //        return Unauthorized();

        //    message.IsRead = true;
        //    message.DateRead = DateTime.Now;

        //    await _repo.SaveChangesAsync();

        //    return NoContent();
        //}
    }
}
