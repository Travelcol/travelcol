import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiMui,
  SiDotnet,
  SiNodedotjs,
  SiSharp,
  SiMysql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiGnometerminal,
} from 'react-icons/si';
import type { TechSkill } from '../../types/cv.types';

interface SkillsCarouselProps {
  skills: TechSkill[];
}

/**
 * Carrusel moderno de habilidades técnicas
 * Estilo dark carmesí con íconos reales y animación infinita suave.
 */
export const SkillsCarousel = ({ skills }: SkillsCarouselProps) => {
  // 🔁 Animación continua sin salto
  const scroll = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  `;

  // 🎨 Asignar íconos según el nombre
  const getIconForSkill = (skillName: string) => {
    const name = skillName.toLowerCase();
    if (name.includes('react')) return <SiReact color="#61dafb" />;
    if (name.includes('next')) return <SiNextdotjs color="#fff" />;
    if (name.includes('javascript') || name.includes('js')) return <SiJavascript color="#f7df1e" />;
    if (name.includes('typescript') || name.includes('ts')) return <SiTypescript color="#3178c6" />;
    if (name.includes('html')) return <SiHtml5 color="#e34f26" />;
    if (name.includes('css')) return <SiCss3 color="#1572b6" />;
    if (name.includes('material')) return <SiMui color="#00bcd4" />;
    if (name.includes('.net') || name.includes('dotnet')) return <SiDotnet color="#512bd4" />;
    if (name.includes('node')) return <SiNodedotjs color="#3c873a" />;
    if (name.includes('c#')) return <SiSharp color="#9b4f96" />;
    if (name.includes('sql')) return <SiMysql color="#00758f" />;
    if (name.includes('mongo')) return <SiMongodb color="#47a248" />;
    if (name.includes('git')) return <SiGit color="#f1502f" />;
    if (name.includes('docker')) return <SiDocker color="#0db7ed" />;
    if (name.includes('vs code') || name.includes('vscode')) return <SiGnometerminal color="#007acc" />;
    return <span style={{ color: '#c62828' }}>⚙️</span>;
  };

  // 📦 Duplicamos para animación infinita (mínimo 2 copias)
  const loopedSkills = [...skills, ...skills, ...skills];

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        py: 3,
        background: 'transparent',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          width: 'max-content',
          animation: `${scroll} 45s linear infinite`,
          '&:hover': { animationPlayState: 'paused' },
        }}
      >
        {loopedSkills.map((skill, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90px',
              color: '#fff',
              textShadow: '0 0 8px rgba(198,40,40,0.4)',
              transition: 'transform 0.3s ease, text-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.15)',
                textShadow: '0 0 20px rgba(198,40,40,0.9)',
              },
            }}
          >
            <Box sx={{ fontSize: '2.3rem', mb: 0.7 }}>{getIconForSkill(skill.name)}</Box>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                textAlign: 'center',
                color: '#f3f3f3',
                letterSpacing: '0.5px',
              }}
            >
              {skill.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
