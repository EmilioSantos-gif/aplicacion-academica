using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicacionAcademica.DTOs
{
    public class ActualizarPuntuacionDTO
    {
        public int IdEstudiante { get; set; }
        public int IdSeccion { get; set; }
        public int? Puntuacion { get; set; }
    }
}
