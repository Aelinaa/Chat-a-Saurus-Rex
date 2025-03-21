using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Chat_a_Saurus_Rex.Controllers
{
    public class AdminController : Controller
    {

        private readonly UserManager<IdentityUser> _userManager;

        public AdminController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [Authorize(Roles = "Administrator")]
        // GET: AdminController
        public async Task<IActionResult> Index()
        {
            var users = _userManager.Users.ToList();
            var nonAdminUsers = new List<IdentityUser>();

            if (users == null)
            {
                return View(new List<IdentityUser>()); // Ensures an empty list is sent, not null
            }

            foreach (var user in users)
            {
                if (!await _userManager.IsInRoleAsync(user, "Administrator"))
                {
                    nonAdminUsers.Add(user);
                }
            }

            return View(nonAdminUsers);
        }


        [HttpPost]
        public async Task<IActionResult> BanUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            user.LockoutEnd = DateTime.UtcNow.AddYears(100); // Lock the account for a long time

            await _userManager.UpdateAsync(user);

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> UnbanUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            user.LockoutEnd = null; // Remove lock
            await _userManager.UpdateAsync(user);

            return RedirectToAction("Index");
        }
    }
}
