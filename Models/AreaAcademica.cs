using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class AreaAcademica
    {
        public AreaAcademica()
        {
            Asignaturas = new HashSet<Asignatura>();
            Carreras = new HashSet<Carrera>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Codigo { get; set; }

        public virtual ICollection<Asignatura> Asignaturas { get; set; }
        public virtual ICollection<Carrera> Carreras { get; set; }
    }
}
