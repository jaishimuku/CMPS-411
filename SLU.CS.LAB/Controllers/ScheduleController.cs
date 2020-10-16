using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Language;
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
        public ActionResult<List<ScheduleDto>> GetSchedule()
        {

            var rows =  _context.TASchedules.ToList().GroupBy(x => x.Time).ToList();

            var result = new List<ScheduleDto>();

            foreach (var item in rows) { 
            
                ScheduleDto dto = new ScheduleDto();
                dto.time = item.ToList()[0].Time;
                for (var i = 0; i < item.ToList().Count; i++)
                {

                    switch (item.ToList()[i].Days.ToString())
                    {
                        case "Sunday":
                            dto.sun = item.ToList()[i].TA;
                            break;
                        case "Monday":
                            dto.mon = item.ToList()[i].TA;
                            break;
                        case "Tuesday":
                            dto.tue = item.ToList()[i].TA;
                            break;
                        case "Wednesday":
                            dto.wed = item.ToList()[i].TA;
                            break;
                        default: break;
                    }
                }

                result.Add(dto);
            }
         
            return result;
        }

        [HttpGet("{current}")]
        public ActionResult GetCurrentWorkers() {

            var currentTime = DateTime.Now.ToLongTimeString();
            var currentDay = (int)DateTime.Now.DayOfWeek;
            //var currentDay = 2;
            var temp = currentTime.Substring(0, 2);   //extracts first two characters of time

            var scheduleOfToday = _context.TASchedules.Where(x => (int)x.Days == currentDay).ToList();
            var timeToReturn = "";
            var TAToReturn = "";

            foreach (var cell in scheduleOfToday) {
                if (cell.Time.Substring(0, 2) == temp)
                {
                    timeToReturn = cell.Time;
                    TAToReturn = cell.TA;
                }
            } 
            //if testing in time and day other than in our database , returns data below for now
            if (timeToReturn == "" && TAToReturn == "") {
                timeToReturn = "12:00PM-1:00PM";
                TAToReturn = "Mukunda, Roshan";
            }

            return Ok(
                new { 
                timeToReturn,
                TAToReturn
                });

        }
        

        [HttpPut]
        public ActionResult Edit(List<ScheduleDto> scheduleDto)
        {

            //var rowInDb = _context.TASchedules.ToList();
            var rows = _context.TASchedules.ToList().GroupBy(x => x.Time).ToList();
            foreach (var item in rows) {
                for (var i = 0; i < item.ToList().Count; i++)
                {
                    var rowFromUI = scheduleDto.Where(x => x.time == item.ToList()[i].Time).FirstOrDefault();

                    switch (item.ToList()[i].Days.ToString()) {
                        case "Sunday":
                            item.ToList()[i].TA = rowFromUI.sun;
                            break;
                        case "Monday":
                            item.ToList()[i].TA = rowFromUI.mon;
                            break;
                        case "Tuesday":
                            item.ToList()[i].TA = rowFromUI.tue;
                            break;
                        case "Wednesday":
                            item.ToList()[i].TA = rowFromUI.wed;
                            break;
                        default:break;

                    }
                }

            }
            _context.SaveChanges();

            return Ok();
        
        }
    }
}
