using System;
using System.Collections.Generic;

namespace CRM_Solution.Models
{
    public partial class Customer
    {
        public int CustomerId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
