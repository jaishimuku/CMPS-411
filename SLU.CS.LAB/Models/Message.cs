using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SLU.CS.LAB.Models
{
    public class Message
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Text { get; set; }
        public DateTime When { get; set; }

        public int UserID { get; set; }
        public virtual AppUser AppUser { get; set; }



    }
}
