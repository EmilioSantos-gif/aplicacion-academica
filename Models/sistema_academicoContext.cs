using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace AplicacionAcademica.Models
{
    public partial class sistema_academicoContext : DbContext
    {
        public sistema_academicoContext()
        {
        }

        public sistema_academicoContext(DbContextOptions<sistema_academicoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AreaAcademica> AreaAcademicas { get; set; }
        public virtual DbSet<Asignatura> Asignaturas { get; set; }
        public virtual DbSet<Aula> Aulas { get; set; }
        public virtual DbSet<Carrera> Carreras { get; set; }
        public virtual DbSet<CarreraAsignatura> CarreraAsignaturas { get; set; }
        public virtual DbSet<Correquisito> Correquisitos { get; set; }
        public virtual DbSet<EstadoSeleccion> EstadoSeleccions { get; set; }
        public virtual DbSet<Horario> Horarios { get; set; }
        public virtual DbSet<Periodo> Periodos { get; set; }
        public virtual DbSet<Prerrequisito> Prerrequisitos { get; set; }
        public virtual DbSet<Puntuacion> Puntuacions { get; set; }
        public virtual DbSet<RecordGeneral> RecordGenerals { get; set; }
        public virtual DbSet<Rol> Rols { get; set; }
        public virtual DbSet<Seccion> Seccions { get; set; }
        public virtual DbSet<Seleccion> Seleccions { get; set; }
        public virtual DbSet<TipoDocumento> TipoDocumentos { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost; Database=sistema_academico; Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AreaAcademica>(entity =>
            {
                entity.ToTable("Area_Academica");

                entity.HasIndex(e => e.Codigo, "UQ__Area_Aca__40F9A2060BF5F55F")
                    .IsUnique();

                entity.HasIndex(e => e.Nombre, "UQ__Area_Aca__72AFBCC6D68405BB")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Codigo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("codigo");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Asignatura>(entity =>
            {
                entity.ToTable("Asignatura");

                entity.HasIndex(e => e.Codigo, "UQ__Asignatu__40F9A206DD15791A")
                    .IsUnique();

                entity.HasIndex(e => e.Nombre, "UQ__Asignatu__72AFBCC67CFDD421")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Codigo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("codigo");

                entity.Property(e => e.Creditos).HasColumnName("creditos");

                entity.Property(e => e.IdAreaAcademica).HasColumnName("id_area_academica");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.HasOne(d => d.IdAreaAcademicaNavigation)
                    .WithMany(p => p.Asignaturas)
                    .HasForeignKey(d => d.IdAreaAcademica)
                    .HasConstraintName("FK__Asignatur__id_ar__01142BA1");
            });

            modelBuilder.Entity<Aula>(entity =>
            {
                entity.ToTable("Aula");

                entity.HasIndex(e => e.Codigo, "UQ__Aula__40F9A206B10259A0")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Codigo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("codigo");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");
            });

            modelBuilder.Entity<Carrera>(entity =>
            {
                entity.ToTable("Carrera");

                entity.HasIndex(e => e.Codigo, "UQ__Carrera__40F9A206B176B1E5")
                    .IsUnique();

                entity.HasIndex(e => e.Nombre, "UQ__Carrera__72AFBCC6F6465D41")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Asignaturas).HasColumnName("asignaturas");

                entity.Property(e => e.Codigo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("codigo");

                entity.Property(e => e.Creditos).HasColumnName("creditos");

                entity.Property(e => e.IdAreaAcademica).HasColumnName("id_area_academica");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.HasOne(d => d.IdAreaAcademicaNavigation)
                    .WithMany(p => p.Carreras)
                    .HasForeignKey(d => d.IdAreaAcademica)
                    .HasConstraintName("FK__Carrera__id_area__0E6E26BF");
            });

            modelBuilder.Entity<CarreraAsignatura>(entity =>
            {
                entity.HasKey(e => new { e.IdCarrera, e.IdAsignatura })
                    .HasName("PK__Carrera___51687DD215308540");

                entity.ToTable("Carrera_Asignatura");

                entity.Property(e => e.IdCarrera).HasColumnName("id_carrera");

                entity.Property(e => e.IdAsignatura).HasColumnName("id_asignatura");

                entity.HasOne(d => d.IdAsignaturaNavigation)
                    .WithMany(p => p.CarreraAsignaturas)
                    .HasForeignKey(d => d.IdAsignatura)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Carrera_A__id_as__10566F31");

                entity.HasOne(d => d.IdCarreraNavigation)
                    .WithMany(p => p.CarreraAsignaturas)
                    .HasForeignKey(d => d.IdCarrera)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Carrera_A__id_ca__0F624AF8");
            });

            modelBuilder.Entity<Correquisito>(entity =>
            {
                entity.HasKey(e => new { e.IdAsignatura, e.IdCorrequisito })
                    .HasName("PK__Correqui__8570EE46BBFCBD3E");

                entity.ToTable("Correquisito");

                entity.Property(e => e.IdAsignatura).HasColumnName("id_asignatura");

                entity.Property(e => e.IdCorrequisito).HasColumnName("id_correquisito");

                entity.HasOne(d => d.IdAsignaturaNavigation)
                    .WithMany(p => p.CorrequisitoIdAsignaturaNavigations)
                    .HasForeignKey(d => d.IdAsignatura)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Correquis__id_as__0C85DE4D");

                entity.HasOne(d => d.IdCorrequisitoNavigation)
                    .WithMany(p => p.CorrequisitoIdCorrequisitoNavigations)
                    .HasForeignKey(d => d.IdCorrequisito)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Correquis__id_co__0D7A0286");
            });

            modelBuilder.Entity<EstadoSeleccion>(entity =>
            {
                entity.ToTable("Estado_Seleccion");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Horario>(entity =>
            {
                entity.ToTable("Horario");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DiaSemana).HasColumnName("dia_semana");

                entity.Property(e => e.HoraFin)
                    .HasColumnType("time(0)")
                    .HasColumnName("hora_fin");

                entity.Property(e => e.HoraInicio)
                    .HasColumnType("time(0)")
                    .HasColumnName("hora_inicio");

                entity.Property(e => e.IdSeccion).HasColumnName("id_seccion");

                entity.HasOne(d => d.IdSeccionNavigation)
                    .WithMany(p => p.Horarios)
                    .HasForeignKey(d => d.IdSeccion)
                    .HasConstraintName("FK__Horario__id_secc__114A936A");
            });

            modelBuilder.Entity<Periodo>(entity =>
            {
                entity.ToTable("Periodo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DesPeriodo)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("des_periodo");
            });

            modelBuilder.Entity<Prerrequisito>(entity =>
            {
                entity.HasKey(e => new { e.IdAsignatura, e.IdPrerrequisito })
                    .HasName("PK__Prerrequ__10894A8F3C000817");

                entity.ToTable("Prerrequisito");

                entity.Property(e => e.IdAsignatura).HasColumnName("id_asignatura");

                entity.Property(e => e.IdPrerrequisito).HasColumnName("id_prerrequisito");

                entity.HasOne(d => d.IdAsignaturaNavigation)
                    .WithMany(p => p.PrerrequisitoIdAsignaturaNavigations)
                    .HasForeignKey(d => d.IdAsignatura)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Prerrequi__id_as__0A9D95DB");

                entity.HasOne(d => d.IdPrerrequisitoNavigation)
                    .WithMany(p => p.PrerrequisitoIdPrerrequisitoNavigations)
                    .HasForeignKey(d => d.IdPrerrequisito)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Prerrequi__id_pr__0B91BA14");
            });

            modelBuilder.Entity<Puntuacion>(entity =>
            {
                entity.ToTable("Puntuacion");

                entity.HasIndex(e => e.Valor, "UQ__Puntuaci__40B8076F0D381007")
                    .IsUnique();

                entity.HasIndex(e => e.Letra, "UQ__Puntuaci__C0B2C83975C062AF")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Letra)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("letra")
                    .IsFixedLength(true);

                entity.Property(e => e.Valor)
                    .HasColumnType("decimal(2, 1)")
                    .HasColumnName("valor");
            });

            modelBuilder.Entity<RecordGeneral>(entity =>
            {
                entity.ToTable("Record_General");

                entity.HasIndex(e => e.IdEstudiante, "UQ__Record_G__E0B2763DEBB255D3")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AsignaturasAprobadas).HasColumnName("asignaturas_aprobadas");

                entity.Property(e => e.CantidadTrimestres).HasColumnName("cantidad_trimestres");

                entity.Property(e => e.Carrera).HasColumnName("carrera");

                entity.Property(e => e.CreditosAcumulados).HasColumnName("creditos_acumulados");

                entity.Property(e => e.IdEstudiante).HasColumnName("id_estudiante");

                entity.Property(e => e.Indice)
                    .HasColumnType("decimal(3, 2)")
                    .HasColumnName("indice");

                entity.HasOne(d => d.CarreraNavigation)
                    .WithMany(p => p.RecordGenerals)
                    .HasForeignKey(d => d.Carrera)
                    .HasConstraintName("FK__Record_Ge__carre__14270015");

                entity.HasOne(d => d.IdEstudianteNavigation)
                    .WithOne(p => p.RecordGeneral)
                    .HasForeignKey<RecordGeneral>(d => d.IdEstudiante)
                    .HasConstraintName("FK__Record_Ge__id_es__09A971A2");
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.ToTable("Rol");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Seccion>(entity =>
            {
                entity.ToTable("Seccion");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Aula).HasColumnName("aula");

                entity.Property(e => e.Capacidad).HasColumnName("capacidad");

                entity.Property(e => e.Codigo)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("codigo");

                entity.Property(e => e.FchRegistro)
                    .HasColumnType("datetime")
                    .HasColumnName("fch_registro")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdAsignatura).HasColumnName("id_asignatura");

                entity.Property(e => e.IdMaestro).HasColumnName("id_maestro");

                entity.Property(e => e.Periodo).HasColumnName("periodo");

                entity.HasOne(d => d.AulaNavigation)
                    .WithMany(p => p.Seccions)
                    .HasForeignKey(d => d.Aula)
                    .HasConstraintName("FK__Seccion__aula__03F0984C");

                entity.HasOne(d => d.IdAsignaturaNavigation)
                    .WithMany(p => p.Seccions)
                    .HasForeignKey(d => d.IdAsignatura)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Seccion__id_asig__02084FDA");

                entity.HasOne(d => d.IdMaestroNavigation)
                    .WithMany(p => p.Seccions)
                    .HasForeignKey(d => d.IdMaestro)
                    .HasConstraintName("FK__Seccion__id_maes__02FC7413");

                entity.HasOne(d => d.PeriodoNavigation)
                    .WithMany(p => p.Seccions)
                    .HasForeignKey(d => d.Periodo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Seccion__periodo__04E4BC85");
            });

            modelBuilder.Entity<Seleccion>(entity =>
            {
                entity.HasKey(e => new { e.IdEstudiante, e.IdSeccion, e.Periodo })
                    .HasName("PK__Seleccio__FA503B10589FD261");

                entity.ToTable("Seleccion");

                entity.Property(e => e.IdEstudiante).HasColumnName("id_estudiante");

                entity.Property(e => e.IdSeccion).HasColumnName("id_seccion");

                entity.Property(e => e.Periodo).HasColumnName("periodo");

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FchRegistro)
                    .HasColumnType("datetime")
                    .HasColumnName("fch_registro")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Letra)
                    .HasMaxLength(2)
                    .HasColumnName("letra")
                    .IsFixedLength(true);

                entity.Property(e => e.Puntuacion)
                    .HasColumnType("decimal(2, 1)")
                    .HasColumnName("puntuacion");

                entity.HasOne(d => d.EstadoNavigation)
                    .WithMany(p => p.Seleccions)
                    .HasForeignKey(d => d.Estado)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Seleccion__estad__07C12930");

                entity.HasOne(d => d.IdEstudianteNavigation)
                    .WithMany(p => p.Seleccions)
                    .HasForeignKey(d => d.IdEstudiante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Seleccion__id_es__05D8E0BE");

                entity.HasOne(d => d.IdSeccionNavigation)
                    .WithMany(p => p.Seleccions)
                    .HasForeignKey(d => d.IdSeccion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Seleccion__id_se__06CD04F7");

                entity.HasOne(d => d.PeriodoNavigation)
                    .WithMany(p => p.Seleccions)
                    .HasForeignKey(d => d.Periodo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Seleccion__perio__08B54D69");
            });

            modelBuilder.Entity<TipoDocumento>(entity =>
            {
                entity.ToTable("Tipo_Documento");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.TipoDocumento1)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("tipo_documento");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("Usuario");

                entity.HasIndex(e => e.Usuario1, "UQ__Usuario__9AFF8FC653601860")
                    .IsUnique();

                entity.HasIndex(e => e.NoDocumento, "UQ__Usuario__BC65694EA9FD1425")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("apellido");

                entity.Property(e => e.Clave)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("clave");

                entity.Property(e => e.Direccion)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("direccion");

                entity.Property(e => e.FchNacimiento)
                    .HasColumnType("date")
                    .HasColumnName("fch_nacimiento");

                entity.Property(e => e.FchRegistro)
                    .HasColumnType("datetime")
                    .HasColumnName("fch_registro")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdTipoDocumento).HasColumnName("id_tipo_documento");

                entity.Property(e => e.Nacionalidad)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nacionalidad");

                entity.Property(e => e.NoDocumento)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("no_documento");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.Sexo)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("sexo")
                    .IsFixedLength(true);

                entity.Property(e => e.Telefono)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("telefono");

                entity.Property(e => e.Usuario1)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("usuario");

                entity.HasOne(d => d.IdTipoDocumentoNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoDocumento)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__id_tipo__7F2BE32F");

                entity.HasOne(d => d.RolNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.Rol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Usuario__Rol__00200768");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
