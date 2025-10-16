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
  Rating,
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SearchIcon from '@mui/icons-material/Search';
import type { VideoGame, ApiState } from '../../types/api.types';

/**
 * VIDEO GAMES TAB COMPONENT
 * 
 * Este componente está preparado para integrar la API de videojuegos.
 * 
 * API RECOMENDADA: RAWG Video Games Database (https://rawg.io/apidocs)
 * 
 * PASOS PARA INTEGRAR:
 * 1. Obtener API Key de https://rawg.io/apidocs
 * 2. Descomentar el import de fetchVideoGames en services/videoGamesApi.ts
 * 3. Implementar la función loadGames() usando fetchVideoGames
 * 4. Actualizar el estado con los datos recibidos
 * 
 * ENDPOINTS SUGERIDOS:
 * - GET /games: Obtener lista de juegos (con búsqueda, filtros, ordenamiento)
 * - GET /games/{id}: Obtener detalles de un juego específico
 * - GET /genres: Obtener géneros disponibles
 * 
 * VISUALIZACIÓN:
 * - Grid de cards con imágenes de juegos
 * - Rating con estrellas
 * - Géneros como chips
 * - Plataformas disponibles
 * - Búsqueda por nombre
 */

export const VideoGamesTab = () => {
  // Estado para manejar los datos de la API
  const [state, setState] = useState<ApiState<VideoGame[]>>({
    data: null,
    loading: false,
    error: null,
  });

  // Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState<string>('');

  /**
   * Función para cargar los videojuegos desde la API
   * TODO: Implementar la llamada real a la API
   */
  const loadGames = async () => {
    setState({ data: null, loading: true, error: null });

    try {
      // TODO: Descomentar cuando implementes la API
      /*
      import { fetchVideoGames } from '../../services/videoGamesApi';
      
      const response = await fetchVideoGames(
        1, // página
        20, // cantidad de resultados
        searchTerm || undefined,
        '-rating' // ordenar por rating descendente
      );
      
      setState({ data: response.results, loading: false, error: null });
      */

      // Simulación de carga (remover cuando implementes la API real)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos de ejemplo (remover cuando implementes la API real)
      const mockData: VideoGame[] = [
        {
          id: 1,
          name: 'The Witcher 3: Wild Hunt',
          background_image: 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
          rating: 4.66,
          released: '2015-05-18',
          genres: [
            { id: 4, name: 'Action' },
            { id: 5, name: 'RPG' },
          ],
          platforms: [
            { platform: { id: 4, name: 'PC' } },
            { platform: { id: 1, name: 'PlayStation' } },
          ],
        },
        {
          id: 2,
          name: 'Grand Theft Auto V',
          background_image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
          rating: 4.47,
          released: '2013-09-17',
          genres: [
            { id: 4, name: 'Action' },
            { id: 3, name: 'Adventure' },
          ],
          platforms: [
            { platform: { id: 4, name: 'PC' } },
            { platform: { id: 1, name: 'PlayStation' } },
            { platform: { id: 3, name: 'Xbox' } },
          ],
        },
      ];

      setState({ data: mockData, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: { message: 'Error al cargar los videojuegos. Por favor, intenta de nuevo.' },
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SportsEsportsIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h5" fontWeight={600}>
          Videojuegos
        </Typography>
      </Box>

      {/* Información sobre la API */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>API Lista para Integrar:</strong> Este componente está preparado para usar
          RAWG Video Games Database. Obtén tu API key en{' '}
          <a
            href="https://rawg.io/apidocs"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
          >
            rawg.io/apidocs
          </a>{' '}
          y sigue las instrucciones en el código.
        </Typography>
      </Alert>

      {/* Búsqueda */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          label="Buscar videojuegos"
          placeholder="Ej: The Witcher, GTA, Minecraft..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && loadGames()}
          size="small"
          fullWidth
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={loadGames}
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
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {state.data.map((game) => (
            <Card key={game.id} sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* Imagen del juego */}
              {game.background_image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={game.background_image}
                  alt={game.name}
                  sx={{ objectFit: 'cover' }}
                />
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                {/* Título */}
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {game.name}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Rating
                    value={game.rating}
                    max={5}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    {game.rating.toFixed(1)}
                  </Typography>
                </Box>

                {/* Fecha de lanzamiento */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Lanzamiento: {new Date(game.released).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>

                {/* Géneros */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {game.genres.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>

                {/* Plataformas */}
                <Typography variant="caption" color="text.secondary">
                  Plataformas: {game.platforms.map(p => p.platform.name).join(', ')}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Sin resultados */}
      {state.data && state.data.length === 0 && (
        <Alert severity="info">
          No se encontraron videojuegos. Intenta con otra búsqueda.
        </Alert>
      )}
    </Box>
  );
};
