using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Chat_a_Saurus_Rex.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string message)
        {
            string userName = Context.User?.Identity?.Name ?? "Anonymous";
            await Clients.All.SendAsync("ReceiveMessage", userName, message);
        }
    }
}
