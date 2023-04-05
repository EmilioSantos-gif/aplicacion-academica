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
    public class SeleccionesController : ControllerBase
    {
        private readonly sistema_academicoContext _context;

        public SeleccionesController(sistema_academicoContext context)
        {
            _context = context;
        }

        // GET: api/Selecciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seleccion>>> GetSelecciones()
        {
            return await _context.Seleccions.ToListAsync();
        }

        // GET: api/Selecciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Seleccion>> GetSeleccion(int id)
        {
            var seleccion = await _context.Seleccions.FindAsync(id);

            if (seleccion == null)
            {
                return NotFound();
            }

            return seleccion;
        }

        // POST: api/Selecciones
        [HttpPost]
        public async Task<ActionResult<Seleccion>> CreateSeleccion(Seleccion seleccion)
        {
            _context.Seleccions.Add(seleccion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSeleccion), new { id = seleccion.IdEstudiante }, seleccion);
        }

        // PUT: api/Selecciones/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSeleccion(int id, Seleccion seleccion)
        {
            if (id != seleccion.IdEstudiante)
            {
                return BadRequest();
            }

            _context.Entry(seleccion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeleccionExists(id))
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

        // DELETE: api/Selecciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSeleccion(int id)
        {
            var seleccion = await _context.Seleccions.FindAsync(id);
            if (seleccion == null)
            {
                return NotFound();
            }

            _context.Seleccions.Remove(seleccion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SeleccionExists(int id)
        {
            return _context.Seleccions.Any(e => e.IdEstudiante == id);
        }
    }
}
