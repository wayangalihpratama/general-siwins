import { api } from "@/lib/api";
import { BrandingConfig, DashboardConfig } from "@/types/config";

export const configService = {
  getBranding: async (): Promise<BrandingConfig> => {
    const response = await api.get<BrandingConfig>("/config");
    return response.data;
  },
  getDashboard: async (): Promise<DashboardConfig> => {
    const response = await api.get<DashboardConfig>("/dashboard");
    return response.data;
  },
};
