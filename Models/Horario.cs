using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Horario
    {
        public int Id { get; set; }
        public int? IdSeccion { get; set; }
        public TimeSpan? HoraInicio { get; set; }
        public TimeSpan? HoraFin { get; set; }
        public int? DiaSemana { get; set; }

        public virtual Seccion IdSeccionNavigation { get; set; }
    }
}
