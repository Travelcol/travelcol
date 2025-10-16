import { Box, Typography, Container, Card, CardContent, Chip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VerifiedIcon from '@mui/icons-material/Verified';
import type { Certification } from '../../types/cv.types';

interface CertificationsSectionProps {
  certifications: Certification[];
}

/**
 * Componente de sección de Certificaciones
 * Muestra las certificaciones obtenidas
 */
export const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
        <EmojiEventsIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h4" component="h2" fontWeight={600}>
          Certificaciones
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {certifications.map((cert) => (
          <Card
            key={cert.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Icono de verificación */}
            <Box
              sx={{
                position: 'absolute',
                top: -12,
                right: 16,
                backgroundColor: 'primary.main',
                borderRadius: '50%',
                p: 1,
                boxShadow: 2,
              }}
            >
              <VerifiedIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>

            <CardContent sx={{ flexGrow: 1, pt: 3 }}>
              {/* Nombre de la certificación */}
              <Typography
                variant="h6"
                component="h3"
                fontWeight={600}
                gutterBottom
                sx={{ pr: 4 }}
              >
                {cert.name}
              </Typography>

              {/* Emisor */}
              <Typography
                variant="body1"
                color="text.secondary"
                gutterBottom
              >
                {cert.issuer}
              </Typography>

              {/* Año */}
              <Chip
                label={cert.year}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mt: 1 }}
              />

              {/* URL de credencial (opcional) */}
              {cert.credentialUrl && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    component="a"
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Ver credencial →
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};
