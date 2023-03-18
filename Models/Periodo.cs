using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Periodo
    {
        public Periodo()
        {
            Seccions = new HashSet<Seccion>();
            Seleccions = new HashSet<Seleccion>();
        }

        public int Id { get; set; }
        public string DesPeriodo { get; set; }

        public virtual ICollection<Seccion> Seccions { get; set; }
        public virtual ICollection<Seleccion> Seleccions { get; set; }
    }
}
