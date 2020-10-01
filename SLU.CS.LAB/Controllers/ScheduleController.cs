using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SLU.CS.LAB.Data;
using SLU.CS.LAB.Models;

namespace SLU.CS.LAB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly DataContext _context;

        public ScheduleController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Schedule>>> GetSchedule()
        {
            var result =  await _context.TASchedules.OrderByDescending(x => x.TA).ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> PostSchedule(Schedule schedule)
        {

            var newSchedule = new Schedule
            {
                Days = schedule.Days,
                Time = schedule.Time,
                TA = schedule.TA
            };
            await _context.TASchedules.AddAsync(newSchedule);
            _context.SaveChanges();

            return Ok(StatusCode(201));

        }
    }
}
