// src/types/weather.ts

// Interface da Previsão Diária (o que nos interessa no array 'daily')
export interface DailyForecast {
    dt: number; // Timestamp do dia
    temp: {
        min: number;
        max: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
}

// Interface principal do Clima Atual (que você já usa)
export interface WeatherData {
  name: string;
  coord: {
    lat: number; // Latitude - ESSENCIAL para a próxima busca
    lon: number; // Longitude - ESSENCIAL para a próxima busca
  };
  main: {
    pressure: any;
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number; 
  };
  sys: {
    country: string; 
  }
}

// Interface que o novo hook vai retornar
export interface ForecastData {
    daily: DailyForecast[];
}
