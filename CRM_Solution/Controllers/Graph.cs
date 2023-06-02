
using CRM_Solution.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CRM_Solution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Graph : ControllerBase

    { 

        private readonly CRMDATAContext _context;

        public Graph(CRMDATAContext context)
        {
            _context = context;
        }


        // GET: api/<Graph>

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GraphDatum>>> GetCustomers()
        {
            return null;
        }


        // GET api/<Graph>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Graph>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Graph>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Graph>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
