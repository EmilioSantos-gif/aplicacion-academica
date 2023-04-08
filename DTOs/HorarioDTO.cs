using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AplicacionAcademica.DTOs
{
    public class HorarioDTO
    {
        public int Id { get; set; }
        public int? IdSeccion { get; set; }
        public String? HoraInicio { get; set; }
        public String? HoraFin { get; set; }
        public int? DiaSemana { get; set; }
    }
}
