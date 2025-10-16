import { Box, Typography, Container, Chip, Tooltip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import type { TechSkill } from '../../types/cv.types';

interface SkillsBarProps {
  skills: TechSkill[];
}

/**
 * Componente de barra de habilidades técnicas
 * Muestra los lenguajes y frameworks que se manejan
 */
export const SkillsBar = ({ skills }: SkillsBarProps) => {
  // Agrupar skills por categoría
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, TechSkill[]>);

  // Mapeo de categorías a colores
  const categoryColors: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'info'> = {
    frontend: 'primary',
    backend: 'secondary',
    database: 'success',
    tools: 'warning',
    other: 'info',
  };

  // Mapeo de categorías a nombres en español
  const categoryNames: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Bases de Datos',
    tools: 'Herramientas',
    other: 'Otros',
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        py: 6,
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <CodeIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" component="h2" fontWeight={600}>
            Habilidades Técnicas
          </Typography>
        </Box>

        {/* Mostrar skills agrupadas por categoría */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Box key={category}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 2, fontWeight: 500 }}
              >
                {categoryNames[category] || category}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1.5,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                {categorySkills.map((skill, index) => (
                  <Tooltip key={index} title={skill.name} arrow>
                    <Chip
                      label={skill.name}
                      color={categoryColors[category] || 'default'}
                      sx={{
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        px: 1,
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: 2,
                        },
                        transition: 'all 0.2s',
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Vista alternativa: todas las skills juntas */}
        <Box sx={{ mt: 4, display: { xs: 'none', md: 'block' } }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'center', fontStyle: 'italic' }}
          >
            {skills.length} tecnologías dominadas
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
