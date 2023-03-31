using AplicacionAcademica.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicacionAcademica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordGeneralController : ControllerBase
    {
        private readonly sistema_academicoContext _context;

        public RecordGeneralController(sistema_academicoContext context)
        {
            _context = context;
        }

        // GET: api/RecordGeneral
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecordGeneral>>> GetRecordGenerals()
        {
            return await _context.RecordGenerals.ToListAsync();
        }

        // GET: api/RecordGeneral/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecordGeneral>> GetRecordGeneral(int id)
        {
            var recordGeneral = await _context.RecordGenerals.FindAsync(id);

            if (recordGeneral == null)
            {
                return NotFound();
            }

            return recordGeneral;
        }

        // GET: api/RecordGeneral/ByEstudiante/5
        [HttpGet("ByEstudiante/{idEstudiante}")]
        public async Task<ActionResult<RecordGeneral>> GetRecordGeneralByEstudiante(int idEstudiante)
        {
            var recordGeneral = await _context.RecordGenerals.FirstOrDefaultAsync(rg => rg.IdEstudiante == idEstudiante);

            if (recordGeneral == null)
            {
                return NotFound();
            }

            return recordGeneral;
        }

        // POST: api/RecordGeneral
        [HttpPost]
        public async Task<ActionResult<RecordGeneral>> PostRecordGeneral(RecordGeneral recordGeneral)
        {
            _context.RecordGenerals.Add(recordGeneral);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecordGeneral", new { id = recordGeneral.Id }, recordGeneral);
        }

        // PUT: api/RecordGeneral/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecordGeneral(int id, RecordGeneral recordGeneral)
        {
            if (id != recordGeneral.Id)
            {
                return BadRequest();
            }

            _context.Entry(recordGeneral).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecordGeneralExists(id))
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

        // DELETE: api/RecordGeneral/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecordGeneral(int id)
        {
            var recordGeneral = await _context.RecordGenerals.FindAsync(id);
            if (recordGeneral == null)
            {
                return NotFound();
            }

            _context.RecordGenerals.Remove(recordGeneral);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecordGeneralExists(int id)
        {
            return _context.RecordGenerals.Any(e => e.Id == id);
        }
    }
}
