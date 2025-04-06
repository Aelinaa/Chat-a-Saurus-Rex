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

        public override async Task OnConnectedAsync()
        {
            checkUser();
        }

            public async Task SendMessage(string message)
        {
            checkUser();
            string userName = Context.User?.Identity?.Name ?? "Anonymous";
            await Clients.All.SendAsync("ReceiveMessage", userName, message);
        }

        private async Task checkUser()
        {
            var user = await _userManager.GetUserAsync(Context.User);


            if (user == null || user.LockoutEnd > DateTimeOffset.UtcNow)
            {

                await Clients.Caller.SendAsync("ReceiveMessage", "X", "You can not send messages, you have been banned");
                Context.Abort();

                return;
            }
        }
    }
}
