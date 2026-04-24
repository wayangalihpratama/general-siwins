import { api } from "@/lib/api";

export const dataService = {
  getProvinces: async () => {
    const response = await api.get("/cascade/school_information", {
      params: { level: "province" },
    });
    return response.data;
  },

  getSchoolTypes: async () => {
    const response = await api.get("/cascade/school_information", {
      params: { level: "school_type" },
    });
    return response.data;
  },

  getMonitoringRounds: async () => {
    const response = await api.get("/option/monitoring_round");
    return response.data;
  },

  getJMPData: async (path: string, filters: any) => {
    const response = await api.get(`/chart/jmp-data/${path}`, {
      params: filters,
    });
    return response.data;
  },

  getGenericBarData: async (indicatorId: string, filters: any) => {
    const response = await api.get(`/chart/generic-bar/${indicatorId}`, {
      params: filters,
    });
    return response.data;
  },

  getSubmissions: async (params: {
    page?: number;
    perpage?: number;
    monitoring_round?: number;
    prov?: string[];
    sctype?: string[];
    q?: string[];
    search?: string;
  }) => {
    const response = await api.get("/data", { params });
    return response.data;
  },

  getSubmissionDetail: async (dataId: number) => {
    const response = await api.get(`/data/${dataId}`);
    return response.data;
  },

  getMapData: async (indicator: string, filters: any) => {
    const response = await api.get("/data/maps", {
      params: { indicator, ...filters },
    });
    return response.data;
  },

  requestExport: async (filters: any) => {
    const response = await api.get("/download/data", { params: filters });
    return response.data;
  },

  getExportList: async (page = 1) => {
    const response = await api.get("/download/list", { params: { page } });
    return response.data;
  },

  getExportStatus: async (id: number) => {
    const response = await api.get("/download/status", { params: { id } });
    return response.data;
  },

  getExportFile: async (filename: string) => {
    const response = await api.get(`/download/file/${filename}`, {
      responseType: "blob",
    });
    return response;
  },
};
