dotnet dev-certs https -ep $env:USERPROFILE\.aspnet\https\SignalRChat.pfx -p AakhzdF7cgXL8f
dotnet dev-certs https --trust
docker build -t signalrchat.backend .
docker run -d -p 5229:80 -p 7260:443 -e ASPNETCORE_URLS="https://+;http://+" -e ASPNETCORE_HTTPS_PORT=7260 -e ASPNETCORE_Kestrel__Certificates__Default__Password="AakhzdF7cgXL8f" -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/SignalRChat.pfx -v $env:USERPROFILE\.aspnet\https:/https/ signalrchat.backend