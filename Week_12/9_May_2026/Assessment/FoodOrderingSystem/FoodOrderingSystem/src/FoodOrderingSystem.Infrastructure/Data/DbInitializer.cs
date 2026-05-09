using FoodOrderingSystem.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace FoodOrderingSystem.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        await context.Database.MigrateAsync();

        // Seed Roles
        string[] roles = ["Admin", "Customer"];
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }

        // Seed Admin User
        const string adminEmail = "admin@foodorder.com";
        if (await userManager.FindByEmailAsync(adminEmail) == null)
        {
            var admin = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                FullName = "System Admin",
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(admin, "Admin@123");
            if (result.Succeeded)
                await userManager.AddToRoleAsync(admin, "Admin");
        }

        // Seed Categories
        if (!await context.Categories.AnyAsync())
        {
            var categories = new List<Category>
            {
                new() { Name = "Burgers", Description = "Juicy and delicious burgers" },
                new() { Name = "Pizza", Description = "Freshly baked pizzas" },
                new() { Name = "Pasta", Description = "Italian style pasta dishes" },
                new() { Name = "Beverages", Description = "Refreshing drinks" },
                new() { Name = "Desserts", Description = "Sweet treats and desserts" }
            };
            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();

            // Seed Food Items
            var burgerCat = categories[0];
            var pizzaCat = categories[1];
            var pastaCat = categories[2];
            var bevCat = categories[3];
            var dessertCat = categories[4];

            var foodItems = new List<FoodItem>
            {
                new() { Name = "Classic Burger", Description = "Beef patty with lettuce, tomato & cheese", Price = 8.99m, CategoryId = burgerCat.Id },
                new() { Name = "Chicken Burger", Description = "Grilled chicken with mayo and veggies", Price = 7.99m, CategoryId = burgerCat.Id },
                new() { Name = "Margherita Pizza", Description = "Classic tomato sauce with mozzarella", Price = 11.99m, CategoryId = pizzaCat.Id },
                new() { Name = "Pepperoni Pizza", Description = "Loaded with pepperoni and cheese", Price = 13.99m, CategoryId = pizzaCat.Id },
                new() { Name = "Spaghetti Bolognese", Description = "Rich meat sauce over spaghetti", Price = 10.99m, CategoryId = pastaCat.Id },
                new() { Name = "Penne Arrabbiata", Description = "Spicy tomato sauce with penne", Price = 9.99m, CategoryId = pastaCat.Id },
                new() { Name = "Cola", Description = "Chilled Coca-Cola 330ml", Price = 1.99m, CategoryId = bevCat.Id },
                new() { Name = "Fresh Juice", Description = "Freshly squeezed orange juice", Price = 2.99m, CategoryId = bevCat.Id },
                new() { Name = "Chocolate Cake", Description = "Rich, moist chocolate layer cake", Price = 4.99m, CategoryId = dessertCat.Id },
                new() { Name = "Ice Cream Sundae", Description = "Vanilla ice cream with toppings", Price = 3.99m, CategoryId = dessertCat.Id }
            };
            await context.FoodItems.AddRangeAsync(foodItems);
            await context.SaveChangesAsync();
        }
    }
}
