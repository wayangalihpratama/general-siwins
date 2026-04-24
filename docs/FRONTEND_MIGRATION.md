# Feature Specification: Frontend Migration (Legacy to Gen-SIWINS)

## 1. Overview
The goal is to migrate all functional features from the legacy React frontend (`frontend_old`) to the new Next.js 15 + Tailwind v4 "Gen-SIWINS" frontend. The new frontend must maintain a premium aesthetic, utilize the config-driven architecture, and ensure full feature parity.

## 2. Feature Parity Requirements

### 2.1. Dashboard Overview
- **Requirement**: Render all charts defined in `dashboard.json`.
- **Legacy Pattern**: `Dashboard.jsx` fetches data from `/api/chart/jmp-data` and `/api/chart/generic-bar`.
- **New Implementation**:
    - Use `ECharts` for visualization.
    - Fetch data via `dataService.ts`.
    - Support JMP (Joint Monitoring Programme) specific visualizations.

### 2.2. Database (Manage Data)
- **Requirement**: A robust table for browsing submissions.
- **Legacy Pattern**: `ManageData.jsx` using Ant Design Table with expandable rows.
- **New Implementation**:
    - Route: `/dashboard/database`.
    - Component: High-fidelity custom table using Tailwind v4.
    - Server-side pagination and filtering.
    - Expandable rows showing submission details (grouped by category).

### 2.3. Interactive Maps
- **Requirement**: Map-based visualization of schools.
- **Legacy Pattern**: `Maps.jsx` with Leaflet/Custom Map component.
- **New Implementation**:
    - Route: `/dashboard/maps`.
    - Feature: School search, category filtering, and visible data export.
    - GIS settings driven by `branding.json`.

### 2.4. Global Filtering
- **Requirement**: A unified sidebar/top-bar filter for Province and School Type.
- **Legacy Pattern**: `AdvanceFilter.jsx` synced via `UIState`.
- **New Implementation**:
    - Use `useConfigStore` and a new `useFilterStore` (Zustand).
    - Persistent filter state across navigation.

### 2.5. Export Functionality
- **Requirement**: Export submissions to CSV/Excel.
- **Legacy Pattern**: `Exports.jsx` calls `/api/download/data`.
- **New Implementation**:
    - Integration with backend export endpoints.
    - Toast notifications for export status.

## 3. Technical Constraints
- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS v4 (CSS-First).
- **State**: Zustand.
- **Charts**: Apache ECharts.
- **API**: Proxied via Next.js to FastAPI backend.

## 4. Acceptance Criteria
- [ ] Home page renders with correct branding.
- [ ] Dashboard renders JMP and Generic charts from config.
- [ ] Database page displays submissions with pagination.
- [ ] Submission detail view shows all answers correctly.
- [ ] Map page plots schools and supports searching.
- [ ] Filters (Province/Type) update all views correctly.
- [ ] Export functionality works for filtered data.
