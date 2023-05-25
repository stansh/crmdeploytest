//using Duende.IdentityServer.Services;
//using IdentityServer4.Extensions;
//using IdentityServer4.Models;
//using IdentityServer4.Services;
//using Microsoft.AspNetCore.Identity;
//using System.Collections.Generic;
//using System.Security.Claims;
//using System.Threading.Tasks;

//namespace YourProjectNamespace
//{
//    public class CustomProfileService : IProfileService
//    {
//        private readonly UserManager<ApplicationUser> _userManager;

//        public CustomProfileService(UserManager<ApplicationUser> userManager)
//        {
//            _userManager = userManager;
//        }

//        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
//        {
//            var subjectId = context.Subject.GetSubjectId();
//            var user = await _userManager.FindByIdAsync(subjectId);

//            if (user == null)
//            {
//                throw new ArgumentException("Invalid subject identifier");
//            }

//            var claims = new List<Claim>
//            {
//                new Claim(JwtClaimTypes.Subject, user.Id),
//                new Claim(JwtClaimTypes.Email, user.Email),
//                // Add any additional claims you want to include
//            };

//            // Get the user's roles
//            var roles = await _userManager.GetRolesAsync(user);
//            foreach (var role in roles)
//            {
//                claims.Add(new Claim(JwtClaimTypes.Role, role));
//            }

//            context.IssuedClaims.AddRange(claims);
//        }

//        public Task IsActiveAsync(IsActiveContext context)
//        {
//            // Set the user's active status
//            context.IsActive = true;
//            return Task.CompletedTask;
//        }
//    }
//}
