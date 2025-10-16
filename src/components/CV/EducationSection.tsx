import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import type { Education } from '../../types/cv.types';

interface EducationSectionProps {
  education: Education[];
}

/**
 * Componente de sección de Educación
 * Muestra la formación académica en cards
 */
export const EducationSection = ({ education }: EducationSectionProps) => {
  return (
    <Box sx={{ backgroundColor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" component="h2" fontWeight={600}>
            Educación
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {education.map((edu) => (
            <Card
              key={edu.id}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Título del grado */}
                <Typography
                  variant="h6"
                  component="h3"
                  fontWeight={600}
                  color="primary"
                  gutterBottom
                >
                  {edu.degree}
                </Typography>

                {/* Institución */}
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  {edu.institution}
                </Typography>

                {/* Período */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, fontStyle: 'italic' }}
                >
                  {edu.period}
                </Typography>

                {/* Descripción (opcional) */}
                {edu.description && (
                  <Typography variant="body2" color="text.primary">
                    {edu.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
