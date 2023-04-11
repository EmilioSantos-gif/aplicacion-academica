using AplicacionAcademica.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;

namespace AplicacionAcademica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly sistema_academicoContext _context;

        public UsuariosController(sistema_academicoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // GET: api/Usuarios/usuario1/{usuario1}
        [HttpGet("user/{usuario1}")]
        public async Task<ActionResult<Usuario>> GetUsuarioPorUsuario1(string usuario1)
        {
            var usuario = await _context.Usuarios.SingleOrDefaultAsync(u => u.Usuario1 == usuario1);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // GET: api/Usuarios/rol/{rol}
        [HttpGet("rol/{idRol}")]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarioPorRol(int idRol)
        {
            var usuario = await _context.Usuarios.Where(u => u.Rol == idRol).ToListAsync();

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }



        // GET: api/usuarios/honores
        [HttpGet("honores")]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuariosConHonores()
        {
            /*
            {
                var graduados = await _context.Usuarios.Include(u => u.RecordGeneral)
                    .ThenInclude(rg => rg.Carrera)
                    .Where(u => u.RecordGeneral.AsignaturasAprobadas == u.RecordGeneral.Carrera.Asignaturas &&
                                u.RecordGeneral.CreditosAcumulados == u.RecordGeneral.Carrera.Creditos)
                    .ToListAsync();

                return graduados;
            }
           
            var graduados = await _context.Usuarios
                .Include(u => u.RecordGeneral)
                .ThenInclude(rg => rg.Carrera)
                .Include(u => u.RecordGeneral)
                .ThenInclude(rg => rg.Carrera.CarreraAsignaturas)
                .ToListAsync();

            return graduados.Where(u => u.RecordGeneral != null && u.RecordGeneral.Carrera != null &&
                                        u.RecordGeneral.CreditosAprobados == u.RecordGeneral.Carrera.Creditos &&
                                        u.RecordGeneral.AsignaturasAprobadas == u.RecordGeneral.Carrera.Asignaturas).ToList();

 */
            int idRolEstudiante = 1;
            var graduados = await _context.Usuarios
                .Include(u => u.RecordGeneral)
                .ThenInclude(rg => rg.CarreraNavigation)
                .Where(u => u.Rol == idRolEstudiante &&
                            u.RecordGeneral.CreditosAcumulados >= u.RecordGeneral.CarreraNavigation.Creditos &&
                            u.RecordGeneral.AsignaturasAprobadas >= u.RecordGeneral.CarreraNavigation.Asignaturas &&
                            u.RecordGeneral.Indice >= 3.2m)
                .ToListAsync();

            return graduados;

        }

        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.Id }, usuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.Id == id);
        }
    }
}
