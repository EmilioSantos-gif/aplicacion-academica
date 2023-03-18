using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Correquisito
    {
        public int IdAsignatura { get; set; }
        public int IdCorrequisito { get; set; }

        public virtual Asignatura IdAsignaturaNavigation { get; set; }
        public virtual Asignatura IdCorrequisitoNavigation { get; set; }
    }
}
