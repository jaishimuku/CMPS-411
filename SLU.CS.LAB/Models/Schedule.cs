using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLU.CS.LAB.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public DayOfWeek Days { get; set; }
        public string Time { get; set; }
        public string TA { get; set; }
    }
}
