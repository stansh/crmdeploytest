using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRM_Solution.Models;

using MongoDB.Driver;

using System.Diagnostics;
using NuGet.Protocol.Plugins;
using MongoDB.Bson;
using static CRM_Solution.Controllers.KPIDataController;



namespace CRM_Solution.Controllers
{
    
    [Route("api/kpidata")]
    [ApiController]

    public class KPIDataController : ControllerBase
    {

        private readonly KPIDataRepository _KPIDataRepository;

        public KPIDataController()
        {
            var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
            var databaseName = "crmdata";
            var collectionName = "kpidata";

            _KPIDataRepository = new KPIDataRepository(connectionString, databaseName, collectionName);
        }


        //CustomerRepository
        public class KPIDataRepository
        {
            private readonly IMongoCollection<KPIDataItem> _KPIDataItems;

            public KPIDataRepository(string connectionString, string databaseName, string collectionName)
            {
                var client = new MongoClient(connectionString);
                var database = client.GetDatabase(databaseName);
                _KPIDataItems = database.GetCollection<KPIDataItem>(collectionName);
            }

            public async Task<List<KPIDataItem>> GetKPIData() =>
                await _KPIDataItems.Find(_ => true).ToListAsync();
               
        }



        // KPI Data Endpoints:


        [HttpGet]
        public async Task<List<KPIDataItem>> Get() =>
            await _KPIDataRepository.GetKPIData();
      
    }


}

    //public async Task<Customer> CreateAsync(Customer customer)
    //{
    //        await _customerRepository.AddCustomer(customer);
    //        return customer;
    //    }

    //public IHttpActionResult Post(Customer customer)
    //{
    //    _customerRepository.AddCustomer(customer);
    //    // return (IHttpActionResult)CreatedAtRoute("customers", new { id = customer._id }, customer);
    //    return IHttpActionResult
    //}

    // [Microsoft.AspNetCore.Mvc.HttpPost]
    //public async Customer Post(Customer customer) 
    //{
    //    return _customerRepository.AddCustomer(customer);
    //}





    //    public IHttpActionResult Get(ObjectId id)
    //{
    //    var customer = _customerRepository.GetCustomerById(id);
    //    if (customer == null)
    //    {
    //        return (IHttpActionResult)NotFound();
    //    }
    //    return (IHttpActionResult)Ok(customer);
    //}

    //// POST api/customers
    //public IHttpActionResult Post(Customer customer)
    //{
    //    _customerRepository.AddCustomer(customer);
    //    return (IHttpActionResult)CreatedAtRoute("DefaultApi", new { id = customer._id }, customer);
    //}

    //// PUT api/customers/{id}
    //public IHttpActionResult Put(ObjectId id, Customer customer)
    //{
    //    var existingCustomer = _customerRepository.GetCustomerById(id);
    //    if (existingCustomer == null)
    //    {
    //        return (IHttpActionResult)NotFound();
    //    }

    //    customer._id = existingCustomer._id;
    //    _customerRepository.UpdateCustomer(id, customer);
    //    return (IHttpActionResult)Ok(customer);
    //}

    //// DELETE api/customers/{id}
    //public IHttpActionResult Delete(ObjectId id)
    //{
    //    var existingCustomer = _customerRepository.GetCustomerById(id);
    //    if (existingCustomer == null)
    //    {
    //        return (IHttpActionResult)NotFound();
    //    }

    //    _customerRepository.RemoveCustomer(id);
    //    return (IHttpActionResult)Ok();
    //}








    //[HttpGet]
    //public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
    //{
    //    if (_context.Customers == null)
    //    {
    //        return NotFound();
    //    }

    //    if (User.IsInRole("User"))
    //    {
    //        return Unauthorized();
    //    }
    //    return await _context.Customers.ToListAsync();

    //}



    //    //GET: api/Customers/5
    //    [HttpGet("{id}")]
    //    public async Task<ActionResult<Customer>> GetCustomer(int id)
    //    {
    //        if (_context.Customers == null)
    //        {
    //            return NotFound();
    //        }
    //        var customer = await _context.Customers.FindAsync(id);

    //        if (customer == null)
    //        {
    //            return NotFound();
    //        }

    //        return customer;
    //    }

    //    //PUT: api/Customers/5
    //     To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> PutCustomer(int id, Customer customer)
    //    {
    //        if (id != customer.Id)
    //        {
    //            return BadRequest();
    //        }

    //        _context.Entry(customer).State = EntityState.Modified;

    //        try
    //        {
    //            await _context.SaveChangesAsync();
    //        }
    //        catch (DbUpdateConcurrencyException)
    //        {
    //            if (!CustomerExists(id))
    //            {
    //                return NotFound();
    //            }
    //            else
    //            {
    //                throw;
    //            }
    //        }

    //        return NoContent();
    //    }

    //    //POST: api/Customers
    //   // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    //    [HttpPost]
    //    public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
    //    {
    //        if (_context.Customers == null)
    //        {
    //            return Problem("Entity set 'CRMDATAContext.Customers'  is null.");
    //        }
    //        _context.Customers.Add(customer);
    //        await _context.SaveChangesAsync();

    //        return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
    //    }

    //   // DELETE: api/Customers/5
    //    [HttpDelete("{id}")]
    //    public async Task<IActionResult> DeleteCustomer(int id)
    //    {
    //        if (_context.Customers == null)
    //        {
    //            return NotFound();
    //        }
    //        var customer = await _context.Customers.FindAsync(id);
    //        if (customer == null)
    //        {
    //            return NotFound();
    //        }

    //        _context.Customers.Remove(customer);
    //        await _context.SaveChangesAsync();

    //        return NoContent();
    //    }

    //    private bool CustomerExists(int id)
    //    {
    //        return (_context.Customers?.Any(e => e.Id == id)).GetValueOrDefault();
    //    }




