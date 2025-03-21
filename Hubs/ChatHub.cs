using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Chat_a_Saurus_Rex.Hubs
{
    public class ChatHub : Hub
    {
        private readonly UserManager<IdentityUser> _userManager;

        public ChatHub(UserManager<IdentityUser> userManager) 
        {
            _userManager = userManager;
        }

        public async Task SendMessage(string message)
        {
            var user = await _userManager.GetUserAsync(Context.User);


            //if (user == null || user.LockoutEnd > DateTimeOffset.UtcNow)
            //{
            //    await Clients.Caller.SendAsync("ReceiveMessage", "Security notice", "You have been banned");
            //    return;
            //}
            string userName = Context.User?.Identity?.Name ?? "Anonymous";
            await Clients.All.SendAsync("ReceiveMessage", userName, message);
        }
    }
}
