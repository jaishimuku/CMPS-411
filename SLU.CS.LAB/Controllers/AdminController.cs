using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SLU.CS.LAB.Data;
using SLU.CS.LAB.Dtos;
using SLU.CS.LAB.Models;

namespace SLU.CS.LAB.Controllers
{
  
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly DataContext _context;

        public AdminController(DataContext context)
        {
            _context = context;
        }


        //Get All Tutors
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllTA()
        {

            var result = await _context.Users.Where(x => x.IsAdmin == false).ToListAsync();
            return Ok(result);
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteTA(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                var messages = await _context.Messages.Where(x => x.RecipientId == user.Id || x.SenderId == user.Id).ToListAsync();
                if(messages != null)
                {
                    foreach (var item in messages)
                    {
                        _context.Remove(item);
                    }
                }
               
                _context.Remove(user);
            }

            await _context.SaveChangesAsync();

            return Ok("user deleted");
        }
        [HttpPut("{id}")]
        public  async Task<IActionResult> UpdateTA(int id, UpdateTADto user)
        {
            var userFromDb = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (userFromDb == null)
            {
                return NotFound();
            }
            userFromDb.FirstName = user.FirstName;
            userFromDb.LastName = user.LastName;
            userFromDb.Username = user.Username;
            userFromDb.Email = user.Email;

            _context.Users.Update(userFromDb);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
