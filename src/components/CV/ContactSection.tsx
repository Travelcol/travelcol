import { Box, Typography, Container, Paper, IconButton, Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import type { ContactInfo } from '../../types/cv.types';

interface ContactSectionProps {
  contact: ContactInfo;
}

/**
 * Componente de sección de Contacto
 * Muestra información de contacto con iconos interactivos
 */
export const ContactSection = ({ contact }: ContactSectionProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ContactMailIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h4" component="h2" fontWeight={600}>
          Contacto
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
          color="text.secondary"
          sx={{ mb: 3, textAlign: 'center' }}
        >
          ¿Interesado en trabajar juntos? ¡Contáctame!
        </Typography>

        {/* Iconos de contacto */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {/* Email */}
          {contact.email && (
            <Tooltip title={contact.email} arrow>
              <IconButton
                component="a"
                href={`mailto:${contact.email}`}
                color="primary"
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: 'primary.light',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <EmailIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* LinkedIn */}
          {contact.linkedin && (
            <Tooltip title="LinkedIn" arrow>
              <IconButton
                component="a"
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: '#0077b5',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#005885',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* GitHub */}
          {contact.github && (
            <Tooltip title="GitHub" arrow>
              <IconButton
                component="a"
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: '#333',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#000',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Teléfono */}
          {contact.phone && (
            <Tooltip title={contact.phone} arrow>
              <IconButton
                component="a"
                href={`tel:${contact.phone}`}
                color="success"
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: 'success.light',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'success.main',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <PhoneIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Website */}
          {contact.website && (
            <Tooltip title="Website" arrow>
              <IconButton
                component="a"
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                color="secondary"
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: 'secondary.light',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <LanguageIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Información de contacto en texto */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          {contact.email && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Email:</strong> {contact.email}
            </Typography>
          )}
          {contact.phone && (
            <Typography variant="body2" color="text.secondary">
              <strong>Teléfono:</strong> {contact.phone}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
