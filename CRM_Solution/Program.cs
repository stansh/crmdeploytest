
using CRM_Solution.Data;
//using CRM_Solution.Identity;
using CRM_Solution.Models;
using Duende.IdentityServer.Models;
using IdentityModel;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

var connectionString2 = builder.Configuration.GetConnectionString("data");
builder.Services.AddDbContext<CRMDATAContext>(options =>
    options.UseSqlServer(connectionString2));


builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = false)
      .AddRoles<IdentityRole>()
      .AddEntityFrameworkStores<ApplicationDbContext>();





//builder.Services.AddIdentityServer()
//    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

builder.Services.AddIdentityServer()
            .AddApiAuthorization<ApplicationUser, ApplicationDbContext>(x =>
            {
                x.IdentityResources.Add(new IdentityResource("roles", "Roles", new[] { JwtClaimTypes.Role, ClaimTypes.Role }));
                foreach (var c in x.Clients)
                {
                    c.AllowedScopes.Add("roles");
                }
                foreach (var a in x.ApiResources)
                {
                    a.UserClaims.Add(JwtClaimTypes.Role);
                }


            });




builder.Services.AddAuthentication();
    //.AddIdentityServerJwt();






builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI();
    
}
else
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

//app.UseAuthentication();
app.UseIdentityServer();
//app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");



#region Add users and roles 
//using (var scope = app.Services.CreateScope())
//{
//    var roleManager = scope.ServiceProvider.GetRequiredService <RoleManager<IdentityRole>>();
//    var roles = new[] { "Admin", "User" };

//    foreach (var role in roles)
//    {
//        if (!await roleManager.RoleExistsAsync(role))
//            await roleManager.CreateAsync(new IdentityRole(role));
//    }
//}

//using (var scope = app.Services.CreateScope())
//{
//    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();


//    // if(await userManager.FindByEmailAsync("sadasd@yam.com") != null)
//    var user = await userManager.FindByEmailAsync("sadasd@yam.com");
//    await userManager.AddToRoleAsync(user, "Admin");

//    var user2 = await userManager.FindByEmailAsync("user@user.us");
//    await userManager.AddToRoleAsync(user2, "User");

//}

#endregion


app.MapRazorPages();

app.MapFallbackToFile("index.html"); ;

app.Run();



