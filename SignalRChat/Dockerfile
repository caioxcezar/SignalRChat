FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /SignalRChat
# restores nuget packages
COPY *.csproj .
RUN dotnet restore
# copy source code
COPY . .
# builds the source code using the SDK
RUN dotnet publish -c release -o /executable --no-restore
# runs the deployable on a separate image
# that is shipped with the .NET Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /executable .
ENTRYPOINT ["dotnet", "SignalRChat.dll"]