# ─── Build Stage ─────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY FoodOrderingSystem.sln ./
COPY src/FoodOrderingSystem.Core/FoodOrderingSystem.Core.csproj            src/FoodOrderingSystem.Core/
COPY src/FoodOrderingSystem.Infrastructure/FoodOrderingSystem.Infrastructure.csproj  src/FoodOrderingSystem.Infrastructure/
COPY src/FoodOrderingSystem.API/FoodOrderingSystem.API.csproj              src/FoodOrderingSystem.API/
COPY src/FoodOrderingSystem.Web/FoodOrderingSystem.Web.csproj              src/FoodOrderingSystem.Web/

RUN dotnet restore src/FoodOrderingSystem.API/FoodOrderingSystem.API.csproj

COPY . .

# Publish (no --no-restore: prevents Windows cached assets from breaking Linux build)
RUN dotnet publish src/FoodOrderingSystem.API/FoodOrderingSystem.API.csproj \
    -c Release -o /app/publish

# ─── Runtime Stage ────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8081
ENV ASPNETCORE_URLS=http://+:8081
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "FoodOrderingSystem.API.dll"]
