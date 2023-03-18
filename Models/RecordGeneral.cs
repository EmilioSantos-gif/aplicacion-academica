using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class RecordGeneral
    {
        public int Id { get; set; }
        public int? IdEstudiante { get; set; }
        public decimal? Indice { get; set; }
        public int? CreditosAcumulados { get; set; }
        public int? AsignaturasAprobadas { get; set; }
        public int? CantidadTrimestres { get; set; }

        public virtual Usuario IdEstudianteNavigation { get; set; }
    }
}
