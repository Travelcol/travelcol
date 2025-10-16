import { Box, Typography, Container, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

interface AboutSectionProps {
  description: string;
}

/**
 * Componente de sección "Sobre mí"
 * Muestra la descripción personal
 */
export const AboutSection = ({ description }: AboutSectionProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h4" component="h2" fontWeight={600}>
          Sobre mí
        </Typography>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8,
            color: 'text.primary',
          }}
        >
          {description}
        </Typography>
      </Paper>
    </Container>
  );
};
