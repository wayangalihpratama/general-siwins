import { create } from "zustand";
import { BrandingConfig, DashboardConfig } from "@/types/config";
import { configService } from "@/services/configService";

interface ConfigState {
  branding: BrandingConfig | null;
  dashboard: DashboardConfig | null;
  isLoading: boolean;
  error: string | null;
  fetchConfig: () => Promise<void>;
}

export const useConfigStore = create<ConfigState>((set) => ({
  branding: null,
  dashboard: null,
  isLoading: false,
  error: null,
  fetchConfig: async () => {
    set({ isLoading: true, error: null });
    try {
      const [branding, dashboard] = await Promise.all([
        configService.getBranding(),
        configService.getDashboard(),
      ]);
      set({ branding, dashboard, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch configuration", isLoading: false });
    }
  },
}));
