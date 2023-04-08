using AplicacionAcademica.DTOs;
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
    public class HorariosController : ControllerBase
    {
        private readonly sistema_academicoContext _context;

        public HorariosController(sistema_academicoContext context)
        {
            _context = context;
        }

        // GET: api/Horarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Horario>>> GetHorarios()
        {
            return await _context.Horarios.ToListAsync();
        }

        [HttpGet("seccion/{idSeccion}")]
        public async Task<ActionResult<IEnumerable<Horario>>> GetHorariosPorSeccion(int idSeccion)
        {
            return await _context.Horarios
                .Where(h => h.IdSeccion == idSeccion)
                .ToListAsync();
        }

        // GET: api/Horarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Horario>> GetHorario(int id)
        {
            var horario = await _context.Horarios.FindAsync(id);

            if (horario == null)
            {
                return NotFound();
            }

            return horario;
        }

        // POST: api/Horarios
        /*
        [HttpPost]
        public async Task<ActionResult<Horario>> CreateHorario(Horario horario)
        {
            _context.Horarios.Add(horario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHorario), new { id = horario.Id }, horario);
        }
        */
        
        [HttpPost]
        public async Task<IActionResult> AgregarHorario(HorarioDTO horarioDTO)
        {
            
            Horario nuevoHorario = new()
            {
                IdSeccion = horarioDTO.IdSeccion,
                DiaSemana = horarioDTO.DiaSemana,
                HoraInicio = TimeSpan.Parse(horarioDTO.HoraInicio),
                HoraFin = TimeSpan.Parse(horarioDTO.HoraFin)
            };

            // Verifica si hay conflictos de horario
            /*
            var horariosConflicto = await _context.Horarios
                .Where(h => h.IdSeccion == nuevoHorario.IdSeccion && h.DiaSemana == nuevoHorario.DiaSemana)
                .Where(h => (h.HoraInicio <= nuevoHorario.HoraInicio && h.HoraFin > nuevoHorario.HoraInicio) ||
                            (h.HoraInicio < nuevoHorario.HoraFin && h.HoraFin >= nuevoHorario.HoraFin) ||
                            (h.HoraInicio >= nuevoHorario.HoraInicio && h.HoraFin <= nuevoHorario.HoraFin))
                .ToListAsync();
            */

            var seccion = await _context.Seccions.FindAsync(nuevoHorario.IdSeccion);

            int aula;

            if (seccion.Aula == null)
            {
                return BadRequest("Error de datos en la seccion consultada");
            } else
            {
                aula = seccion.Aula.GetValueOrDefault();
            }


            var secciones = await _context.Seccions.Where(s => s.Aula == aula).ToListAsync();

            var idSecciones = secciones.Select(s => s.Id).ToList();

            var otrosHorarios = await _context.Horarios
                .Where(h => idSecciones.Contains((int)nuevoHorario.IdSeccion)).ToListAsync();



            var otrosHorarios2 = otrosHorarios.Where(h => h.DiaSemana == nuevoHorario.DiaSemana)
                .ToList();

            var horariosConflicto2 = otrosHorarios2.
                Where(h => (h.HoraInicio <= nuevoHorario.HoraInicio && h.HoraFin > nuevoHorario.HoraInicio) ||
                            (h.HoraInicio < nuevoHorario.HoraFin && h.HoraFin >= nuevoHorario.HoraFin) ||
                            (h.HoraInicio >= nuevoHorario.HoraInicio && h.HoraFin <= nuevoHorario.HoraFin))
                .ToList();

            //var horariosConflicto2 = 

            if (horariosConflicto2.Count > 0)
            {
                return BadRequest("Hay un conflicto de horario en el aula");
            }

            _context.Horarios.Add(nuevoHorario);
            await _context.SaveChangesAsync();

            return Ok(nuevoHorario);
        }
        

        // PUT: api/Horarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHorario(int id, Horario horario)
        {
            if (id != horario.Id)
            {
                return BadRequest();
            }

            _context.Entry(horario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HorarioExists(id))
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

        // DELETE: api/Horarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHorario(int id)
        {
            var horario = await _context.Horarios.FindAsync(id);
            if (horario == null)
            {
                return NotFound();
            }

            _context.Horarios.Remove(horario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Horarios/secccion/5
        [HttpDelete("seccion/{idSeccion}")]
        public async Task<IActionResult> DeleteHorarioPorSeccion(int idSeccion)
        {
            var horarios = await _context.Horarios.Where(h => h.IdSeccion == idSeccion).ToListAsync();

            if (horarios == null)
            {
                return NotFound();
            }

            foreach(var horario in horarios)
            {
                _context.Horarios.Remove(horario);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HorarioExists(int id)
        {
            return _context.Horarios.Any(e => e.Id == id);
        }
    }
}
