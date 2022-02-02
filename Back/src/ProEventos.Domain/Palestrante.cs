using System.Collections.Generic;

namespace ProEventos.Domain
{
    public class Palestrante
    {
        public readonly PalestranteEvento PalestrantesEventos;

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Curriculo { get; set; }
        public string imagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; }
    }
}