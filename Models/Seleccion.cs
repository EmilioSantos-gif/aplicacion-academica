using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Seleccion
    {
        public int IdEstudiante { get; set; }
        public int IdSeccion { get; set; }
        public int? Puntuacion { get; set; }
        public int Estado { get; set; }
        public int Periodo { get; set; }
        public DateTime? FchRegistro { get; set; }
        public string Letra { get; set; }

        public virtual EstadoSeleccion EstadoNavigation { get; set; }
        public virtual Usuario IdEstudianteNavigation { get; set; }
        public virtual Seccion IdSeccionNavigation { get; set; }
        public virtual Periodo PeriodoNavigation { get; set; }
    }
}
