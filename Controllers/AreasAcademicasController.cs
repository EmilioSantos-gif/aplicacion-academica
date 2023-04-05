using AplicacionAcademica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicacionAcademica
{
    [Route("api/[controller]")]
    [ApiController]
    public class AreasAcademicasController : ControllerBase
    {
        private readonly sistema_academicoContext _context;

        public AreasAcademicasController(sistema_academicoContext context)
        {
            _context = context;
        }

        // GET: api/AreasAcademicas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AreaAcademica>>> GetAreasAcademicas()
        {
            return await _context.AreaAcademicas.ToListAsync();
        }

        // GET: api/AreasAcademicas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AreaAcademica>> GetAreaAcademica(int id)
        {
            var areaAcademica = await _context.AreaAcademicas.FindAsync(id);

            if (areaAcademica == null)
            {
                return NotFound();
            }

            return areaAcademica;
        }

        // POST: api/AreasAcademicas
        [HttpPost]
        public async Task<ActionResult<AreaAcademica>> CreateAreaAcademica(AreaAcademica areaAcademica)
        {
            _context.AreaAcademicas.Add(areaAcademica);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAreaAcademica), new { id = areaAcademica.Id }, areaAcademica);
        }

        // PUT: api/AreasAcademicas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAreaAcademica(int id, AreaAcademica areaAcademica)
        {
            if (id != areaAcademica.Id)
            {
                return BadRequest();
            }

            _context.Entry(areaAcademica).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AreaAcademicaExists(id))
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

        // DELETE: api/AreasAcademicas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAreaAcademica(int id)
        {
            var areaAcademica = await _context.AreaAcademicas.FindAsync(id);
            if (areaAcademica == null)
            {
                return NotFound();
            }

            _context.AreaAcademicas.Remove(areaAcademica);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AreaAcademicaExists(int id)
        {
            return _context.AreaAcademicas.Any(e => e.Id == id);
        }
    }
}
