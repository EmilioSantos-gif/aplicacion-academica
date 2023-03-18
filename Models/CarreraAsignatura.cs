using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class CarreraAsignatura
    {
        public int IdCarrera { get; set; }
        public int IdAsignatura { get; set; }

        public virtual Asignatura IdAsignaturaNavigation { get; set; }
        public virtual Carrera IdCarreraNavigation { get; set; }
    }
}
