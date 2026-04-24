# Gen-SIWINS: Generalized SIWINS Platform

Gen-SIWINS is a config-driven, multi-tenant monitoring and evaluation platform based on the SIWINS (Solomon Islands WASH in Schools) core. It features a modern **Next.js 16** frontend and a **FastAPI** backend, designed to be easily re-branded and re-configured for any region or sector by simply updating a single configuration volume.

## 🚀 Key Features

- **Config-First Architecture**: Branding, dashboard layouts, GIS settings, and domain logic are entirely decoupled from the source code.
- **Modern Tech Stack**:
  - **Frontend**: Next.js 16 (App Router), Tailwind CSS v4, Zustand.
  - **Backend**: FastAPI, SQLAlchemy, Alembic (PostgreSQL).
- **High Performance**: Optimized for fast interactive charts (ECharts) and geospatial exploration (Leaflet).
- **Dockerized Workflow**: Seamless development and production environments using standard Docker orchestration.

## 📂 Configuration Volume

The platform's logic and aesthetics are controlled via the `./config` directory.

```text
config/
├── branding.json       # Theme colors, logos, and instance name
├── dashboard.json      # Tab definitions and chart configurations
├── mapping.json        # Question IDs and administrative level mappings
├── forms.json          # Questionnaire definitions
├── forms/              # Individual form JSON definitions
├── geo/                # TopoJSON maps and GIS assets
└── administration/     # Administrative boundaries and geolocations
```

## 🛠️ Getting Started

### 1. Requirements

- Docker & Docker Compose
- Node.js 22+ (for local frontend development)
- Python 3.12+ (for local backend development)

### 2. Environment Setup

Copy the template environment file:
```bash
cp env.template .env
```

### 3. Launch the Platform

Start all services (Frontend, Backend, Database):
```bash
./dc.sh up -d
```

Access the platform at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

### 4. Database Seeding

To populate the system with Solomon Islands test data:

```bash
./dc.sh exec backend bash fake_seed.sh
```

## 🧪 Development Workflow

- **Backend Commands**: Use `./dc.sh exec backend <command>`
- **Frontend Commands**: Use `./dc.sh exec frontend <command>`
- **Migrations**: Database migrations run automatically on backend startup via Alembic.

## 📖 Documentation

Detailed architectural notes and implementation details can be found in:
- [docs/LLD.md](docs/LLD.md) - Low-Level Design and Schema Definitions.
- [agent_docs/sprint-plan.md](agent_docs/sprint-plan.md) - Current sprint status and roadmap.

## 📄 License

This project is licensed under the terms provided in the [LICENSE](LICENSE) file.
