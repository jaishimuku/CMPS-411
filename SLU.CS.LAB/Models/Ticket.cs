using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SLU.CS.LAB.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public Boolean IsResolved { get; set; }
        [Required]
        public string SubmittedBy { get; set; }
        public DateTime SubmittedAt { get; set; }
        public Ticket()
        {
            SubmittedAt = DateTime.Now;
        }
    }
}
