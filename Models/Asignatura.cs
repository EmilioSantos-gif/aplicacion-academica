using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Asignatura
    {
        public Asignatura()
        {
            CarreraAsignaturas = new HashSet<CarreraAsignatura>();
            CorrequisitoIdAsignaturaNavigations = new HashSet<Correquisito>();
            CorrequisitoIdCorrequisitoNavigations = new HashSet<Correquisito>();
            PrerrequisitoIdAsignaturaNavigations = new HashSet<Prerrequisito>();
            PrerrequisitoIdPrerrequisitoNavigations = new HashSet<Prerrequisito>();
            Seccions = new HashSet<Seccion>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Codigo { get; set; }
        public byte Creditos { get; set; }
        public int? IdAreaAcademica { get; set; }

        public virtual AreaAcademica IdAreaAcademicaNavigation { get; set; }
        public virtual ICollection<CarreraAsignatura> CarreraAsignaturas { get; set; }
        public virtual ICollection<Correquisito> CorrequisitoIdAsignaturaNavigations { get; set; }
        public virtual ICollection<Correquisito> CorrequisitoIdCorrequisitoNavigations { get; set; }
        public virtual ICollection<Prerrequisito> PrerrequisitoIdAsignaturaNavigations { get; set; }
        public virtual ICollection<Prerrequisito> PrerrequisitoIdPrerrequisitoNavigations { get; set; }
        public virtual ICollection<Seccion> Seccions { get; set; }
    }
}
