import type { VideoGame, VideoGamesResponse } from '../types/api.types';

/**
 * VIDEO GAMES API SERVICE
 * 
 * API Recomendada: RAWG Video Games Database (https://rawg.io/apidocs)
 * Documentación: https://api.rawg.io/docs/
 * 
 * ENDPOINTS PRINCIPALES:
 * 
 * 1. Obtener lista de juegos:
 *    GET https://api.rawg.io/api/games
 *    Parámetros: 
 *      - key (requerido): API key
 *      - page: número de página
 *      - page_size: cantidad de resultados (max 40)
 *      - search: búsqueda por nombre
 *      - ordering: ordenar por (released, rating, etc.)
 *      - genres: filtrar por género
 *      - platforms: filtrar por plataforma
 *    Respuesta: Lista de juegos con imágenes, ratings, géneros
 * 
 * 2. Obtener detalles de un juego:
 *    GET https://api.rawg.io/api/games/{id}
 *    Parámetros: key (API key)
 *    Respuesta: Información detallada del juego
 * 
 * 3. Obtener géneros:
 *    GET https://api.rawg.io/api/genres
 *    Respuesta: Lista de géneros disponibles
 * 
 * AUTENTICACIÓN:
 * - Requiere API Key como parámetro en la URL
 * - Registro gratuito en https://rawg.io/apidocs
 * - Límite: 20,000 requests/mes en plan gratuito
 * 
 * VISUALIZACIÓN SUGERIDA:
 * - Grid de cards con imágenes de juegos
 * - Rating con estrellas o número
 * - Chips para géneros y plataformas
 * - Búsqueda y filtros por género/plataforma
 * - Modal o expansión para ver detalles completos
 */



/**
 * Obtiene una lista de videojuegos
 * @param page - Número de página (default: 1)
 * @param pageSize - Cantidad de resultados (default: 20)
 * @param search - Término de búsqueda (opcional)
 * @param ordering - Ordenamiento (opcional: -rating, -released, etc.)
 * @returns Promise con la respuesta de juegos
 */
export const fetchVideoGames = async (): Promise<VideoGamesResponse> => {
  // TODO: Implementar la llamada a la API
  // Ejemplo de implementación:
  /*
  const params = new URLSearchParams({
    key: API_KEY,
    page: page.toString(),
    page_size: pageSize.toString(),
  });
  
  if (search) params.append('search', search);
  if (ordering) params.append('ordering', ordering);
  
  const response = await fetch(`${API_BASE_URL}/games?${params}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener los videojuegos');
  }
  
  const data: VideoGamesResponse = await response.json();
  return data;
  */
  
  // Por ahora retorna datos vacíos
  return {
    count: 0,
    results: [],
  };
};

/**
 * Obtiene los detalles de un videojuego específico
 * @param id - ID del juego
 * @returns Promise con los detalles del juego
 */
export const fetchGameDetails = async (): Promise<VideoGame | null> => {
  // TODO: Implementar la llamada a la API
  /*
  const response = await fetch(`${API_BASE_URL}/games/${id}?key=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener los detalles del juego');
  }
  
  const game: VideoGame = await response.json();
  return game;
  */
  
  return null;
};

/**
 * Busca videojuegos por nombre
 * @param query - Término de búsqueda
 * @returns Promise con los resultados de búsqueda
 */
export const searchVideoGames = async (): Promise<VideoGame[]> => {
  // TODO: Implementar la llamada a la API
  /*
  const response = await fetchVideoGames(1, 10, query);
  return response.results;
  */
  
  return [];
};

/**
 * Hook personalizado para manejar el estado de la API de videojuegos
 * Este es un ejemplo de cómo podrías estructurar el estado
 */
export const useVideoGamesApi = () => {
  // TODO: Implementar con useState y useEffect
  // Ejemplo:
  /*
  const [state, setState] = useState<ApiState<VideoGame[]>>({
    data: null,
    loading: false,
    error: null,
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const loadGames = async (page: number = 1, search?: string) => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await fetchVideoGames(page, 20, search, '-rating');
      setState({ data: response.results, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: { message: error.message } 
      });
    }
  };
  
  useEffect(() => {
    loadGames(1, searchTerm);
  }, [searchTerm]);
  
  return { state, searchTerm, setSearchTerm, loadGames };
  */
};
