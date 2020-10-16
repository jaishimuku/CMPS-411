using Newtonsoft.Json;
using SLU.CS.LAB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLU.CS.LAB.Data
{
    public class Seed
    {
        public static void SeedUser(DataContext context)
        {
            if (!context.Users.Any())
            {
                 var userData = System.IO.File.ReadAllText("Data/SeedUser/UserSeedData.json");
                 var users = JsonConvert.DeserializeObject<List<User>>(userData);
          
                foreach (var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }
        
        public static void SeedSchedule(DataContext _context) {
            //added objects like this to keep it in order so that the frontend renders in correct format
            var row1 = new Schedule() { Days = DayOfWeek.Sunday, Time = "2:00PM-3:00PM", TA = "" };
            _context.Add(row1);
            _context.SaveChanges();

            var row2 = new Schedule() { Days = DayOfWeek.Sunday, Time = "3:00PM-4:00PM", TA = "" };
            _context.Add(row2);
            _context.SaveChanges();

            var row3 = new Schedule() { Days = DayOfWeek.Sunday, Time = "4:00PM-5:00PM", TA = "" };
            _context.Add(row3);
            _context.SaveChanges();

            var row4 = new Schedule() { Days = DayOfWeek.Sunday, Time = "5:00PM-6:00PM", TA = "" };
            _context.Add(row4);
            _context.SaveChanges();

            var row5 = new Schedule() { Days = DayOfWeek.Sunday, Time = "6:00PM-7:00PM", TA = "" };
            _context.Add(row5);
            _context.SaveChanges();

            var row6 = new Schedule() { Days = DayOfWeek.Monday, Time = "2:00PM-3:00PM", TA = "" };
            _context.Add(row6);
            _context.SaveChanges();

            var row7 = new Schedule() { Days = DayOfWeek.Monday, Time = "3:00PM-4:00PM", TA = "" };
            _context.Add(row7);
            _context.SaveChanges();

            var row8 = new Schedule() { Days = DayOfWeek.Monday, Time = "4:00PM-5:00PM", TA = "" };
            _context.Add(row8);
            _context.SaveChanges();

            var row9 = new Schedule() { Days = DayOfWeek.Monday, Time = "5:00PM-6:00PM", TA = "" };
            _context.Add(row9);
            _context.SaveChanges();

            var row10 = new Schedule() { Days = DayOfWeek.Monday, Time = "6:00PM-7:00PM", TA = "" };
            _context.Add(row10);
            _context.SaveChanges();

            var row11 = new Schedule() { Days = DayOfWeek.Tuesday, Time = "2:00PM-3:00AM", TA = "" };
            _context.Add(row11);
            _context.SaveChanges();

            var row12 = new Schedule() { Days = DayOfWeek.Tuesday, Time = "3:00PM-4:00PM", TA = "" };
            _context.Add(row12);
            _context.SaveChanges();

            var row13 = new Schedule() { Days = DayOfWeek.Tuesday, Time = "4:00PM-5:00PM", TA = "" };
            _context.Add(row13);
            _context.SaveChanges();

            var row14 = new Schedule() { Days = DayOfWeek.Tuesday, Time = "5:00PM-6:00PM", TA = "" };
            _context.Add(row14);
            _context.SaveChanges();

            var row15 = new Schedule() { Days = DayOfWeek.Tuesday, Time = "6:00PM-7:00PM", TA = "" };
            _context.Add(row15);
            _context.SaveChanges();

            var row16 = new Schedule() { Days = DayOfWeek.Wednesday, Time = "2:00PM-3:00PM", TA = "" };
            _context.Add(row16);
            _context.SaveChanges();

            var row17 = new Schedule() { Days = DayOfWeek.Wednesday, Time = "3:00PM-4:00PM", TA = "" };
            _context.Add(row17);
            _context.SaveChanges();

            var row18 = new Schedule() { Days = DayOfWeek.Wednesday, Time = "4:00PM-5:00PM", TA = "" };
            _context.Add(row18);
            _context.SaveChanges();

            var row19 = new Schedule() { Days = DayOfWeek.Wednesday, Time = "5:00PM-6:00PM", TA = "" };
            _context.Add(row19);
            _context.SaveChanges();

            var row20 = new Schedule() { Days = DayOfWeek.Wednesday, Time = "6:00PM-7:00PM", TA = "" };
            _context.Add(row20);
            _context.SaveChanges();

           
        }
        
    }
}
