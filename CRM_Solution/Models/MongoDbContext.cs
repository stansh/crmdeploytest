using CRM_Solution.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

public class MongoDbContext : DbContext
{
    private readonly IMongoClient _client;
    private readonly IMongoDatabase _database;

    public MongoDbContext(string connectionString, string databaseName)
    {
        _client = new MongoClient(connectionString);
        _database = _client.GetDatabase(databaseName);
    }

    // You can create properties for each collection you'll use in your application
    public IMongoCollection<Customer> Customers => _database.GetCollection<Customer>("customers");
    public IMongoCollection<Lead> Leads => _database.GetCollection<Lead>("leads");
}