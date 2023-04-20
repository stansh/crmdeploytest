using System;
using System.Collections.Generic;

namespace CRM_Solution.Models
{
    public partial class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Price { get; set; }
    }
}
