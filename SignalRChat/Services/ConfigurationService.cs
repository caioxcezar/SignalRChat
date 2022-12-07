namespace SignalRChat.Services;

public class ConfigurationService
{
    private readonly ConfigurationManager _manager;
    public static ConfigurationService Instance { get; private set; } = null!;

    private ConfigurationService(ConfigurationManager manager)
    {
        _manager = manager;
    }

    public static void SetInstance(ConfigurationManager manager)
    {
        Instance = new ConfigurationService(manager);
    }

    public string GetValue(string key) => _manager[key];
}