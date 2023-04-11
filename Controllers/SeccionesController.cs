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

        // GET: api/Secciones
        [HttpGet("maestro/{idMaestro}")]
        public async Task<ActionResult<IEnumerable<Object>>> GetSeccionesPorMaestro(int idMaestro)
        {
            return await _context.Seccions
                .Include(s => s.IdAsignaturaNavigation)
                .Include(s => s.AulaNavigation)
                .Where(s => s.IdMaestro == idMaestro)
                .Select(s => new { 
                    s.Id,
                    s.Codigo,
                    Asignatura = s.IdAsignaturaNavigation.Nombre,
                    s.Capacidad,
                    Aula = s.AulaNavigation.Codigo
                })
                .ToListAsync();
        }

        [HttpGet("{idSeccion}/estudiantes")]
        public async Task<ActionResult<IEnumerable<Object>>> GetUsuarioPorSeccion(int idSeccion)
        {
            /*
            var estudiantes = await _context.Seccions
                .Include(sec => sec.Seleccions)
                .ThenInclude(sel => sel.IdEstudianteNavigation)
                .Where(sec => sec.Id == idSeccion)
                .Select(s => new
                {
                    s.Seleccions.
                })
                .ToListAsync();
            */
            int idEstadoEnCurso = 6;

            var selecciones = await _context.Seleccions
                .Include(sel => sel.IdEstudianteNavigation)
                .Where(sel => sel.IdSeccion == idSeccion /*&& sel.Estado == idEstadoEnCurso*/)
                .ToListAsync();
                
            if (selecciones == null)
            {
                return NotFound();
            }

            return selecciones;
        }



        // GET: api/Secciones
        /*
        [HttpGet("related")]
        public async Task<ActionResult<IEnumerable<Seccion>>> GetSeccionesWithRelatedEntities()
        {
            return await _context.Seccions
                .Include(s => s.IdAsignaturaNavigation)
                .Include(s => s.IdMaestroNavigation)
                .Include(s => s.AulaNavigation)
                .Include(s => s.PeriodoNavigation)
                .ToListAsync();
        }

        */

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

        // GET: api/Secciones/5
        [HttpGet("related/{id}")]
        public async Task<ActionResult<Seccion>> GetSeccionWithRelatedEntities(int id)
        {
            var seccion = await _context.Seccions
                .Include(s => s.IdMaestroNavigation)
                .SingleOrDefaultAsync(s => s.Id == id);

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
