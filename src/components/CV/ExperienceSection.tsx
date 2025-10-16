import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import type { Experience } from '../../types/cv.types';

interface ExperienceSectionProps {
  experience: Experience[];
}

/**
 * Componente de sección de Experiencia Laboral
 * Muestra el historial de trabajo
 */
export const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
  return (
    <Box sx={{ backgroundColor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
          <WorkIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" component="h2" fontWeight={600}>
            Experiencia Laboral
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {experience.map((exp, index) => (
            <Card
              key={exp.id}
              sx={{
                position: 'relative',
                '&::before': index !== experience.length - 1 ? {
                  content: '""',
                  position: 'absolute',
                  left: { xs: 16, md: 24 },
                  top: 60,
                  bottom: -24,
                  width: 2,
                  backgroundColor: 'primary.light',
                  opacity: 0.3,
                } : {},
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                {/* Indicador de timeline */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 8, md: 16 },
                    top: 32,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    border: '3px solid white',
                    boxShadow: 1,
                  }}
                />

                <Box sx={{ pl: { xs: 4, md: 5 } }}>
                  {/* Rol */}
                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight={600}
                    color="primary"
                    gutterBottom
                  >
                    {exp.role}
                  </Typography>

                  {/* Empresa */}
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    gutterBottom
                  >
                    {exp.company}
                  </Typography>

                  {/* Período */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, fontStyle: 'italic' }}
                  >
                    {exp.period}
                  </Typography>

                  {/* Descripción */}
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ mb: 2, lineHeight: 1.7 }}
                  >
                    {exp.description}
                  </Typography>

                  {/* Tecnologías utilizadas */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      {exp.technologies.map((tech, idx) => (
                        <Chip
                          key={idx}
                          label={tech}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
