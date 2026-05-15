# Manager

Panel de control personal para gestionar proyectos, servicios externos y las relaciones entre ellos. Construido con React 19, TypeScript y almacenamiento local en IndexedDB — sin backend, sin base de datos en servidor.

---

## Tabla de contenidos

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Primeros pasos](#primeros-pasos)
- [Autenticación](#autenticación)
- [Páginas y funcionalidades](#páginas-y-funcionalidades)
- [Modelos de datos](#modelos-de-datos)
- [Base de datos](#base-de-datos)
- [Estado global](#estado-global)
- [Componentes](#componentes)
- [Utilidades](#utilidades)
- [Configuración](#configuración)

---

## Características

- **Tablero de flujo interactivo** — visualiza proyectos y servicios como nodos conectables con [@xyflow/react](https://reactflow.dev/). Arrastra nodos, dibuja conexiones y elimina relaciones con la tecla `Delete`.
- **CRUD completo** — crea, edita y elimina proyectos, servicios y tags desde grillas responsivas con filtros y búsqueda en tiempo real.
- **Datos reactivos** — `useLiveQuery` de Dexie actualiza la UI instantáneamente ante cualquier cambio en IndexedDB.
- **Autenticación local** — contraseñas hasheadas con PBKDF2/SHA-256 vía Web Crypto API, sesión persistida en `localStorage`.
- **Exportar / Importar** — backup completo de la base de datos como JSON y restauración transaccional.
- **Sin servidor** — toda la persistencia corre en IndexedDB del navegador, cero dependencias de red.
- **Dark mode por defecto** — tema oscuro con variables HSL de Tailwind.

---

## Stack tecnológico

| Categoría | Tecnología |
|---|---|
| UI | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Routing | react-router-dom v6 |
| Estado global | Zustand v5 |
| Base de datos | Dexie v4 (IndexedDB) |
| Estilos | Tailwind CSS v3 (dark mode por clase) |
| Componentes UI | Radix UI primitives + shadcn-style |
| Visualización | @xyflow/react v12 |
| Formularios | react-hook-form v7 + Zod v4 |
| Animaciones | Framer Motion v12 |
| Iconos | Lucide React |
| Toasts | Sonner |
| Cripto | Web Crypto API (nativa del navegador) |

---

## Estructura del proyecto

```
src/
├── main.tsx                    # Entry point (React + StrictMode)
├── App.tsx                     # Root: inicializa dark mode y seed de DB
├── index.css                   # Variables CSS globales (HSL design tokens)
│
├── types/
│   └── index.ts               # Todos los tipos e interfaces TypeScript
│
├── utils/
│   ├── cn.ts                  # clsx + tailwind-merge
│   └── crypto.ts              # PBKDF2 hash/verify, generateSalt
│
├── database/
│   ├── db.ts                  # Instancia Dexie + helpers (logActivity, saveNodePosition)
│   └── seed.ts                # Datos iniciales (usuario, proyectos, servicios, tags)
│
├── store/
│   ├── authStore.ts           # Zustand: isAuthenticated, login, logout
│   └── uiStore.ts             # Zustand: sidebarCollapsed, theme
│
├── routes/
│   ├── index.tsx              # Declaración de rutas con React Router
│   └── ProtectedRoute.tsx      # Guard: redirige a /login si no autenticado
│
├── layouts/
│   ├── AuthLayout.tsx          # Layout centrado para la página de login
│   └── AppLayout.tsx           # Layout principal: sidebar + área de contenido
│
├── pages/
│   ├── LoginPage.tsx           # Formulario de inicio de sesión
│   ├── DashboardPage.tsx       # Stats + tablero de flujo interactivo
│   ├── ProjectsPage.tsx        # Grilla de proyectos con CRUD y filtros
│   ├── ProjectDetailModal.tsx  # Modal de detalle de un proyecto
│   ├── ServicesPage.tsx        # Grilla de servicios con CRUD y filtros
│   ├── TagsPage.tsx            # Gestión de tags
│   └── SettingsPage.tsx        # Contraseña, export/import, limpiar datos
│
└── components/
    ├── layout/
    │   ├── Sidebar.tsx         # Navegación lateral colapsable
    │   └── Header.tsx          # Cabecera de página con slot de acciones
    ├── common/
    │   ├── TagBadge.tsx        # Badge de tag con color
    │   ├── StatusBadge.tsx     # Badge de estado de proyecto
    │   ├── EmptyState.tsx      # Placeholder para listas vacías
    │   ├── ColorPicker.tsx     # Selector de color con colores preset
    │   └── ProviderIcon.tsx    # Mapeo proveedor → ícono Lucide + color
    ├── dashboard/
    │   ├── StatsCards.tsx      # 6 tarjetas de métricas
    │   ├── FlowBoard.tsx       # Canvas XY Flow con lógica de nodos/edges
    │   ├── ProjectNode.tsx     # Nodo de proyecto en el tablero
    │   └── ServiceNode.tsx     # Nodo de servicio en el tablero
    ├── projects/
    │   ├── ProjectCard.tsx     # Tarjeta de proyecto
    │   └── ProjectForm.tsx     # Formulario crear/editar proyecto
    ├── services/
    │   ├── ServiceCard.tsx     # Tarjeta de servicio
    │   └── ServiceForm.tsx     # Formulario crear/editar servicio
    └── ui/                     # Componentes shadcn/ui
        ├── button.tsx
        ├── input.tsx
        ├── label.tsx
        ├── badge.tsx
        ├── card.tsx
        ├── textarea.tsx
        ├── dialog.tsx
        ├── alert-dialog.tsx
        ├── select.tsx
        ├── skeleton.tsx
        ├── separator.tsx
        ├── switch.tsx
        └── tooltip.tsx
```

---

## Primeros pasos

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo (http://localhost:5173)
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview

# Lint
pnpm lint
```

Al iniciar por primera vez, la base de datos se popula automáticamente con datos de muestra (4 proyectos, 6 servicios, 7 tags, 11 relaciones y 1 usuario `admin`).

---

## Autenticación

La autenticación es completamente local — no hay servidor de sesiones ni tokens JWT.

**Credenciales por defecto:**

| Campo | Valor |
|---|---|
| Usuario | `admin` |
| Contraseña | `admin123` |

**Flujo completo:**

1. El usuario ingresa credenciales en `/login`.
2. Se busca el usuario en IndexedDB por `username`.
3. La contraseña se verifica con `verifyPassword()` (PBKDF2-SHA256, 100.000 iteraciones).
4. Si es válida, se guarda `{ username, loggedInAt }` en `localStorage` bajo la clave `manager_auth`.
5. `authStore` lee `localStorage` **sincrónicamente** al inicializar el módulo — el primer render ya conoce el estado de autenticación sin redirecciones intermedias.
6. `ProtectedRoute` redirige a `/login` si `isAuthenticated` es `false`.

**Cambio de contraseña:** disponible en `/settings`. Requiere verificar la contraseña actual, genera una nueva salt aleatoria y almacena el nuevo hash.

---

## Páginas y funcionalidades

### `/login`
Formulario con validación via Zod (campos requeridos). Incluye toggle para mostrar/ocultar contraseña y animación de entrada con Framer Motion.

---

### `/dashboard`

**Tarjetas de estadísticas (6 métricas en tiempo real):**

| Métrica | Descripción |
|---|---|
| Proyectos | Total + cuántos están activos |
| Servicios | Total |
| Tags | Total |
| Relaciones | Total de conexiones proyecto-servicio |
| Favoritos | Proyectos marcados como favorito |
| Recientes | Relaciones creadas en los últimos 7 días |

Muestra skeletons de carga mientras IndexedDB responde.

**Tablero de flujo interactivo:**
- Proyectos aparecen en la columna izquierda, servicios en la derecha.
- **Conectar:** arrastrar desde el handle de un proyecto hasta el handle de un servicio → crea una `Relation` en la DB.
- **Eliminar relación:** seleccionar un edge y presionar `Delete`.
- **Mover nodos:** las posiciones se persisten en IndexedDB (tabla `nodePositions`).
- Controles de zoom, fit-view y minimapa incluidos.

---

### `/projects`

Grilla responsiva (1 → 4 columnas según viewport).

**Acciones disponibles:**
- Crear proyecto (dialog con formulario completo)
- Editar proyecto (mismo formulario pre-populado)
- Eliminar proyecto (con `AlertDialog` de confirmación)
- Toggle favorito
- Abrir link externo en nueva pestaña
- Ver detalle: modal con descripción, notas, servicios vinculados y fechas de creación/actualización

**Filtros:**
- Búsqueda por texto (título o descripción)
- Estado: `active` / `paused` / `completed`
- Tag: botones toggle por tag disponible

**Campos del formulario de proyecto:**

| Campo | Tipo | Notas |
|---|---|---|
| Título | text | Obligatorio |
| Descripción | textarea | |
| Link | text | URL del proyecto |
| Estado | select | active / paused / completed |
| Color | color picker | 10 colores preset |
| Tags | multi-select | Tags existentes en la DB |
| Notas | textarea | Notas internas |

---

### `/services`

Grilla responsiva de servicios externos (1 → 4 columnas).

**Acciones disponibles:**
- Crear, editar, eliminar servicios
- Toggle favorito
- Abrir link externo

**Filtros:**
- Búsqueda por nombre o descripción
- Proveedor (dropdown)
- Tag (botones toggle)

**Campos del formulario de servicio:**

| Campo | Tipo | Notas |
|---|---|---|
| Nombre | text | Obligatorio |
| Proveedor | select | 20 opciones disponibles |
| Link | text | URL del servicio |
| Descripción | textarea | |
| Color | color picker | 10 colores preset |
| Tags | multi-select | Tags existentes en la DB |

**Proveedores disponibles:** Vercel, Railway, Resend, AWS, Supabase, GitHub, Cloudflare, PlanetScale, Neon, Turso, Stripe, Twilio, SendGrid, Fly.io, Render, DigitalOcean, Netlify, Firebase, MongoDB Atlas, Other.

---

### `/tags`

Grilla de tags (1 → 4 columnas).

**Funcionalidades:**
- Crear, editar y eliminar tags
- Cada tag tiene nombre y color (12 colores preset)
- **Borrado en cascada:** al eliminar un tag, se remueve de todos los proyectos y servicios que lo referencian

---

### `/settings`

| Sección | Descripción |
|---|---|
| Estadísticas | Conteo de registros por tabla (proyectos, servicios, tags, relaciones, logs) |
| Exportar | Descarga JSON con todos los datos; el nombre incluye la fecha |
| Importar | Carga un JSON exportado; opera en transacción (limpia y re-inserta) |
| Cambiar contraseña | Verifica contraseña actual, luego aplica nuevo hash + nueva salt |
| Limpiar datos | Borra todas las tablas con confirmación (irreversible) |
| Cerrar sesión | Limpia `localStorage` y redirige a `/login` |

---

## Modelos de datos

```typescript
// src/types/index.ts

interface Project {
  id?: number
  title: string
  description: string
  link: string
  status: 'active' | 'paused' | 'completed'
  tags: number[]       // IDs de Tag
  color?: string       // Hex, ej: "#6366f1"
  createdAt: string    // ISO 8601
  updatedAt: string
  isFavorite?: boolean
  notes?: string
}

interface Service {
  id?: number
  name: string
  provider: string     // Valor de PROVIDERS[]
  link: string
  description: string
  tags: number[]
  color?: string
  isFavorite?: boolean
}

interface Tag {
  id?: number
  name: string
  color: string        // Hex, obligatorio
  createdAt: string
}

interface Relation {
  id?: number
  projectId: number
  serviceId: number
  createdAt: string
}

interface User {
  id?: number
  username: string
  passwordHash: string // PBKDF2-SHA256, hex
  salt: string         // 16 bytes aleatorios, hex
  createdAt: string
}

interface NodePosition {
  id?: number
  entityType: 'project' | 'service'
  entityId: number
  x: number
  y: number
}

interface ActivityLog {
  id?: number
  type: 'project' | 'service' | 'tag' | 'relation'
  action: 'created' | 'updated' | 'deleted'
  entityId: number
  entityName: string
  timestamp: string
}

interface AppSettings {
  id?: number
  theme: 'dark' | 'light'
  sidebarCollapsed: boolean
}
```

---

## Base de datos

Implementada con **Dexie v4** sobre IndexedDB. Nombre de la base: `ManagerDB`.

### Esquema (versión 1)

| Tabla | PK | Índices secundarios |
|---|---|---|
| `users` | `++id` | `username` |
| `projects` | `++id` | `status`, `createdAt`, `isFavorite` |
| `services` | `++id` | `provider`, `isFavorite` |
| `tags` | `++id` | `name` |
| `relations` | `++id` | `projectId`, `serviceId` |
| `activityLogs` | `++id` | `timestamp`, `type` |
| `nodePositions` | `++id` | `[entityType+entityId]` (índice compuesto) |
| `settings` | `++id` | — |

### Helpers (`src/database/db.ts`)

```typescript
// Registra una acción CRUD en el log de actividad
logActivity(type, action, entityId, entityName): Promise<void>

// Obtiene las coordenadas guardadas de un nodo en el tablero
getNodePosition(entityType, entityId): Promise<{ x: number; y: number } | null>

// Guarda o actualiza las coordenadas de un nodo (upsert)
saveNodePosition(entityType, entityId, x, y): Promise<void>
```

### Seed inicial (`src/database/seed.ts`)

Se ejecuta automáticamente en el primer inicio (`db.users.count() === 0`). Inserta:

- 1 usuario (`admin` / `admin123`, hasheado con PBKDF2)
- 7 tags: producción, backend, frontend, email, deploy, personal, cliente
- 4 proyectos: Portal ICAV, API de Notificaciones, Dashboard Analytics, Blog Personal
- 6 servicios: Vercel Production, Railway Backend, Resend Email, Supabase DB, GitHub Repos, Cloudflare CDN
- 11 relaciones proyecto-servicio
- Posiciones iniciales para los 10 nodos del tablero

---

## Estado global

### `authStore` (`src/store/authStore.ts`)

```typescript
interface AuthState {
  username: string | null
  isAuthenticated: boolean
  login(username: string): void   // persiste sesión en localStorage
  logout(): void                  // limpia localStorage y resetea estado
}
```

El estado inicial se resuelve **sincrónicamente** leyendo `localStorage` cuando el módulo se importa por primera vez. Esto garantiza que el primer render ya tenga `isAuthenticated` correcto, sin flash de redirección.

### `uiStore` (`src/store/uiStore.ts`)

```typescript
interface UIState {
  sidebarCollapsed: boolean
  theme: 'dark' | 'light'
  toggleSidebar(): void
  setSidebarCollapsed(collapsed: boolean): void
  setTheme(theme: 'dark' | 'light'): void  // aplica/quita clase 'dark' en <html>
}
```

---

## Componentes

### Layout

**`Sidebar`** — navegación lateral con 5 ítems (Dashboard, Proyectos, Servicios, Tags, Configuración), botón de logout y toggle de colapso. Cuando está colapsado muestra solo íconos con tooltips.

**`Header`** — cabecera de página con título, slot `actions` para contenido adicional por página y badge con el nombre del usuario autenticado.

---

### Comunes

**`TagBadge`** — muestra un tag como chip con el color de fondo del tag. Acepta prop `onRemove` opcional para mostrar un botón ×.

**`StatusBadge`** — badge de estado con colores semánticos: verde (active), amarillo (paused), gris (completed).

**`EmptyState`** — placeholder para listas sin resultados. Props: `icon`, `title`, `description`, `action` (botón opcional).

**`ColorPicker`** — grilla de 10–12 colores preset con checkmark sobre el color seleccionado.

**`ProviderIcon`** — resuelve el nombre de un proveedor a un ícono de Lucide React y un color representativo. Soporta los 20 proveedores disponibles.

---

### Dashboard

**`StatsCards`** — 6 tarjetas con métricas calculadas desde IndexedDB. Renderiza `StatSkeleton` mientras los datos no están disponibles.

**`FlowBoard`** — canvas principal de XY Flow. Usa 5 `useLiveQuery` concurrentes para proyectos, servicios, relaciones, tags y posiciones. Persiste cambios de posición en IndexedDB con `saveNodePosition`.

**`ProjectNode`** — nodo del tablero para proyectos. Muestra barra de color superior, título, `StatusBadge` y los primeros 2 tags.

**`ServiceNode`** — nodo del tablero para servicios. Muestra `ProviderIcon`, nombre del servicio y los primeros 2 tags.

---

### Proyectos

**`ProjectCard`** — tarjeta con barra de color, título, descripción truncada, tags (máx 3 + indicador de más), `StatusBadge` y acciones (favorito, link externo, editar, eliminar, ver detalle).

**`ProjectForm`** — formulario reutilizable para crear y editar proyectos. Valida con Zod. Los tags se seleccionan como chips con `TagBadge` y botón de eliminación.

---

### Servicios

**`ServiceCard`** — tarjeta con `ProviderIcon`, nombre del servicio, descripción, tags (máx 3) y texto del proveedor. Acciones: favorito, link externo, editar, eliminar.

**`ServiceForm`** — formulario reutilizable para crear y editar servicios. Select de proveedor con los 20 proveedores disponibles.

---

### UI (shadcn/ui)

Componentes de bajo nivel construidos sobre Radix UI con estilos de Tailwind:

`Button` `Input` `Label` `Badge` `Card` `CardContent` `Textarea` `Dialog` `AlertDialog` `Select` `Skeleton` `Separator` `Switch` `Tooltip` `TooltipProvider`

---

## Utilidades

### `cn()` — `src/utils/cn.ts`

Combina `clsx` y `tailwind-merge` para resolver conflictos de clases de Tailwind:

```typescript
cn('px-2 px-4')                          // → 'px-4'
cn('bg-red-500', isActive && 'bg-blue-500') // condicional sin conflicto
```

### Crypto — `src/utils/crypto.ts`

Todas las operaciones usan exclusivamente la **Web Crypto API** nativa del navegador.

```typescript
// Genera un salt aleatorio de 16 bytes (devuelve string hex)
generateSalt(): string

// Hashea una contraseña con PBKDF2, SHA-256, 100.000 iteraciones
hashPassword(password: string, salt: string): Promise<string>

// Verifica una contraseña contra su hash almacenado (comparación segura)
verifyPassword(password: string, hash: string, salt: string): Promise<boolean>
```

---

## Configuración

### Path alias

`@/*` resuelve a `src/*`, configurado en `tsconfig.app.json` y `vite.config.ts`:

```typescript
import { db } from '@/database/db'
import { useAuthStore } from '@/store/authStore'
```

### TypeScript

Configuración estricta en `tsconfig.app.json`:
- `noUnusedLocals` / `noUnusedParameters` — sin variables ni parámetros sin usar
- `noFallthroughCasesInSwitch` — todos los cases de switch deben terminar
- `erasableSyntaxOnly` — compatible con el modo erasable de TS 6
- `verbatimModuleSyntax` — imports de tipos explícitos con `import type`

### Tailwind dark mode

Modo `class` — la clase `dark` se aplica al elemento `<html>` al iniciar la app en `App.tsx`. Los colores del tema se definen como variables CSS HSL en `index.css` y se consumen con tokens de Tailwind (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, etc.).

### Variables de entorno

No se requieren variables de entorno. La aplicación no realiza llamadas a APIs externas en producción.
