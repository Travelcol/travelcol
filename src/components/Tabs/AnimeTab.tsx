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
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import type { AnimeItem, ApiState } from '../../types/api.types';

/**
 * ANIME TAB COMPONENT
 * 
 * Este componente está preparado para integrar la API de anime.
 * 
 * API RECOMENDADA: Jikan API (https://jikan.moe/)
 * 
 * PASOS PARA INTEGRAR:
 * 1. No requiere API Key (Jikan es gratuita)
 * 2. Descomentar el import de fetchTopAnime o searchAnime en services/animeApi.ts
 * 3. Implementar la función loadAnime() usando las funciones del servicio
 * 4. Actualizar el estado con los datos recibidos
 * 
 * ENDPOINTS SUGERIDOS:
 * - GET /v4/top/anime: Obtener top anime
 * - GET /v4/anime?q={query}: Buscar anime por nombre
 * - GET /v4/anime/{id}: Obtener detalles de un anime
 * - GET /v4/seasons/{year}/{season}: Obtener anime por temporada
 * 
 * RATE LIMITS:
 * - 3 requests por segundo
 * - 60 requests por minuto
 * 
 * VISUALIZACIÓN:
 * - Grid de cards con posters de anime
 * - Rating con estrellas y puntuación
 * - Géneros como chips
 * - Sinopsis truncada con opción de expandir
 * - Información de episodios y año
 */

export const AnimeTab = () => {
  // Estado para manejar los datos de la API
  const [state, setState] = useState<ApiState<AnimeItem[]>>({
    data: null,
    loading: false,
    error: null,
  });

  // Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState<string>('');

  /**
   * Función para cargar anime desde la API
   * TODO: Implementar la llamada real a la API
   */
  const loadAnime = async () => {
    setState({ data: null, loading: true, error: null });

    try {
      // TODO: Descomentar cuando implementes la API
      /*
      import { fetchTopAnime, searchAnime } from '../../services/animeApi';
      
      const response = searchTerm
        ? await searchAnime(searchTerm, 1, 20)
        : await fetchTopAnime(1, 20);
      
      setState({ data: response.data, loading: false, error: null });
      */

      // Simulación de carga (remover cuando implementes la API real)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos de ejemplo (remover cuando implementes la API real)
      const mockData: AnimeItem[] = [
        {
          mal_id: 1,
          title: 'Fullmetal Alchemist: Brotherhood',
          title_english: 'Fullmetal Alchemist: Brotherhood',
          images: {
            jpg: {
              image_url: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
              small_image_url: 'https://cdn.myanimelist.net/images/anime/1223/96541t.jpg',
              large_image_url: 'https://cdn.myanimelist.net/images/anime/1223/96541l.jpg',
            },
          },
          score: 9.1,
          scored_by: 1500000,
          rank: 1,
          synopsis: 'Después de un intento fallido de resucitar a su madre usando alquimia, los hermanos Edward y Alphonse Elric pagan un precio terrible...',
          year: 2009,
          episodes: 64,
          status: 'Finished Airing',
          genres: [
            { mal_id: 1, name: 'Action' },
            { mal_id: 2, name: 'Adventure' },
            { mal_id: 8, name: 'Drama' },
          ],
        },
        {
          mal_id: 2,
          title: 'Attack on Titan',
          title_english: 'Attack on Titan',
          images: {
            jpg: {
              image_url: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
              small_image_url: 'https://cdn.myanimelist.net/images/anime/10/47347t.jpg',
              large_image_url: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
            },
          },
          score: 8.5,
          scored_by: 2000000,
          rank: 50,
          synopsis: 'Hace siglos, la humanidad fue diezmada por gigantes monstruosos llamados Titanes...',
          year: 2013,
          episodes: 25,
          status: 'Finished Airing',
          genres: [
            { mal_id: 1, name: 'Action' },
            { mal_id: 8, name: 'Drama' },
            { mal_id: 41, name: 'Suspense' },
          ],
        },
      ];

      setState({ data: mockData, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: { message: 'Error al cargar el anime. Por favor, intenta de nuevo.' },
      });
    }
  };

  /**
   * Truncar texto largo
   */
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
        <MovieIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h5" fontWeight={600}>
          Anime
        </Typography>
      </Box>

      {/* Información sobre la API */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>API Lista para Integrar:</strong> Este componente está preparado para usar
          Jikan API (MyAnimeList). No requiere API key. Visita{' '}
          <a
            href="https://jikan.moe/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
          >
            jikan.moe
          </a>{' '}
          para más información.
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
          label="Buscar anime"
          placeholder="Ej: Naruto, One Piece, Death Note..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && loadAnime()}
          size="small"
          fullWidth
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={loadAnime}
          disabled={state.loading}
          sx={{ minWidth: 120 }}
        >
          {searchTerm ? 'Buscar' : 'Top Anime'}
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
          {state.data.map((anime) => (
            <Card key={anime.mal_id} sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* Poster del anime */}
              <CardMedia
                component="img"
                height="300"
                image={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                alt={anime.title}
                sx={{ objectFit: 'cover' }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                {/* Ranking badge */}
                {anime.rank && (
                  <Chip
                    label={`#${anime.rank}`}
                    size="small"
                    color="primary"
                    sx={{ mb: 1 }}
                  />
                )}

                {/* Título */}
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {anime.title_english || anime.title}
                </Typography>

                {/* Rating */}
                {anime.score && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Rating
                      value={anime.score / 2}
                      max={5}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {anime.score.toFixed(1)} / 10
                    </Typography>
                  </Box>
                )}

                {/* Información adicional */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {anime.year && `Año: ${anime.year}`}
                    {anime.episodes && ` • ${anime.episodes} episodios`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Estado: {anime.status}
                  </Typography>
                </Box>

                {/* Sinopsis */}
                <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                  {truncateText(anime.synopsis)}
                </Typography>

                {/* Géneros */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {anime.genres.slice(0, 3).map((genre) => (
                    <Chip
                      key={genre.mal_id}
                      label={genre.name}
                      size="small"
                      variant="outlined"
                      color="secondary"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Sin resultados */}
      {state.data && state.data.length === 0 && (
        <Alert severity="info">
          No se encontró anime. Intenta con otra búsqueda.
        </Alert>
      )}
    </Box>
  );
};
