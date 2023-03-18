using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            Seccions = new HashSet<Seccion>();
            Seleccions = new HashSet<Seleccion>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Sexo { get; set; }
        public string Telefono { get; set; }
        public int IdTipoDocumento { get; set; }
        public string NoDocumento { get; set; }
        public DateTime FchNacimiento { get; set; }
        public string Nacionalidad { get; set; }
        public string Direccion { get; set; }
        public int Rol { get; set; }
        public string Usuario1 { get; set; }
        public string Clave { get; set; }
        public DateTime FchRegistro { get; set; }

        public virtual TipoDocumento IdTipoDocumentoNavigation { get; set; }
        public virtual Rol RolNavigation { get; set; }
        public virtual RecordGeneral RecordGeneral { get; set; }
        public virtual ICollection<Seccion> Seccions { get; set; }
        public virtual ICollection<Seleccion> Seleccions { get; set; }
    }
}
