import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import type { BibleVerse, ApiState } from '../../types/api.types';

/**
 * BIBLE TAB COMPONENT
 * 
 * Este componente está preparado para integrar la API de la Biblia.
 * 
 * API RECOMENDADA: Bible API (https://bible-api.com/)
 * 
 * PASOS PARA INTEGRAR:
 * 1. No requiere API Key (bible-api.com es gratuita)
 * 2. Descomentar el import de fetchBibleVerse en services/bibleApi.ts
 * 3. Implementar la función loadVerse() usando fetchBibleVerse
 * 4. Actualizar el estado con los datos recibidos
 * 
 * ENDPOINTS SUGERIDOS:
 * - GET /{reference}: Obtener versículo(s) por referencia
 *   Ejemplos: "john 3:16", "romans 12:1-2", "psalm 23"
 * 
 * FORMATO DE REFERENCIAS:
 * - Libro capítulo:versículo (ej: "john 3:16")
 * - Rango de versículos (ej: "john 3:16-18")
 * - Capítulo completo (ej: "psalm 23")
 * 
 * VISUALIZACIÓN:
 * - Card con el texto del versículo
 * - Referencia completa (libro, capítulo, versículo)
 * - Botones para copiar y compartir
 * - Input para buscar referencias
 * - Sugerencias de versículos populares
 */

export const BibleTab = () => {
  // Estado para manejar los datos de la API
  const [state, setState] = useState<ApiState<BibleVerse>>({
    data: null,
    loading: false,
    error: null,
  });

  // Estado para la referencia buscada
  const [reference, setReference] = useState<string>('john 3:16');

  /**
   * Función para cargar un versículo desde la API
   * TODO: Implementar la llamada real a la API
   */
  const loadVerse = async () => {
    if (!reference.trim()) {
      setState({
        data: null,
        loading: false,
        error: { message: 'Por favor, ingresa una referencia bíblica.' },
      });
      return;
    }

    setState({ data: null, loading: true, error: null });

    try {
      // TODO: Descomentar cuando implementes la API
      /*
      import { fetchBibleVerse } from '../../services/bibleApi';
      
      const verse = await fetchBibleVerse(reference);
      setState({ data: verse, loading: false, error: null });
      */

      // Simulación de carga (remover cuando implementes la API real)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos de ejemplo (remover cuando implementes la API real)
      const mockData: BibleVerse = {
        reference: 'Juan 3:16',
        verses: [
          {
            book_id: 'JHN',
            book_name: 'Juan',
            chapter: 3,
            verse: 16,
            text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
          },
        ],
        text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
        translation_id: 'rvr',
        translation_name: 'Reina Valera',
      };

      setState({ data: mockData, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: { message: 'Error al cargar el versículo. Verifica la referencia e intenta de nuevo.' },
      });
    }
  };

  /**
   * Copiar versículo al portapapeles
   */
  const copyToClipboard = () => {
    if (state.data) {
      const textToCopy = `${state.data.text}\n\n- ${state.data.reference}`;
      navigator.clipboard.writeText(textToCopy);
      // Aquí podrías mostrar un snackbar de confirmación
    }
  };

  /**
   * Compartir versículo
   */
  const shareVerse = () => {
    if (state.data && navigator.share) {
      navigator.share({
        title: state.data.reference,
        text: `${state.data.text}\n\n- ${state.data.reference}`,
      });
    }
  };

  // Versículos populares sugeridos
  const popularVerses = [
    'john 3:16',
    'philippians 4:13',
    'jeremiah 29:11',
    'romans 8:28',
    'psalm 23:1',
    'proverbs 3:5-6',
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
        <MenuBookIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h5" fontWeight={600}>
          Versículos Bíblicos
        </Typography>
      </Box>

      {/* Información sobre la API */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>API Lista para Integrar:</strong> Este componente está preparado para usar
          Bible API. No requiere API key. Visita{' '}
          <a
            href="https://bible-api.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
          >
            bible-api.com
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
          label="Referencia bíblica"
          placeholder='Ej: "john 3:16", "psalm 23", "romans 12:1-2"'
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && loadVerse()}
          size="small"
          fullWidth
          helperText="Formato: libro capítulo:versículo (en inglés)"
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={loadVerse}
          disabled={state.loading}
          sx={{ minWidth: 120 }}
        >
          Buscar
        </Button>
      </Box>

      {/* Versículos populares */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Versículos populares:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {popularVerses.map((verse) => (
            <Button
              key={verse}
              size="small"
              variant="outlined"
              onClick={() => {
                setReference(verse);
                // Opcionalmente, cargar automáticamente
              }}
            >
              {verse}
            </Button>
          ))}
        </Box>
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

      {/* Resultado */}
      {state.data && (
        <Card sx={{ maxWidth: 800, mx: 'auto' }}>
          <CardContent sx={{ p: 4 }}>
            {/* Referencia */}
            <Typography
              variant="h5"
              color="primary"
              fontWeight={600}
              gutterBottom
              sx={{ textAlign: 'center' }}
            >
              {state.data.reference}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Texto del versículo */}
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                textAlign: 'justify',
                fontStyle: 'italic',
                color: 'text.primary',
                mb: 3,
              }}
            >
              "{state.data.text}"
            </Typography>

            {/* Traducción */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', textAlign: 'right', mb: 2 }}
            >
              {state.data.translation_name}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Acciones */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={copyToClipboard}
                size="small"
              >
                Copiar
              </Button>
              {'share' in navigator && (
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={shareVerse}
                  size="small"
                >
                  Compartir
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
