import type { AnimeItem, AnimeResponse, ApiState } from '../types/api.types';

/**
 * ANIME API SERVICE
 * 
 * API Recomendada: Jikan API (https://jikan.moe/)
 * Documentación: https://docs.api.jikan.moe/
 * 
 * ENDPOINTS PRINCIPALES:
 * 
 * 1. Obtener top anime:
 *    GET https://api.jikan.moe/v4/top/anime
 *    Parámetros:
 *      - type: tv, movie, ova, special, ona, music
 *      - filter: airing, upcoming, bypopularity, favorite
 *      - page: número de página
 *      - limit: cantidad de resultados (max 25)
 *    Respuesta: Lista de anime con imágenes, ratings, sinopsis
 * 
 * 2. Buscar anime:
 *    GET https://api.jikan.moe/v4/anime
 *    Parámetros:
 *      - q: término de búsqueda
 *      - page: número de página
 *      - limit: cantidad de resultados
 *      - type: filtrar por tipo
 *      - status: airing, complete, upcoming
 *      - genres: filtrar por género (ID)
 *      - order_by: title, start_date, score, rank
 *    Respuesta: Lista de anime que coinciden con la búsqueda
 * 
 * 3. Obtener detalles de anime:
 *    GET https://api.jikan.moe/v4/anime/{id}
 *    Respuesta: Información completa del anime
 * 
 * 4. Obtener géneros:
 *    GET https://api.jikan.moe/v4/genres/anime
 *    Respuesta: Lista de géneros disponibles
 * 
 * CARACTERÍSTICAS:
 * - No requiere autenticación
 * - Datos de MyAnimeList
 * - Rate limit: 3 requests/segundo, 60 requests/minuto
 * - Imágenes de alta calidad
 * - Información completa (sinopsis, ratings, episodios, etc.)
 * 
 * VISUALIZACIÓN SUGERIDA:
 * - Grid de cards con posters de anime
 * - Rating con estrellas y puntuación
 * - Chips para géneros
 * - Búsqueda por nombre
 * - Filtros por tipo, estado, género
 * - Modal con sinopsis completa y detalles
 * - Indicador de episodios y año
 */

const API_BASE_URL = 'https://api.jikan.moe/v4';

/**
 * Obtiene el top anime
 * @param page - Número de página (default: 1)
 * @param limit - Cantidad de resultados (default: 20, max: 25)
 * @param filter - Filtro (airing, upcoming, bypopularity, favorite)
 * @returns Promise con la respuesta de anime
 */
export const fetchTopAnime = async (
  page: number = 1,
  limit: number = 20,
  filter?: string
): Promise<AnimeResponse> => {
  // TODO: Implementar la llamada a la API
  // Ejemplo de implementación:
  /*
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (filter) params.append('filter', filter);
  
  const response = await fetch(`${API_BASE_URL}/top/anime?${params}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener el top anime');
  }
  
  const data: AnimeResponse = await response.json();
  return data;
  */
  
  // Por ahora retorna datos vacíos
  return {
    data: [],
    pagination: {
      last_visible_page: 1,
      has_next_page: false,
      current_page: 1,
    },
  };
};

/**
 * Busca anime por nombre
 * @param query - Término de búsqueda
 * @param page - Número de página (default: 1)
 * @param limit - Cantidad de resultados (default: 20)
 * @returns Promise con los resultados de búsqueda
 */
export const searchAnime = async (
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<AnimeResponse> => {
  // TODO: Implementar la llamada a la API
  // Ejemplo de implementación:
  /*
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    limit: limit.toString(),
    order_by: 'score',
    sort: 'desc',
  });
  
  const response = await fetch(`${API_BASE_URL}/anime?${params}`);
  
  if (!response.ok) {
    throw new Error('Error al buscar anime');
  }
  
  const data: AnimeResponse = await response.json();
  return data;
  */
  
  return {
    data: [],
    pagination: {
      last_visible_page: 1,
      has_next_page: false,
      current_page: 1,
    },
  };
};

/**
 * Obtiene los detalles de un anime específico
 * @param id - ID del anime en MyAnimeList
 * @returns Promise con los detalles del anime
 */
export const fetchAnimeDetails = async (id: number): Promise<AnimeItem | null> => {
  // TODO: Implementar la llamada a la API
  // Ejemplo de implementación:
  /*
  const response = await fetch(`${API_BASE_URL}/anime/${id}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener los detalles del anime');
  }
  
  const result = await response.json();
  return result.data;
  */
  
  return null;
};

/**
 * Obtiene anime por temporada
 * @param year - Año
 * @param season - Temporada (winter, spring, summer, fall)
 * @returns Promise con anime de la temporada
 */
export const fetchSeasonalAnime = async (
  year: number,
  season: 'winter' | 'spring' | 'summer' | 'fall'
): Promise<AnimeResponse> => {
  // TODO: Implementar la llamada a la API
  /*
  const response = await fetch(`${API_BASE_URL}/seasons/${year}/${season}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener anime de la temporada');
  }
  
  const data: AnimeResponse = await response.json();
  return data;
  */
  
  return {
    data: [],
    pagination: {
      last_visible_page: 1,
      has_next_page: false,
      current_page: 1,
    },
  };
};

/**
 * Hook personalizado para manejar el estado de la API de anime
 */
export const useAnimeApi = () => {
  // TODO: Implementar con useState y useEffect
  // Ejemplo:
  /*
  const [state, setState] = useState<ApiState<AnimeItem[]>>({
    data: null,
    loading: false,
    error: null,
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const loadAnime = async (page: number = 1, search?: string) => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = search 
        ? await searchAnime(search, page)
        : await fetchTopAnime(page);
      setState({ data: response.data, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: { message: error.message } 
      });
    }
  };
  
  useEffect(() => {
    loadAnime(currentPage, searchTerm);
  }, [currentPage, searchTerm]);
  
  return { state, searchTerm, setSearchTerm, currentPage, setCurrentPage, loadAnime };
  */
};
