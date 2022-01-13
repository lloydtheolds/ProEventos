using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {

        public IEnumerable<Evento> _evento = new Evento[]{
                
                new Evento(){
                EventoId = 1,
                Local = "Cariacica",
                DataEvento = "13/01/2022",
                Tema = "eSocial",
                QtdPessoas = 8,
                Lote = "Pix",
                ImagemURL = "foto.png"

                }, 

                new Evento(){
                EventoId = 2,
                Local = "Vila Velha",
                DataEvento = "02/02/2019",
                Tema = "UVV",
                QtdPessoas = 1,
                Lote = "CC",
                ImagemURL = "foto.png"

                },

                new Evento(){
                EventoId = 3,
                Local = "Serra",
                DataEvento = "19/01/2020",
                Tema = "Passado",
                QtdPessoas = 2,
                Lote = "Shopping Vitoria",
                ImagemURL = "foto.png"

                }
            };
    
        public EventoController()
        {

        }

        [HttpGet]
        public IEnumerable<Evento> Get( )
        {
            return _evento;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetbyId(int id)
        {
            return _evento.Where(evento => evento.EventoId == id);
        }

        [HttpPost]
        public string Post()
        {
            return "Publicar";
        }

        [HttpPut("{id}")]
        public string Put(int id)
        {
            return $"Exemplo de Put com id = {id}";
        }

        [HttpDelete("{id}")]
        public string DeHttpDelete(int id)
        {
            return $"Exemplo de Delete com id = {id}";
        }
    }
}
