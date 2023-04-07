// Controllers/CarreraAsignaturaController.cs

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
    public class CarreraAsignaturaController : ControllerBase
    {
        private readonly sistema_academicoContext _context;

        public CarreraAsignaturaController(sistema_academicoContext context)
        {
            _context = context;
        }

        // GET: api/CarreraAsignatura
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarreraAsignatura>>> GetCarreraAsignaturas()
        {
            return await _context.CarreraAsignaturas
                .Include(ca => ca.IdCarreraNavigation)
                .Include(ca => ca.IdAsignaturaNavigation)
                .ToListAsync();
        }

        // GET: api/CarreraAsignatura/AsignaturasByCarrera/5
        [HttpGet("AsignaturasByCarrera/{idCarrera}")]
        public async Task<ActionResult<IEnumerable<Asignatura>>> GetAsignaturasByCarrera(int idCarrera)
        {
            var asignaturas = await _context.CarreraAsignaturas
                .Include(ca => ca.IdAsignaturaNavigation)
                .Where(ca => ca.IdCarrera == idCarrera)
                .Select(ca => ca.IdAsignaturaNavigation)
                .ToListAsync();

            if (!asignaturas.Any())
            {
                return NotFound();
            }

            return asignaturas;
        }

        // POST: api/CarreraAsignatura
        [HttpPost]
        public async Task<ActionResult<CarreraAsignatura>> CreateCarreraAsignatura(CarreraAsignatura carreraAsignatura)
        {
            _context.CarreraAsignaturas.Add(carreraAsignatura);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCarreraAsignaturas), new { id = carreraAsignatura.IdCarrera }, carreraAsignatura);
        }

        // DELETE: api/CarreraAsignatura
        [HttpDelete("{idCarrera}/{idAsignatura}")]
        public async Task<IActionResult> DeleteCarreraAsignatura(int idCarrera, int idAsignatura)
        {
            var carreraAsignatura = await _context.CarreraAsignaturas
                .FirstOrDefaultAsync(ca => ca.IdCarrera == idCarrera && ca.IdAsignatura == idAsignatura);

            if (carreraAsignatura == null)
            {
                return NotFound();
            }

            _context.CarreraAsignaturas.Remove(carreraAsignatura);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
