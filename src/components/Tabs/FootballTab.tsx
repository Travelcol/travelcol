import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SearchIcon from '@mui/icons-material/Search';
import type { FootballMatch, ApiState } from '../../types/api.types';

/**
 * FOOTBALL TAB COMPONENT
 * 
 * Este componente está preparado para integrar la API de fútbol.
 * 
 * API RECOMENDADA: API-Football (https://www.api-football.com/)
 * 
 * PASOS PARA INTEGRAR:
 * 1. Obtener API Key de https://www.api-football.com/
 * 2. Descomentar el import de fetchFootballMatches en services/footballApi.ts
 * 3. Implementar la función loadMatches() usando fetchFootballMatches
 * 4. Actualizar el estado con los datos recibidos
 * 
 * ENDPOINTS SUGERIDOS:
 * - GET /fixtures: Obtener partidos (por liga, fecha, equipo)
 * - GET /leagues: Obtener ligas disponibles
 * - GET /standings: Obtener tabla de posiciones
 * 
 * VISUALIZACIÓN:
 * - Cards con información de partidos
 * - Logos de equipos
 * - Marcadores
 * - Estado del partido (en vivo, finalizado, próximo)
 * - Filtros por liga y fecha
 */

export const FootballTab = () => {
  // Estado para manejar los datos de la API
  const [state, setState] = useState<ApiState<FootballMatch[]>>({
    data: null,
    loading: false,
    error: null,
  });

  // Estado para filtros
  const [selectedLeague, setSelectedLeague] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  /**
   * Función para cargar los partidos desde la API
   * TODO: Implementar la llamada real a la API
   */
  const loadMatches = async () => {
    setState({ data: null, loading: true, error: null });

    try {
      // TODO: Descomentar cuando implementes la API
      /*
      import { fetchFootballMatches } from '../../services/footballApi';
      
      const matches = await fetchFootballMatches(
        selectedLeague ? parseInt(selectedLeague) : undefined,
        selectedDate || undefined
      );
      
      setState({ data: matches, loading: false, error: null });
      */

      // Simulación de carga (remover cuando implementes la API real)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos de ejemplo (remover cuando implementes la API real)
      const mockData: FootballMatch[] = [
        {
          id: 1,
          date: '2024-01-15T20:00:00Z',
          homeTeam: {
            id: 1,
            name: 'Real Madrid',
            logo: 'https://media.api-sports.io/football/teams/541.png',
            country: 'Spain',
          },
          awayTeam: {
            id: 2,
            name: 'Barcelona',
            logo: 'https://media.api-sports.io/football/teams/529.png',
            country: 'Spain',
          },
          score: {
            home: 2,
            away: 1,
          },
          status: 'Finalizado',
        },
      ];

      setState({ data: mockData, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: { message: 'Error al cargar los partidos. Por favor, intenta de nuevo.' },
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SportsFootballIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h5" fontWeight={600}>
          Partidos de Fútbol
        </Typography>
      </Box>

      {/* Información sobre la API */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>API Lista para Integrar:</strong> Este componente está preparado para usar
          API-Football. Obtén tu API key en{' '}
          <a
            href="https://www.api-football.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
          >
            api-football.com
          </a>{' '}
          y sigue las instrucciones en el código.
        </Typography>
      </Alert>

      {/* Filtros */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          label="ID de Liga (opcional)"
          placeholder="Ej: 140 para La Liga"
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <TextField
          label="Fecha (opcional)"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={loadMatches}
          disabled={state.loading}
          sx={{ minWidth: 120 }}
        >
          Buscar
        </Button>
      </Box>

      {/* Loading */}
      {state.loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {state.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {state.error.message}
        </Alert>
      )}

      {/* Resultados */}
      {state.data && state.data.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {state.data.map((match) => (
            <Card key={match.id}>
              <CardContent>
                {/* Estado del partido */}
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={match.status}
                    size="small"
                    color={match.status === 'En vivo' ? 'success' : 'default'}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(match.date).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Box>

                {/* Equipos y marcador */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Equipo local */}
                  <Box sx={{ flex: 1, textAlign: 'center' }}>
                    {match.homeTeam.logo && (
                      <img
                        src={match.homeTeam.logo}
                        alt={match.homeTeam.name}
                        style={{ width: 48, height: 48, objectFit: 'contain' }}
                      />
                    )}
                    <Typography variant="body2" fontWeight={600} sx={{ mt: 1 }}>
                      {match.homeTeam.name}
                    </Typography>
                  </Box>

                  {/* Marcador */}
                  <Box sx={{ px: 2 }}>
                    <Typography variant="h4" fontWeight={700} color="primary">
                      {match.score.home ?? '-'} : {match.score.away ?? '-'}
                    </Typography>
                  </Box>

                  {/* Equipo visitante */}
                  <Box sx={{ flex: 1, textAlign: 'center' }}>
                    {match.awayTeam.logo && (
                      <img
                        src={match.awayTeam.logo}
                        alt={match.awayTeam.name}
                        style={{ width: 48, height: 48, objectFit: 'contain' }}
                      />
                    )}
                    <Typography variant="body2" fontWeight={600} sx={{ mt: 1 }}>
                      {match.awayTeam.name}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Sin resultados */}
      {state.data && state.data.length === 0 && (
        <Alert severity="info">
          No se encontraron partidos. Intenta con otros filtros.
        </Alert>
      )}
    </Box>
  );
};
