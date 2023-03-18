using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Prerrequisito
    {
        public int IdAsignatura { get; set; }
        public int IdPrerrequisito { get; set; }

        public virtual Asignatura IdAsignaturaNavigation { get; set; }
        public virtual Asignatura IdPrerrequisitoNavigation { get; set; }
    }
}
