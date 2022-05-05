using angualrchat.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using angualrchat.Data;
using angualrchat.Areas.Identity.Data;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("ApplicationDbContextConnection");;

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));;

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<ApplicationDbContext>();;

// Add services to the container.
//builder.Services.AddControllersWithViews();
builder.Services.AddControllers();

//builder.Services.AddApiVersioning().AddControllers();

builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    options.AddPolicy("todos", bul => {
        bul.AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowed((host) => true)
            .AllowCredentials();
    });
});
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseCors("todos");

app.UseStaticFiles();
app.UseRouting();
app.UseSwagger();
app.UseSwaggerUI();




app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");



app.MapRazorPages();
app.MapFallbackToFile("index.html");
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();

app.UseEndpoints(endpoints => {
    endpoints.MapControllers();

    endpoints.MapHub<Mensajes>("cnn");
    endpoints.MapRazorPages();

});


app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = string.Empty;
});

app.Run();
