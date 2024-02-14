using formularioBac.Models;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Globalization;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace formularioBac.Controllers
{

    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment hostingEnvironment)
        {
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [Route("home/test")]
        public string testService() {
            return "HOLA";
        }

        [HttpPost]
        public ActionResult Save(string nombreCompleto, long telefono, long celular, string fechaNacimiento) {

            //path del json
            string FilePath = Path.Combine(_hostingEnvironment.ContentRootPath, "AppData", "data.json");

            //inicio de la lista
            List<Models.Persona> Personas = [];
            
            //validar si existe el archivo
            if (System.IO.File.Exists(FilePath))
            {
                string json = System.IO.File.ReadAllText(FilePath);
                Personas = JsonSerializer.Deserialize<List<Models.Persona>>(json, new JsonSerializerOptions { IncludeFields = true });
            }

            //crear el nuevo objeto
            Personas.Add(new Persona(
                                long.Parse(DateTime.Now.ToString("yyyyMMddHHmmss")),
                                nombreCompleto, 
                                telefono, 
                                celular, 
                                fechaNacimiento,
                                DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss")
                                )
            );

            //recrear el json
            string newJson = JsonSerializer.Serialize(Personas, new JsonSerializerOptions { WriteIndented = true });
            System.IO.File.WriteAllText(FilePath, newJson);

            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public ActionResult Delete(long deleteBtn) {
            string FilePath = Path.Combine(_hostingEnvironment.ContentRootPath, "AppData", "data.json");
        
            //validar el archivo
            if (System.IO.File.Exists(FilePath))
            {
                //path del archivo
                string json = System.IO.File.ReadAllText(FilePath);
                List<Persona> Personas = JsonSerializer.Deserialize<List<Models.Persona>>(json, new JsonSerializerOptions { IncludeFields = true });

                // Buscar el correlativo id de la persona
                Persona personaAEliminar = Personas.FirstOrDefault(p => p.Id == deleteBtn);
                if (personaAEliminar != null)
                {
                    Personas.Remove(personaAEliminar);
                    // Serializar la lista de personas
                    string jsonActualizado = JsonSerializer.Serialize(Personas, new JsonSerializerOptions { WriteIndented = true });

                    // Actualizar el json
                    System.IO.File.WriteAllText(FilePath, jsonActualizado);
                }

            }

            return RedirectToAction("Index", "Home"); 

        }

        public IActionResult Index()
        {
            string FilePath = Path.Combine(_hostingEnvironment.ContentRootPath, "AppData", "data.json");
            List<Models.Persona> Personas = [];
            
            //obtener la información del json y retornar a la vista
            if (System.IO.File.Exists(FilePath))
            {
                string json = System.IO.File.ReadAllText(FilePath);
                Personas = JsonSerializer.Deserialize<List<Models.Persona>>(json, new JsonSerializerOptions { IncludeFields = true });
            }
            return View(Personas);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}
