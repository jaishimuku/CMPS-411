using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLU.CS.LAB.Models
{
    public class ActivityLog
    {
        public int Id { get; set; }
        public string WNumber { get; set; }
        public string Name { get; set; }
        public string Course { get; set; }
        public DateTime TimeIn { get; set; }
        public DateTime? TimeOut { get; set; }
        public string Topic { get; set; }
        public string Tutor { get; set; }
        public ActivityLog()
        {
            TimeIn = DateTime.Now;
            TimeOut = DateTime.Now;
        }
    }

}
