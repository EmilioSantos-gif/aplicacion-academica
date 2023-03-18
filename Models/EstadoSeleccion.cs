using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class EstadoSeleccion
    {
        public EstadoSeleccion()
        {
            Seleccions = new HashSet<Seleccion>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Seleccion> Seleccions { get; set; }
    }
}
