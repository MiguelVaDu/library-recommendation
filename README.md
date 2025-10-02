# BookMark – Recomendador de Libros

Descubre lecturas alineadas con tu estado de ánimo, intereses y contexto. El sistema genera recomendaciones combinando ubicación/escenario, géneros, moods, años y popularidad, enviándolos a un backend que responde con libros sugeridos.

## 🚀 Características principales

- Multi–selección por categorías (ubicaciones, géneros, moods, años)
- Validación antes de enviar (no permite campos vacíos obligatorios)
- Backend integrado (`/recommend`) con payload JSON
- Sin mocks silenciosos en producción (errores visibles si falla el backend)
- UI responsive: chips, botones fluidos y hero adaptable
- Accesibilidad básica: focus visible, estructura semántica
- Tema tipográfico (Inter + Poppins) y cabecera con marca personalizada
- Código modular (hooks, services, components, constants, types)

## 🧩 Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Astro |
| UI/Islas | React 19 |
| Estilos | Tailwind + utilidades en `global.css` |
| Tipografías | Google Fonts (Inter & Poppins) |
| Backend | Endpoint externo `/recommend` |
| Lenguaje | TypeScript |

## 📁 Estructura de carpetas

```text
.
├── public/
│   ├── library.svg          # Favicon e icono principal
│   ├── LogoLib.png          # Logo de marca
│   └── Book.mp4             # Video de fondo (blur)
├── src/
│   ├── components/
│   │   ├── FiltersForm.tsx      # Formulario principal con validación
│   │   ├── ResultsGrid.tsx      # Grilla de resultados
│   │   ├── BookCard.tsx         # Tarjeta de libro
│   │   ├── EmptyState.tsx       # Estado vacío
│   │   └── ui/                  # Componentes UI atómicos
│   ├── constants/
│   │   └── Values.ts            # Listas de datos para filtros
│   ├── hooks/
│   │   └── useRecommendations.ts
│   ├── layouts/
│   │   └── BaseLayout.astro     # Layout global
│   ├── pages/
│   │   ├── index.astro          # Landing
│   │   └── recommendation/
│   │       └── sistemform.astro # Página del formulario
│   ├── services/
│   │   └── api.ts               # Cliente HTTP
│   ├── styles/
│   │   └── global.css           # Tema y utilidades
│   └── types/
│       └── index.ts             # Tipos compartidos
├── astro.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

## 🔌 Endpoint backend esperado

```
POST /recommend
Content-Type: application/json

{
	"location": ["Biblioteca","Oficina"],
	"genre": ["Fantasía","Negocios"],
	"mood": ["Inspirador","Mágico"],
	"year": [2000,1990],
	"popularity": 8.7
}
```

Respuesta mínima compatible:

```json
{
	"results": [
		{ "title": "Título del Libro", "author": "Autor", "img": "https://..." }
	]
}
```

Claves alternativas aceptadas: `autor` (en lugar de `author`).

## 🧪 Validación de formulario

- Requiere al menos 1 selección en: ubicaciones, géneros, moods, años
- Popularidad acepta número (slider/input)
- Errores: borde resaltado + mensaje global

## � Tipos principales (`src/types/index.ts`)

```ts
export type Props = {
	locations: string[];
	genres: string[];
	moods: string[];
	years: number[];
	popularity: number;
};

export type Book = {
	title: string;
	author: string;
	img?: string;
};
```

## 🔧 Instalación y ejecución

```bash
npm install
npm run dev
# Abrir: http://localhost:4321
```

Build producción:

```bash
npm run build
npm run preview
```

## 🌱 Variables de entorno

Crear `.env`:

```
PUBLIC_API_BASE_URL= ""
PUBLIC_API_RECOMMEND_PATH= ""
```

## 🎨 Personalización rápida

| Elemento | Dónde cambiar |
|----------|---------------|
| Listas de filtros | `constants/Values.ts` |
| Lógica fetch | `services/api.ts` |
| Estilos chips/botones | `styles/global.css` |
| Fuentes | `<head>` en `BaseLayout.astro` |
| Marca / Header | `BaseLayout.astro` |

## 🛡️ Errores y manejo

| Situación | Comportamiento |
|-----------|----------------|
| Sin backend configurado | Lanza error explícito |
| 404 / 500 backend | Error mostrado en UI |
| Respuesta con `recommendations` / `data` / `books` | Se normaliza a `results` |

## ♿ Accesibilidad

- Focus visible en elementos interactivos
- Contraste mejorado en cabecera y hero
- Posible mejora futura: conectar con Google Books API o Open Library API

## 📦 Scripts útiles

| Script | Uso |
|--------|-----|
| `npm run dev` | Desarrollo |
| `npm run build` | Compilar producción |
| `npm run preview` | Servir build local |



