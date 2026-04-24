import axios from "axios";
import { BrandingConfig, DashboardConfig } from "@/types/config";

const isServer = typeof window === "undefined";
const baseURL = isServer ? "http://backend:8000" : "/api";

const api = axios.create({
  baseURL,
});

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
