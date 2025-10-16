import { useRef, useState } from "react";
import {
  Box,
  Container,
  Tabs,
  Tab,
  Paper,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Fab,
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MovieIcon from "@mui/icons-material/Movie";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkIcon from "@mui/icons-material/Work";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { FootballTab } from "./components/Tabs/FootballTab";
import { VideoGamesTab } from "./components/Tabs/VideoGamesTab";
import { BibleTab } from "./components/Tabs/BibleTab";
import { AnimeTab } from "./components/Tabs/AnimeTab";
import { SkillsCarousel } from "./components/CV/SkillsCarousel";
import { cvData } from "./data/cvData";

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const cvRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) =>
    setActiveTab(newValue);

const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};


  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 30% 30%, rgba(220,20,60,0.15), transparent 40%), radial-gradient(circle at 70% 70%, rgba(220,20,60,0.1), transparent 50%), #0a0a0a",
        color: "#fff",
        scrollBehavior: "smooth",
      }}
    >
      {/* ================= CV SECTION ================= */}
      <Box
        ref={cvRef}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
          <Container maxWidth={false} sx={{ maxWidth: "1700px", px: 3 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1.8fr 1fr" },
                gap: 3,
                alignItems: "start",
              }}
            >
              {/* ========== IZQUIERDA ========== */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {/* Experiencia */}
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "rgba(15,15,15,0.9)",
                    border: "1px solid rgba(220,20,60,0.25)",
                    boxShadow: "0 0 15px rgba(220,20,60,0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <WorkIcon color="primary" /> Experiencia
                  </Typography>
                  {cvData.experience.map((exp) => (
                    <Box key={exp.id} sx={{ mb: 3, "&:last-child": { mb: 0 } }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="primary"
                      >
                        {exp.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {exp.company}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {exp.period}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        {exp.description}
                      </Typography>
                    </Box>
                  ))}
                </Paper>

                {/* Contacto */}
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "rgba(15,15,15,0.9)",
                    border: "1px solid rgba(220,20,60,0.25)",
                    boxShadow: "0 0 15px rgba(220,20,60,0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    textAlign="center"
                  >
                    Contacto
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    {cvData.contact.email && (
                      <Tooltip title={cvData.contact.email}>
                        <IconButton
                          component="a"
                          href={`mailto:${cvData.contact.email}`}
                          sx={{
                            backgroundColor: "rgba(220,20,60,0.3)",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "primary.main",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <EmailIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {cvData.contact.linkedin && (
                      <Tooltip title="LinkedIn">
                        <IconButton
                          component="a"
                          href={cvData.contact.linkedin}
                          target="_blank"
                          sx={{
                            backgroundColor: "rgba(0,119,181,0.4)",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#0077b5",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <LinkedInIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {cvData.contact.github && (
                      <Tooltip title="GitHub">
                        <IconButton
                          component="a"
                          href={cvData.contact.github}
                          target="_blank"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#000",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <GitHubIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {cvData.contact.phone && (
                      <Tooltip title={cvData.contact.phone}>
                        <IconButton
                          component="a"
                          href={`tel:${cvData.contact.phone}`}
                          sx={{
                            backgroundColor: "rgba(76,175,80,0.4)",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "success.main",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <PhoneIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Paper>
              </Box>

              {/* ========== CENTRO ========== */}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    backgroundColor: "rgba(20,20,20,0.9)",
                    border: "1px solid rgba(220,20,60,0.25)",
                    boxShadow: "0 0 25px rgba(220,20,60,0.3)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Avatar
                    src={cvData.personal.photo}
                    alt={cvData.personal.fullName}
                    sx={{
                      width: 140,
                      height: 140,
                      mx: "auto",
                      mb: 2,
                      border: "3px solid",
                      borderColor: "primary.main",
                      boxShadow: "0 0 25px rgba(220,20,60,0.6)",
                    }}
                  >
                    {!cvData.personal.photo &&
                      cvData.personal.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                  </Avatar>
                  <Typography variant="h4" fontWeight={700}>
                    {cvData.personal.fullName}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {cvData.personal.profession}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 1,
                      gap: 1,
                    }}
                  >
                    {/* <SportsSoccerIcon
                      sx={{
                        fontSize: 30,
                        color: "#c62828",
                        filter: "drop-shadow(0 0 6px rgba(198,40,40,0.8))",
                        animation: "pulse 2s infinite",
                      }}
                    /> */}
                  </Box>
                </Paper>

                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "rgba(20,20,20,0.9)",
                    border: "1px solid rgba(220,20,60,0.25)",
                    boxShadow: "0 0 20px rgba(220,20,60,0.25)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Sobre mí
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.7,
                      textAlign: "justify",
                      color: "#ddd",
                    }}
                  >
                    {cvData.personal.description}
                  </Typography>
                </Paper>

                <Paper
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "rgba(20,20,20,0.9)",
                    border: "1px solid rgba(220,20,60,0.25)",
                    boxShadow: "0 0 20px rgba(220,20,60,0.25)",
                    backdropFilter: "blur(10px)",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ px: 2, pt: 2 }}
                  >
                    Habilidades Técnicas
                  </Typography>
                  <Box sx={{ width: "100%", maxWidth: "800px", mx: "auto", p: 2 }}>
                    <SkillsCarousel skills={cvData.skills} />
                  </Box>
                </Paper>
              </Box>

              {/* ========== DERECHA ========== */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "rgba(15,15,15,0.9)",
                    border: "1px solid rgba(220,20,60,0.25)",
                    boxShadow: "0 0 15px rgba(220,20,60,0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <SchoolIcon color="primary" /> Educación
                  </Typography>
                  {cvData.education.map((edu) => (
                    <Box key={edu.id} sx={{ mb: 3, "&:last-child": { mb: 0 } }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="primary"
                      >
                        {edu.degree}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {edu.institution}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {edu.period}
                      </Typography>
                      {edu.description && (
                        <Typography
                          variant="body2"
                          sx={{ mt: 1, fontSize: "0.85rem", color: "#ddd" }}
                        >
                          {edu.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Paper>

                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "rgba(15,15,15,0.9)",
                    border: "1px solid rgba(220,20,60,0.25)",
                    boxShadow: "0 0 15px rgba(220,20,60,0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <EmojiEventsIcon color="primary" /> Certificaciones
                  </Typography>
                  {cvData.certifications.map((cert) => (
                    <Box key={cert.id} sx={{ mb: 2, "&:last-child": { mb: 0 } }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {cert.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {cert.issuer} • {cert.year}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Botón ↓ hacia APIs */}
        <Fab
          onClick={() => scrollToSection(apiRef)}
          sx={{
            position: "absolute",
            bottom: 24,
            right: 24,
            background: "rgba(198,40,40,0.85)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(198,40,40,0.6)",
            animation: "pulse 2s infinite",
            "&:hover": {
              background: "rgba(198,40,40,1)",
              boxShadow: "0 0 30px rgba(198,40,40,0.9)",
            },
          }}
        >
          <KeyboardArrowDownIcon />
        </Fab>
      </Box>

      {/* ================= APIS SECTION ================= */}
      <Box
        ref={apiRef}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ backgroundColor: "#111", py: 6 }}>
          <Container maxWidth="xl">
            <Typography
              variant="h3"
              textAlign="center"
              fontWeight={700}
              gutterBottom
              sx={{ color: "#fff", mb: 4 }}
            >
              Explora Más
            </Typography>
            <Paper
              elevation={4}
              sx={{
                mb: 4,
                borderRadius: 2,
                backgroundColor: "rgba(20,20,20,0.9)",
                border: "1px solid rgba(220,20,60,0.25)",
                boxShadow: "0 0 20px rgba(220,20,60,0.25)",
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  "& .MuiTab-root": {
                    minHeight: 80,
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 500,
                  },
                }}
              >
                <Tab
                  icon={<SportsSoccerIcon sx={{ fontSize: 32 }} />}
                  label="Fútbol"
                  iconPosition="top"
                />
                <Tab
                  icon={<SportsEsportsIcon sx={{ fontSize: 32 }} />}
                  label="Videojuegos"
                  iconPosition="top"
                />
                <Tab
                  icon={<MenuBookIcon sx={{ fontSize: 32 }} />}
                  label="Biblia"
                  iconPosition="top"
                />
                <Tab
                  icon={<MovieIcon sx={{ fontSize: 32 }} />}
                  label="Anime"
                  iconPosition="top"
                />
              </Tabs>
            </Paper>

            <Paper
              elevation={4}
              sx={{
                borderRadius: 2,
                backgroundColor: "rgba(15,15,15,0.9)",
                border: "1px solid rgba(220,20,60,0.25)",
                boxShadow: "0 0 20px rgba(220,20,60,0.25)",
              }}
            >
              {activeTab === 0 && <FootballTab />}
              {activeTab === 1 && <VideoGamesTab />}
              {activeTab === 2 && <BibleTab />}
              {activeTab === 3 && <AnimeTab />}
            </Paper>
          </Container>
        </Box>

        {/* Botón ↑ hacia CV */}
        <Fab
          onClick={() => scrollToSection(cvRef)}
          sx={{
            position: "absolute",
            top: 24,
            right: 24,
            background: "rgba(198,40,40,0.85)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(198,40,40,0.6)",
            animation: "pulse 2s infinite",
            "&:hover": {
              background: "rgba(198,40,40,1)",
              boxShadow: "0 0 30px rgba(198,40,40,0.9)",
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>

      {/* ANIMACIÓN KEYFRAMES */}
      <style>
        {`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); filter: brightness(1.2); }
          100% { transform: scale(1); }
        }
        `}
      </style>
    </Box>
  );
}

export default App;
