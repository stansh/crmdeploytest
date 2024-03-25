using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;

namespace CRM_Solution.Models
{
    public partial class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? number { get; set; }
        public string? name { get; set; }
        public string? description { get; set; }
        public string? price { get; set; }
    }
}
