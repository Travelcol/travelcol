import type { FootballMatch, FootballLeague } from '../types/api.types';

/**
 * FOOTBALL API SERVICE
 * 
 * API Recomendada: API-Football (https://www.api-football.com/)
 * Documentación: https://www.api-football.com/documentation-v3
 * 
 * ENDPOINTS PRINCIPALES:
 * 
 * 1. Obtener ligas:
 *    GET https://v3.football.api-sports.io/leagues
 *    Parámetros: country, season, current
 *    Respuesta: Lista de ligas con información detallada
 * 
 * 2. Obtener partidos:
 *    GET https://v3.football.api-sports.io/fixtures
 *    Parámetros: league, season, date, team, live
 *    Respuesta: Lista de partidos con equipos, marcadores, estado
 * 
 * 3. Obtener clasificación:
 *    GET https://v3.football.api-sports.io/standings
 *    Parámetros: league, season
 *    Respuesta: Tabla de posiciones de la liga
 * 
 * AUTENTICACIÓN:
 * - Requiere API Key en header: 'x-apisports-key'
 * - Registro gratuito disponible con límite de requests
 * 
 * VISUALIZACIÓN SUGERIDA:
 * - Cards con información de partidos (equipos, logos, marcador)
 * - Lista de ligas con banderas de países
 * - Tabla de clasificación con posiciones
 * - Filtros por fecha, liga, equipo
 */



/**
 * Obtiene los partidos de fútbol
 * @param league - ID de la liga (opcional)
 * @param date - Fecha en formato YYYY-MM-DD (opcional)
 * @returns Promise con los partidos
 */
export const fetchFootballMatches = async (): Promise<FootballMatch[]> => {
  // TODO: Implementar la llamada a la API
  // Ejemplo de implementación:
  /*
  const params = new URLSearchParams();
  if (league) params.append('league', league.toString());
  if (date) params.append('date', date);
  
  const response = await fetch(`${API_BASE_URL}/fixtures?${params}`, {
    headers: {
      'x-apisports-key': API_KEY,
    },
  });
  
  if (!response.ok) {
    throw new Error('Error al obtener los partidos');
  }
  
  const data = await response.json();
  return data.response.map((item: any) => ({
    id: item.fixture.id,
    date: item.fixture.date,
    homeTeam: {
      id: item.teams.home.id,
      name: item.teams.home.name,
      logo: item.teams.home.logo,
      country: '',
    },
    awayTeam: {
      id: item.teams.away.id,
      name: item.teams.away.name,
      logo: item.teams.away.logo,
      country: '',
    },
    score: {
      home: item.goals.home,
      away: item.goals.away,
    },
    status: item.fixture.status.long,
  }));
  */
  
  // Por ahora retorna un array vacío
  return [];
};

/**
 * Obtiene las ligas disponibles
 * @param country - Nombre del país (opcional)
 * @returns Promise con las ligas
 */
export const fetchFootballLeagues = async (): Promise<FootballLeague[]> => {
  // TODO: Implementar la llamada a la API
  return [];
};

/**
 * Hook personalizado para manejar el estado de la API de fútbol
 * Este es un ejemplo de cómo podrías estructurar el estado
 */
export const useFootballApi = () => {
  // TODO: Implementar con useState y useEffect
  // Ejemplo:
  /*
  const [state, setState] = useState<ApiState<FootballMatch[]>>({
    data: null,
    loading: false,
    error: null,
  });
  
  const loadMatches = async (league?: number, date?: string) => {
    setState({ data: null, loading: true, error: null });
    try {
      const matches = await fetchFootballMatches(league, date);
      setState({ data: matches, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: { message: error.message } 
      });
    }
  };
  
  return { state, loadMatches };
  */
};
