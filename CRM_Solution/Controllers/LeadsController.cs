using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRM_Solution.Models;

namespace CRM_Solution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeadsController : ControllerBase
    {
        private readonly CRMDATAContext _context;

        public LeadsController(CRMDATAContext context)
        {
            _context = context;
        }

        // GET: api/Leads
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeads()
        {
          if (_context.Leads == null)
          {
              return NotFound();
          }
            return await _context.Leads.ToListAsync();
        }

        // GET: api/Leads/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lead>> GetLead(int id)
        {
          if (_context.Leads == null)
          {
              return NotFound();
          }
            var lead = await _context.Leads.FindAsync(id);

            if (lead == null)
            {
                return NotFound();
            }

            return lead;
        }

        // PUT: api/Leads/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLead(int id, Lead lead)
        {
            if (id != lead.Id)
            {
                return BadRequest();
            }

            _context.Entry(lead).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Leads
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Lead>> PostLead(Lead lead)
        {
          if (_context.Leads == null)
          {
              return Problem("Entity set 'CRMDATAContext.Leads'  is null.");
          }
            _context.Leads.Add(lead);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LeadExists(lead.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLead", new { id = lead.Id }, lead);
        }

        // DELETE: api/Leads/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLead(int id)
        {
            if (_context.Leads == null)
            {
                return NotFound();
            }
            var lead = await _context.Leads.FindAsync(id);
            if (lead == null)
            {
                return NotFound();
            }

            _context.Leads.Remove(lead);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LeadExists(int id)
        {
            return (_context.Leads?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
