using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Seccion
    {
        public Seccion()
        {
            Horarios = new HashSet<Horario>();
            Seleccions = new HashSet<Seleccion>();
        }

        public int Id { get; set; }
        public string Codigo { get; set; }
        public int IdAsignatura { get; set; }
        public int? IdMaestro { get; set; }
        public byte? Capacidad { get; set; }
        public int? Aula { get; set; }
        public int Periodo { get; set; }
        public DateTime FchRegistro { get; set; }

        public virtual Aula AulaNavigation { get; set; }
        public virtual Asignatura IdAsignaturaNavigation { get; set; }
        public virtual Usuario IdMaestroNavigation { get; set; }
        public virtual Periodo PeriodoNavigation { get; set; }
        public virtual ICollection<Horario> Horarios { get; set; }
        public virtual ICollection<Seleccion> Seleccions { get; set; }
    }
}
