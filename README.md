# CV Interactivo - Juan Arevalo

CV web interactivo desarrollado con React, TypeScript y Material UI. Incluye secciones dinámicas con integración de APIs públicas.

## 🚀 Características

- ✅ **CV Profesional Completo**: Presentación, educación, certificaciones, experiencia y contacto
- ✅ **Diseño Moderno**: Interfaz limpia y profesional con Material UI
- ✅ **Responsive**: Adaptado para móviles, tablets y escritorio
- ✅ **TypeScript**: Código tipado y seguro
- ✅ **4 Secciones Dinámicas con APIs**:
  - 🏈 **Fútbol**: API-Football para partidos y ligas
  - 🎮 **Videojuegos**: RAWG API para información de juegos
  - 📖 **Biblia**: Bible API para versículos bíblicos
  - 🎬 **Anime**: Jikan API (MyAnimeList) para anime

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio (si aplica) o navega al directorio del proyecto:
```bash
cd travelcol
```

2. Instala las dependencias (ya están instaladas):
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── CV/                    # Componentes del CV
│   │   ├── CVHeader.tsx       # Encabezado con nombre y profesión
│   │   ├── AboutSection.tsx   # Sección "Sobre mí"
│   │   ├── EducationSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── SkillsBar.tsx      # Habilidades técnicas
│   └── Tabs/                  # Componentes de tabs dinámicas
│       ├── FootballTab.tsx
│       ├── VideoGamesTab.tsx
│       ├── BibleTab.tsx
│       └── AnimeTab.tsx
├── services/                  # Servicios de API
│   ├── footballApi.ts
│   ├── videoGamesApi.ts
│   ├── bibleApi.ts
│   └── animeApi.ts
├── types/                     # Tipos TypeScript
│   ├── cv.types.ts
│   └── api.types.ts
├── data/
│   └── cvData.ts             # Datos del CV (editable)
├── theme/
│   └── theme.ts              # Tema de Material UI
├── App.tsx                   # Componente principal
└── main.tsx                  # Punto de entrada

```

## ✏️ Personalización

### Editar Datos del CV

Edita el archivo `src/data/cvData.ts` para actualizar tu información personal:

```typescript
export const cvData: CVData = {
  personal: {
    fullName: 'Tu Nombre',
    profession: 'Tu Profesión',
    description: 'Tu descripción...',
  },
  // ... más datos
};
```

### Cambiar Colores y Tema

Edita `src/theme/theme.ts` para personalizar los colores:

```typescript
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Cambia este color
    },
    // ...
  },
});
```

## 🔌 Integración de APIs

Cada tab tiene su API preparada pero **sin implementar**. Para activarlas:

### 1. Fútbol (API-Football)

1. Obtén tu API key en [api-football.com](https://www.api-football.com/)
2. Abre `src/services/footballApi.ts`
3. Reemplaza `YOUR_API_KEY_HERE` con tu API key
4. Descomenta el código en `src/components/Tabs/FootballTab.tsx`

**Ejemplo de uso:**
```typescript
import { fetchFootballMatches } from '../../services/footballApi';

const matches = await fetchFootballMatches(140, '2024-01-15');
```

### 2. Videojuegos (RAWG API)

1. Obtén tu API key en [rawg.io/apidocs](https://rawg.io/apidocs)
2. Abre `src/services/videoGamesApi.ts`
3. Reemplaza `YOUR_API_KEY_HERE` con tu API key
4. Descomenta el código en `src/components/Tabs/VideoGamesTab.tsx`

**Ejemplo de uso:**
```typescript
import { fetchVideoGames } from '../../services/videoGamesApi';

const response = await fetchVideoGames(1, 20, 'Minecraft', '-rating');
```

### 3. Biblia (Bible API)

**No requiere API key** ✅

1. Abre `src/components/Tabs/BibleTab.tsx`
2. Descomenta el código de la función `loadVerse()`

**Ejemplo de uso:**
```typescript
import { fetchBibleVerse } from '../../services/bibleApi';

const verse = await fetchBibleVerse('john 3:16');
```

### 4. Anime (Jikan API)

**No requiere API key** ✅

1. Abre `src/components/Tabs/AnimeTab.tsx`
2. Descomenta el código de la función `loadAnime()`

**Ejemplo de uso:**
```typescript
import { fetchTopAnime, searchAnime } from '../../services/animeApi';

const topAnime = await fetchTopAnime(1, 20);
const searchResults = await searchAnime('Naruto', 1, 20);
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🎨 Tecnologías Utilizadas

- **React 19** - Framework de UI
- **TypeScript** - Tipado estático
- **Material UI v7** - Componentes de UI
- **Vite** - Build tool y dev server
- **Material Icons** - Iconos

## 📝 Notas Importantes

1. **Datos Mock**: Actualmente las tabs muestran datos de ejemplo. Implementa las APIs para ver datos reales.

2. **Rate Limits**: Ten en cuenta los límites de las APIs:
   - API-Football: Según tu plan
   - RAWG: 20,000 requests/mes (plan gratuito)
   - Bible API: Sin límites
   - Jikan: 3 req/seg, 60 req/min

3. **CORS**: Si encuentras problemas de CORS en desarrollo, considera usar un proxy o backend intermedio.

4. **Responsive**: El diseño está optimizado para todos los tamaños de pantalla.

## 🤝 Contribuciones

Este es un proyecto personal, pero siéntete libre de usarlo como plantilla para tu propio CV.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Juan Arevalo**
- Email: juansearevalo00@gmail.com
- LinkedIn: [Tu LinkedIn]
- GitHub: [Tu GitHub]

---

Desarrollado con ❤️ usando React + TypeScript + Material UI
