Copy-Item $env:USERPROFILE\.aspnet\https\SignalRChat.pfx .
docker build -t signalrchat.frontend .
Remove-Item -r SignalRChat.pfx
docker run -dp 3000:3000 signalrchat.frontend