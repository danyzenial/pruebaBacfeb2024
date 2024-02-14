using System.Numerics;

namespace formularioBac.Models
{
    public class Persona
    {
        public long Id { get; set; }
        public string Nombre { get; set; }
        public long Telefono { get; set; }
        public long Celular { get; set; }
        public string FechaNacimiento { get; set; }
        public string FechaCreacion { get; set; }

        public Persona( long id, string nombre, long telefono, long celular, string fechaNacimiento, string fechaCreacion ) { 
            Id = id;
            Nombre = nombre;
            Telefono = telefono;
            Celular = celular;
            FechaNacimiento = fechaNacimiento;
            FechaCreacion = fechaCreacion;
        }
     
    }
}
