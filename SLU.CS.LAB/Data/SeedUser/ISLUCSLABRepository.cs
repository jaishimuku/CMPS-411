using SLU.CS.LAB.Helpers;
using SLU.CS.LAB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLU.CS.LAB.Data.SeedUser
{
    public interface ISLUCSLABRepository
    {
            //We are using generic type of method here
            void Add<T>(T entity) where T : class;
            void Delete<T>(T entity) where T : class;
            Task<bool> SaveAll();
            Task<User> GetUser(int id);
            Task<Message> GetMessage(int id);
            Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams); //inbox,outbox,readmessages
            Task<IEnumerable<Message>> GetMessagesThread(int userId, int recipientId);
       
    }
}
