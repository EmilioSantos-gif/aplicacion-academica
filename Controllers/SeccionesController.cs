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
    public class SeccionesController : ControllerBase
    {
        private readonly sistema_academicoContext _context;

        public SeccionesController(sistema_academicoContext context)
        {
            _context = context;
        }

        // GET: api/Secciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seccion>>> GetSecciones()
        {
            return await _context.Seccions.ToListAsync();
        }

        // GET: api/Secciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Seccion>> GetSeccion(int id)
        {
            var seccion = await _context.Seccions.FindAsync(id);

            if (seccion == null)
            {
                return NotFound();
            }

            return seccion;
        }

        // POST: api/Secciones
        [HttpPost]
        public async Task<ActionResult<Seccion>> CreateSeccion(Seccion seccion)
        {
            _context.Seccions.Add(seccion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSeccion), new { id = seccion.Id }, seccion);
        }

        // PUT: api/Secciones/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSeccion(int id, Seccion seccion)
        {
            if (id != seccion.Id)
            {
                return BadRequest();
            }

            _context.Entry(seccion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeccionExists(id))
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

        // DELETE: api/Secciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSeccion(int id)
        {
            var seccion = await _context.Seccions.FindAsync(id);
            if (seccion == null)
            {
                return NotFound();
            }

            _context.Seccions.Remove(seccion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SeccionExists(int id)
        {
            return _context.Seccions.Any(e => e.Id == id);
        }
    }
}
