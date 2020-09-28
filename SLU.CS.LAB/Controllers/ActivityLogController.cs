using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SLU.CS.LAB.Data;
using SLU.CS.LAB.Dtos;
using SLU.CS.LAB.Models;

namespace SLU.CS.LAB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityLogController : ControllerBase
    {
        private readonly DataContext _context;

        public ActivityLogController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActivityLog>>> GetAllActivity()
        {

            var result = await _context.ActivityLogs.ToListAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivityLog(ActivityLog activityLog)
        {
            
                var actLog =  new ActivityLog
                {
                    WNumber = activityLog.WNumber,
                    Name = activityLog.Name,
                    Course = activityLog.Course,
                    TimeIn = activityLog.TimeIn,
                    Topic = activityLog.Topic,
                    Tutor = activityLog.Tutor

                };

                  await _context.ActivityLogs.AddAsync(actLog);
                  _context.SaveChanges();

            return Ok();

        }

        [HttpPut("{id}")]
        public  async Task<IActionResult> PostTimeOut(int id, ActivityLogDto activityLog)
        {

            var activityFromRepo = await _context.ActivityLogs.FirstOrDefaultAsync(x => x.Id == id);

            if (activityFromRepo == null)
            {
                return NotFound();
            }

            activityFromRepo.TimeOut = activityLog.TimeOut;

            _context.ActivityLogs.Update(activityFromRepo);
             _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ActivityLog>> DeleteActivity(int id)
        {
            var result = await _context.ActivityLogs.FirstOrDefaultAsync(x => x.Id == id);
            if (result == null)
            {
                return NotFound();
            }
            _context.ActivityLogs.Remove(result);
            await _context.SaveChangesAsync();

            return Ok("Activitylog Deleted");
        }
    }
}
