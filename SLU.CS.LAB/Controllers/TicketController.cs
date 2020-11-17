using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SLU.CS.LAB.Data;
using SLU.CS.LAB.Models;

namespace SLU.CS.LAB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : Controller
    {
        private readonly DataContext _context;
        public TicketController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult CreateTicket(Ticket ticket)
        {
            if (ModelState.IsValid)
            {
                var newTicket = new Ticket
                {
                    Title = ticket.Title,
                    Description = ticket.Description,
                    IsResolved = false,
                    SubmittedBy = ticket.SubmittedBy,
                    SubmittedAt = ticket.SubmittedAt,
                          };
                _context.Add(newTicket);
                _context.SaveChanges();

                return Ok();
            }
            else {
                return StatusCode(400);
            }
        }

        [HttpGet]
        public ActionResult GetAllTickets() {

            var tickets = _context.Tickets.OrderBy(x => x.SubmittedAt).ToList();
            return Ok(tickets);
        }

        [HttpGet("/resolved")]
        public ActionResult GetResolved()
        {

            var tickets = _context.Tickets.Where(x => x.IsResolved == true).ToList();

            var count = tickets.Count();

            return Ok(count);
        }

        [HttpGet("/unResolved")]
        public ActionResult GetUnResolvedd()
        {

            var tickets = _context.Tickets.Where(x => x.IsResolved == false).ToList();

            var count = tickets.Count();

            return Ok(count);
        }

        [HttpPut("{id}")]
        public ActionResult MarkTicketResolved(int id) {

            var ticket = _context.Tickets.Where(x => x.Id == id).FirstOrDefault();
            if (ticket == null)
            {
                return StatusCode(400);
            }
            else {
                ticket.IsResolved = true;
                _context.SaveChanges();
                return Ok(ticket);
            }
        }
    }
}