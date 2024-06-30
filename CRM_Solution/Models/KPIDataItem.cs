using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace CRM_Solution.Models
{
    public partial class KPIDataItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? kpiName { get; set; }
        public string? kpiValue { get; set; }

    }
   
}
