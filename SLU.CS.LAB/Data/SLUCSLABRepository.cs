using Microsoft.EntityFrameworkCore;
using SLU.CS.LAB.Data.SeedUser;
using SLU.CS.LAB.Helpers;
using SLU.CS.LAB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLU.CS.LAB.Data
{
    public class SLUCSLABRepository : ISLUCSLABRepository
    {
        private readonly DataContext _context;
        public SLUCSLABRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

    
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);

        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.Messages.AsQueryable();

            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId
                        && u.RecipientDeleted == false);
                    break;

                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId
                        && u.SenderDeleted == false);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId &&
                        u.RecipientDeleted == false && u.IsRead == false);
                    break;
            }

            messages = messages.OrderByDescending(d => d.MessageSent);
            return await PagedList<Message>.CreatedAsync(messages,messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessagesThread(int userId, int recipientId)
        {
            var messages = await _context.Messages
               .Where(m => m.RecipientId == userId && m.RecipientDeleted == false
                       && m.SenderId == recipientId
                   || m.RecipientId == recipientId && m.SenderId == userId
                       && m.SenderDeleted == false) // returns conversation between two users
               .OrderByDescending(m => m.MessageSent)
               .ToListAsync();

            return messages;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }
    }
}
