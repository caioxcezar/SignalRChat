using SignalRChat.Contexts;
using SignalRChat.Models;
using System;

namespace SignalRChat.Repositories
{
    public class MessageRepository
    {
        internal IEnumerable<Message> getMessages(string sender, string receiver)
        {
            var chat = new string[] { sender, receiver };
            using var dbContext = new DataContext();
            return dbContext.Messages.Where(message => chat.Contains(message.Sender) && chat.Contains(message.Receiver)).ToList();
        }

        internal int Add(Message message)
        {
            using var dbContext = new DataContext();
            message.Created = DateTime.Now;
            dbContext.Messages.Add(message);
            dbContext.SaveChanges();
            return message.Id;
        }

        internal Message? getMessage(int id)
        {
            using var dbContext = new DataContext();
            return dbContext.Messages.FirstOrDefault(message => message.Id == id);
        }

        internal void Update(Message message)
        {
            using var dbContext = new DataContext();
            var old = dbContext.Messages.First(m => m.Id == message.Id);
            old = message;
            old.Updated = DateTime.Now;
            dbContext.SaveChanges();
        }
    }
}
