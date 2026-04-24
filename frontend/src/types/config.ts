export interface ThemeConfig {
  primary_color: string;
  secondary_color: string;
  logo_url: string;
}

export interface GISConfig {
  center: [number, number];
  zoom: number;
  topojson: string;
}

export interface BrandingConfig {
  clientName: string;
  instanceName: string;
  theme: ThemeConfig;
  gis: GISConfig;
}

export interface DashboardItem {
  id: string;
  title: string;
  type: string;
  [key: string]: any;
}

export interface DashboardTab {
  component: string;
  selected: boolean;
  chartList: DashboardItem[];
}

export interface DashboardConfig {
  tabs: DashboardTab[];
}
