using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Horario
    {
        public int Id { get; set; }
        public int? IdSeccion { get; set; }
        public DateTime? DiaInicio { get; set; }
        public DateTime? DiaFin { get; set; }

        public virtual Seccion IdSeccionNavigation { get; set; }
    }
}
