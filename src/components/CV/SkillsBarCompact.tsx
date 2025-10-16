import { Box, Typography, Tooltip, useTheme } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import type { TechSkill } from '../../types/cv.types';

interface SkillsBarCompactProps {
  skills: TechSkill[];
}

/**
 * Componente compacto de habilidades técnicas adaptado
 * al tema oscuro carmesí con efectos glow elegantes.
 */
export const SkillsBarCompact = ({ skills }: SkillsBarCompactProps) => {
  const theme = useTheme();

  const getIconForSkill = (skillName: string) => {
    const name = skillName.toLowerCase();
    if (name.includes('react') || name.includes('next')) return '⚛️';
    if (name.includes('javascript') || name.includes('js')) return '🟨';
    if (name.includes('typescript') || name.includes('ts')) return '🔷';
    if (name.includes('html')) return '🌐';
    if (name.includes('css')) return '🎨';
    if (name.includes('material')) return '💎';
    if (name.includes('.net') || name.includes('dotnet')) return '🟣';
    if (name.includes('node')) return '🟢';
    if (name.includes('c#')) return '💜';
    if (name.includes('sql')) return '🗄️';
    if (name.includes('mongo')) return '🍃';
    if (name.includes('git')) return '📦';
    if (name.includes('docker')) return '🐳';
    if (name.includes('vs code') || name.includes('vscode')) return '💻';
    return '⚙️';
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          textShadow: '0 0 10px rgba(198,40,40,0.5)',
        }}
      >
        <CodeIcon sx={{ color: theme.palette.primary.main }} />
        Habilidades Técnicas
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        {skills.map((skill, index) => (
          <Tooltip key={index} title={skill.name} arrow>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.75,
                py: 1,
                borderRadius: 2,
                background: 'rgba(30,30,30,0.9)',
                border: `1px solid rgba(198,40,40,0.4)`,
                color: '#f2f2f2',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 0 8px rgba(0,0,0,0.4)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  background: 'rgba(60,0,0,0.9)',
                  borderColor: 'rgba(198,40,40,0.8)',
                  boxShadow: '0 0 15px rgba(198,40,40,0.6)',
                  color: theme.palette.primary.main,
                },
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>
                {getIconForSkill(skill.name)}
              </span>
              <span>{skill.name}</span>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};
