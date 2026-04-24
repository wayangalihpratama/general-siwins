# Low-Level Design (LLD): Gen-SIWINS

## 1. System Architecture
Gen-SIWINS follows a config-driven architecture where application behavior and aesthetics are decoupled from the core logic and stored in an external `config/` volume.

### 1.1. Directory Structure
```text
config/
├── branding.json       # Branding, colors, and GIS settings
├── dashboard.json      # Dashboard layout and chart definitions
├── mapping.json        # Domain mapping (Question IDs, Cascades, etc.)
├── forms.json          # Questionnaire definition
├── geo/                # GeoJSON/TopoJSON files
└── assets/             # Client-specific logos and images
```

## 2. Configuration Schema

### 2.1. `branding.json`
```json
{
  "clientName": "Solomon Islands WASH in Schools",
  "instanceName": "Solomon Islands",
  "theme": {
    "primary_color": "#005a9c",
    "secondary_color": "#f1c40f"
  },
  "gis": {
    "center": [-9.6, 160.1],
    "zoom": 6,
    "topojson": "/api/geo/solomon-island-topojson.json"
  }
}
```

## 3. Backend Implementation (FastAPI)

### 3.1. Routing Strategy
The backend utilizes a prefix-less internal routing structure to allow maximum flexibility behind proxies.
- **Prefixes**: Managed at the application inclusion level (`app.include_router(..., prefix="/api")`).
- **Endpoints**:
  - `GET /api/config`: Branding and global settings.
  - `GET /api/dashboard`: Dashboard layout.
  - `GET /api/geo/{filename}`: GIS assets.
  - `GET /api/download/list`: Export job history.
  - `GET /api/download/status?id={id}`: Job status tracking.
  - `GET /api/download/data`: Trigger new async export.
  - `GET /api/download/file/{filename}`: Retrieve generated file.

### 3.2. Configuration Service
- Loads JSON files from the `/app/config` volume.
### 3.3. Asynchronous Export System
- **Worker**: Uses FastAPI `BackgroundTasks` for asynchronous Excel generation.
- **Jobs Engine**: Tracked via a SQLite/PostgreSQL `jobs` table with statuses: `Pending`, `in Progress`, `Done`, `Failed`.
- **Concurrency**: Managed at the thread level; generator tasks use fresh DB sessions to prevent lifecycle conflicts.

### 3.4. Storage System
The backend supports a tiered storage approach:
- **Production**: Google Cloud Storage (GCS) for high-availability assets.
- **Local/Development**: Fallback to local filesystem storage via the `STORAGE_LOCATION` environment variable (e.g., `./tmp/fake-storage`).

## 4. Frontend Implementation (Next.js 16 + Tailwind v4)

### 4.1. Docker Networking & Proxying
To support seamless integration within Docker and production environments:
- **Client-side**: `next.config.ts` proxies `/api/:path*` to `http://backend:8000/:path*`, stripping the `/api` prefix for the backend.
- **Server-side (SSR)**: Services detect the execution environment. On the server, they hit the backend directly via `http://backend:8000` to avoid DNS/proxy overhead.

### 4.2. State Management (Zustand)
- `useConfigStore`: Hydrates from the `/api/config` endpoint.
- `useDashboardStore`: Manages dashboard state and chart metrics.

### 4.3. Styling (Tailwind v4)
- **CSS-First**: Configuration resides in `globals.css` using the `@theme` directive.
- **Dynamic Theming**: CSS variables are injected into `:root` based on the configuration derived from the backend.

## 5. Deployment (Docker)
- **Multi-stage Builds**: Frontend uses a production build to ensure native binary compatibility (`lightningcss`).
- **Standardized Networking**: Services communicate via standard Docker service names (e.g., `db`, `backend`).
