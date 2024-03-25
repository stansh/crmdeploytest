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
using static CRM_Solution.Controllers.LeadsController;



namespace CRM_Solution.Controllers
{

    [Route("api/leads")]
    [ApiController]

    public class LeadsController : ControllerBase
    {

        private readonly leadRepository _leadRepository;

        public LeadsController()
        {
            var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
            var databaseName = "crmdata";
            var collectionName = "leads";

            _leadRepository = new leadRepository(connectionString, databaseName, collectionName);
        }


        //LeadsRepository
        public class leadRepository
        {
            private readonly IMongoCollection<Lead> _leads;

            public leadRepository(string connectionString, string databaseName, string collectionName)
            {
                var client = new MongoClient(connectionString);
                var database = client.GetDatabase(databaseName);
                _leads = database.GetCollection<Lead>(collectionName);
            }


            public async Task<List<Lead>> Getleads() =>
                await _leads.Find(_ => true).ToListAsync();

            public async Task<Lead?> GetleadById(string id) =>
                await _leads.Find(x => x.Id == id).FirstOrDefaultAsync();


            public async Task Addlead(Lead lead) =>
                await _leads.InsertOneAsync(lead);

            public async Task Updatelead(string id, Lead lead) =>
                await _leads.ReplaceOneAsync(x => x.Id == id, lead);

            public async Task Removelead(string id) =>
                await _leads.DeleteOneAsync(x => x.Id == id);


        }



        // leads Endpoints:


        [HttpGet]
        public async Task<List<Lead>> Get() =>
            await _leadRepository.Getleads();


        [HttpGet("{id}")]
        public async Task<ActionResult<Lead>> Get(string id)
        {
            var lead = await _leadRepository.GetleadById(id);

            if (lead is null)
            {
                return NotFound();
            }

            return lead;
        }


        [HttpPost]
        public async Task<IActionResult> Post(Lead lead)
        {
            await _leadRepository.Addlead(lead);

            return CreatedAtAction(nameof(Get), new { id = lead.Id }, lead);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Lead lead)
        {
            var custToBeUpdated = _leadRepository.GetleadById(id);

            if (custToBeUpdated is null)
            {
                return NotFound();
            }

            lead.Id = custToBeUpdated.Result.Id;

            await _leadRepository.Updatelead(id, lead);

            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var book = await _leadRepository.GetleadById(id);

            if (book is null)
            {
                return NotFound();
            }

            await _leadRepository.Removelead(id);

            return NoContent();
        }

    }


}












