# Low-Level Design (LLD): Gen-SIWINS

## 1. System Architecture
Gen-SIWINS follows a micro-frontend/backend pattern where the configuration is externalized from the application logic.

### 1.1. Directory Structure
We will adopt a standardized root-level configuration directory:

```text
config/
├── branding.json       # Branding, colors, and links
├── dashboard.json      # Dashboard layout and chart definitions
├── forms.json          # Questionnaire definition
├── geo/                # GeoJSON/TopoJSON files
└── assets/             # Logos and other images
```

## 2. Configuration Schema

### 2.1. `config.json`
```json
{
  "client_name": "Solomon Islands",
  "logo_url": "/assets/logo.png",
  "primary_color": "#005a87",
  "secondary_color": "#facc04",
  "map_settings": {
    "center": [-9.445, 159.972],
    "zoom": 6,
    "topojson": "solomon-island-topojson.json"
  }
}
```

### 2.2. `dashboard.json`
Defines the tabs and charts. Charts will reference "calculation keys" (e.g., `jmp`) or direct question IDs.

## 3. Backend Components

### 3.1. `ConfigService`
A service in the backend responsible for loading the local configuration.
- **Loading**: Reads JSON files from the root `./config/` directory.

### 3.2. `ConfigRouter`
Exposes endpoints for the frontend:
- `GET /api/v1/config`: Returns branding and global settings.
- `GET /api/v1/dashboard`: Returns the dashboard layout.
- `GET /api/v1/geo/{filename}`: Serves GIS files.

### 3.3. Local Seeder
The seeder will look for `./config/forms.json` by default.

## 4. Frontend Components (Next.js 16 + Zustand + Tailwind)

### 4.1. Core Stack
- **Framework**: Next.js 16 (App Router).
- **Styling**: Tailwind CSS v4 (Mobile-First Design).
- **State Management**: Zustand.
- **Data Fetching**: React Server Components (RSC).

### 4.2. Styling Strategy (Tailwind v4)
- **CSS-First Configuration**: We will use Tailwind v4's CSS-based configuration (no `tailwind.config.js`). All theme extensions and variables will be defined using the `@theme` directive in `globals.css`.
- **Mobile-First**: Responsive design by default, utilizing v4's optimized engine.
- **Dynamic Theming**: Native CSS variable support in v4 will be used to inject client branding (`--color-primary`, etc.) dynamically.

### 4.3. State Management (Zustand)
We will implement dedicated stores:
- `useConfigStore`: Stores branding, client settings, and GIS metadata.
- `useDashboardStore`: Manages active tabs, filters, and chart data.

### 4.3. Component Classification
- **Server Components**: Layout, Header (static parts), Initial Page Loads.
- **Client Components**: Interactive Charts (ECharts/Leaflet), Filter Panels, Dynamic Themes.

### 4.4. `DynamicTheme`
A Next.js Client Component that injects CSS variables into the root `:root` based on the Zustand `useConfigStore` state.
