using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Carrera
    {
        public Carrera()
        {
            CarreraAsignaturas = new HashSet<CarreraAsignatura>();
            RecordGenerals = new HashSet<RecordGeneral>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Codigo { get; set; }
        public int? IdAreaAcademica { get; set; }
        public int? Creditos { get; set; }
        public int? Asignaturas { get; set; }

        public virtual AreaAcademica IdAreaAcademicaNavigation { get; set; }
        public virtual ICollection<CarreraAsignatura> CarreraAsignaturas { get; set; }
        public virtual ICollection<RecordGeneral> RecordGenerals { get; set; }
    }
}
