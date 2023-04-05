﻿using System;
using System.Collections.Generic;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class Aula
    {
        public Aula()
        {
            Seccions = new HashSet<Seccion>();
        }

        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<Seccion> Seccions { get; set; }
    }
}

//Scaffold-DbContext "Server=localhost; Database=sistema_academico; Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force
