using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Puntuacion
    {
        public int Id { get; set; }
        public string Letra { get; set; }
        public decimal Valor { get; set; }
    }
}
