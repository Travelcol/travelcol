# 📋 Instrucciones de Uso - CV Interactivo

## ✅ Proyecto Completado

Tu CV interactivo está **100% funcional** y listo para usar. Aquí está todo lo que necesitas saber:

## 🎯 Lo que se ha creado

### 1. **CV Profesional Completo**
- ✅ Header con nombre y profesión (Juan Arevalo - Ingeniero de Software)
- ✅ Sección "Sobre mí" con descripción personal
- ✅ Educación (Ingeniería de Software)
- ✅ Certificaciones (JavaScript Fundamentals - CISCO)
- ✅ Experiencia laboral (2 trabajos de ejemplo)
- ✅ Habilidades técnicas organizadas por categoría (React, Next.js, .NET, SQL Server, etc.)
- ✅ Sección de contacto con iconos interactivos

### 2. **4 Tabs Dinámicas con APIs**
Cada tab tiene la estructura completa lista para integrar APIs:

#### 🏈 **Tab de Fútbol**
- API: API-Football
- Funcionalidad: Ver partidos, ligas, clasificaciones
- Estado: Estructura lista, datos mock incluidos

#### 🎮 **Tab de Videojuegos**
- API: RAWG Video Games Database
- Funcionalidad: Buscar juegos, ver ratings, géneros
- Estado: Estructura lista, datos mock incluidos

#### 📖 **Tab de Biblia**
- API: Bible API (gratuita, sin API key)
- Funcionalidad: Buscar versículos, versículos populares
- Estado: Estructura lista, datos mock incluidos

#### 🎬 **Tab de Anime**
- API: Jikan (MyAnimeList, gratuita)
- Funcionalidad: Top anime, búsqueda, detalles
- Estado: Estructura lista, datos mock incluidos

## 🚀 Cómo Ejecutar el Proyecto

### Opción 1: Ya está corriendo
Si ejecutaste `npm run dev`, el proyecto ya está corriendo en:
```
http://localhost:5173
```

### Opción 2: Iniciar desde cero
```bash
# En la terminal del proyecto
npm run dev
```

Luego abre tu navegador en `http://localhost:5173`

## ✏️ Personalizar tu CV

### 1. Editar tus datos personales

Abre el archivo: `src/data/cvData.ts`

```typescript
export const cvData: CVData = {
  personal: {
    fullName: 'Juan Arevalo',        // ← Cambia tu nombre
    profession: 'Ingeniero de Software', // ← Cambia tu profesión
    description: '...',               // ← Cambia tu descripción
    photo: 'URL_DE_TU_FOTO',         // ← Agrega tu foto (opcional)
  },
  
  education: [
    {
      degree: 'Tu título',
      institution: 'Tu universidad',
      period: '2018 - 2022',
      // ...
    }
  ],
  
  certifications: [
    // Agrega tus certificaciones
  ],
  
  experience: [
    // Agrega tu experiencia
  ],
  
  contact: {
    email: 'juansearevalo00@gmail.com',  // ← Tu email
    linkedin: 'https://linkedin.com/in/tu-perfil',
    github: 'https://github.com/tu-usuario',
    phone: '+57 300 123 4567',
  },
  
  skills: [
    // Agrega o modifica tus habilidades
  ],
};
```

### 2. Cambiar colores del tema

Abre: `src/theme/theme.ts`

```typescript
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // ← Cambia el color principal
    },
    secondary: {
      main: '#dc004e', // ← Cambia el color secundario
    },
  },
});
```

## 🔌 Activar las APIs (Opcional)

### Para Fútbol (API-Football):
1. Regístrate en https://www.api-football.com/
2. Obtén tu API key
3. Abre `src/services/footballApi.ts`
4. Reemplaza `YOUR_API_KEY_HERE` con tu key
5. Abre `src/components/Tabs/FootballTab.tsx`
6. Descomenta las líneas marcadas con `TODO`

### Para Videojuegos (RAWG):
1. Regístrate en https://rawg.io/apidocs
2. Obtén tu API key
3. Abre `src/services/videoGamesApi.ts`
4. Reemplaza `YOUR_API_KEY_HERE` con tu key
5. Abre `src/components/Tabs/VideoGamesTab.tsx`
6. Descomenta las líneas marcadas con `TODO`

### Para Biblia (Bible API):
**No requiere API key** - Solo descomenta el código en `src/components/Tabs/BibleTab.tsx`

### Para Anime (Jikan):
**No requiere API key** - Solo descomenta el código en `src/components/Tabs/AnimeTab.tsx`

## 📱 Características del Diseño

- ✅ **Responsive**: Se adapta a móviles, tablets y escritorio
- ✅ **Material UI**: Componentes modernos y profesionales
- ✅ **Animaciones**: Hover effects y transiciones suaves
- ✅ **Iconos**: Material Icons integrados
- ✅ **Tipografía**: Roboto font para mejor legibilidad
- ✅ **Colores**: Paleta profesional azul/rosa

## 🎨 Estructura Visual

```
┌─────────────────────────────────────┐
│  HEADER (Nombre + Profesión)       │
├─────────────────────────────────────┤
│  Sobre mí                           │
├─────────────────────────────────────┤
│  Educación (Cards en grid)          │
├─────────────────────────────────────┤
│  Certificaciones (Cards)            │
├─────────────────────────────────────┤
│  Experiencia (Timeline)             │
├─────────────────────────────────────┤
│  Habilidades (Chips por categoría)  │
├─────────────────────────────────────┤
│  Contacto (Iconos interactivos)     │
├─────────────────────────────────────┤
│  TABS: [Fútbol][Videojuegos]       │
│        [Biblia][Anime]              │
│  ┌───────────────────────────────┐  │
│  │  Contenido del tab activo     │  │
│  └───────────────────────────────┘  │
├─────────────────────────────────────┤
│  FOOTER                             │
└─────────────────────────────────────┘
```

## 📦 Comandos Útiles

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

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Verifica que las dependencias estén instaladas
npm install

# Intenta limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Errores de TypeScript
- Todos los tipos están definidos en `src/types/`
- El proyecto usa `strict: true` en TypeScript

### Las APIs no funcionan
- Verifica que hayas agregado tu API key
- Revisa la consola del navegador para errores
- Asegúrate de haber descomentado el código

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev/)
- [Documentación de Material UI](https://mui.com/)
- [Documentación de TypeScript](https://www.typescriptlang.org/)
- [API-Football Docs](https://www.api-football.com/documentation-v3)
- [RAWG API Docs](https://api.rawg.io/docs/)
- [Bible API Docs](https://bible-api.com/)
- [Jikan API Docs](https://docs.api.jikan.moe/)

## 🎉 ¡Listo para Usar!

Tu CV interactivo está completamente funcional. Puedes:

1. ✅ Ver tu CV completo con toda tu información
2. ✅ Navegar por las 4 tabs dinámicas
3. ✅ Ver datos de ejemplo en cada tab
4. ✅ Personalizar todos los datos editando `cvData.ts`
5. ✅ Integrar las APIs cuando estés listo

**¡Disfruta tu nuevo CV interactivo!** 🚀

---

Si tienes preguntas o necesitas ayuda, revisa el código - está completamente comentado y documentado.
