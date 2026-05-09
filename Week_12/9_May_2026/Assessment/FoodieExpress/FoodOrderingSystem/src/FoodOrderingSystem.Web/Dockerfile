# ─── Build Stage ─────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy solution & project files first (for layer caching)
COPY FoodOrderingSystem.sln ./
COPY src/FoodOrderingSystem.Core/FoodOrderingSystem.Core.csproj            src/FoodOrderingSystem.Core/
COPY src/FoodOrderingSystem.Infrastructure/FoodOrderingSystem.Infrastructure.csproj  src/FoodOrderingSystem.Infrastructure/
COPY src/FoodOrderingSystem.Web/FoodOrderingSystem.Web.csproj              src/FoodOrderingSystem.Web/
COPY src/FoodOrderingSystem.API/FoodOrderingSystem.API.csproj              src/FoodOrderingSystem.API/

# Restore dependencies
RUN dotnet restore src/FoodOrderingSystem.Web/FoodOrderingSystem.Web.csproj

# Copy all source
COPY . .

# Publish (no --no-restore: prevents Windows cached assets from breaking Linux build)
RUN dotnet publish src/FoodOrderingSystem.Web/FoodOrderingSystem.Web.csproj \
    -c Release -o /app/publish

# ─── Runtime Stage ────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Create uploads directory
RUN mkdir -p wwwroot/images/food

COPY --from=build /app/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "FoodOrderingSystem.Web.dll"]
