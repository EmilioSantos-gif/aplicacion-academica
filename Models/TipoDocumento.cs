using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class TipoDocumento
    {
        public TipoDocumento()
        {
            Usuarios = new HashSet<Usuario>();
        }

        public int Id { get; set; }
        public string TipoDocumento1 { get; set; }

        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
