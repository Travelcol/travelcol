import { Box, Typography, Avatar, Container } from '@mui/material';
import type { PersonalInfo } from '../../types/cv.types';

interface CVHeaderProps {
  personal: PersonalInfo;
}

/**
 * Componente de encabezado del CV
 * Muestra nombre, profesión y foto (opcional)
 */
export const CVHeader = ({ personal }: CVHeaderProps) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        {/* Avatar/Foto de perfil */}
        <Avatar
          src={personal.photo}
          alt={personal.fullName}
          sx={{
            width: { xs: 120, md: 150 },
            height: { xs: 120, md: 150 },
            margin: '0 auto',
            mb: 3,
            border: '4px solid white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          {/* Si no hay foto, muestra las iniciales */}
          {!personal.photo && personal.fullName.split(' ').map(n => n[0]).join('')}
        </Avatar>

        {/* Nombre completo */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            mb: 1,
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {personal.fullName}
        </Typography>

        {/* Profesión */}
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
            fontWeight: 400,
            opacity: 0.95,
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          {personal.profession}
        </Typography>
      </Container>
    </Box>
  );
};
