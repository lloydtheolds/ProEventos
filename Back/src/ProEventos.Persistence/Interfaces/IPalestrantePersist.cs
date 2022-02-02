using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Interfaces
{
    public interface IPalestrantePersist
    {
        
        //Palestrantes
         Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);
         Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string tema, bool includeEventos);
         Task<Palestrante> GetPalestrantesByIdAsync(int PalestranteId, bool includeEventos);

    }
}