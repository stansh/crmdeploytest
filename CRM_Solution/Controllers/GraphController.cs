using CRM_Solution.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CRM_Solution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraphController : ControllerBase
    {

        private readonly ols_CRMDATAContext _context;

        public GraphController(ols_CRMDATAContext context)
        {
            _context = context;
        }
        // GET: api/<GraphController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GraphDatum>>> Get()
        {
            if (_context.GraphData == null)
            {
                return NotFound();
            }

            //if (User.IsInRole("Admin"))
            //{
            //   // return Unauthorized();
            //    return await _context.GraphData.ToListAsync();
            //}
            return await _context.GraphData.ToListAsync();

        }

        // GET api/<GraphController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<GraphController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<GraphController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<GraphController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
