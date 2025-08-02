import { apiRequest } from "./queryClient";

export interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  uvIndex: number;
  rainProbability: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
}

export interface ClimateRisk {
  temperature: {
    value: number;
    risk: 'low' | 'moderate' | 'high' | 'extreme';
    description: string;
  };
  rain: {
    probability: number;
    risk: 'low' | 'moderate' | 'high' | 'extreme';
    description: string;
  };
  uv: {
    index: number;
    risk: 'low' | 'moderate' | 'high' | 'extreme';
    description: string;
  };
  aqi: {
    value: number;
    risk: 'low' | 'moderate' | 'high' | 'extreme';
    description: string;
  };
}

export interface AISuggestion {
  id: string;
  type: 'energy' | 'health' | 'safety' | 'timing' | 'general';
  title: string;
  content: string;
  icon: string;
}

export interface ForecastData {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  data: Array<{
    date: string;
    temperature: number;
    description: string;
  }>;
  confidence: number;
}

export interface SimulationResult {
  impact: string;
  recommendations: string[];
  healthRisks: string[];
}

export const weatherApi = {
  getLocation: async (): Promise<LocationData> => {
    const response = await apiRequest("GET", "/api/location");
    return response.json();
  },

  getWeather: async (lat: number, lon: number): Promise<{ weather: WeatherData; risks: ClimateRisk }> => {
    const response = await apiRequest("GET", `/api/weather?lat=${lat}&lon=${lon}`);
    return response.json();
  },

  getAISuggestions: async (profile: any, weather: WeatherData): Promise<AISuggestion[]> => {
    const response = await apiRequest("POST", "/api/ai/suggestions", { profile, weather });
    return response.json();
  },

  getForecast: async (lat: number, lon: number, period: string): Promise<ForecastData> => {
    const response = await apiRequest("GET", `/api/forecast?lat=${lat}&lon=${lon}&period=${period}`);
    return response.json();
  },

  runSimulation: async (input: any, profile: any, weather: WeatherData): Promise<SimulationResult> => {
    const response = await apiRequest("POST", "/api/simulate", { input, profile, weather });
    return response.json();
  },
};
