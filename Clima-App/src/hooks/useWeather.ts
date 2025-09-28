import { useState, useEffect } from 'react';
import type { WeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const useWeather = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // <<< Estado de erro

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;

    const fetchData = async () => {
      setLoading(true);
      // NÃO LIMPE O ERRO AQUI! O WeatherCard fará isso no handleSubmit.

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro: Cidade "${city}" não encontrada. Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null); // Limpa o erro se a busca for bem-sucedida
      } catch (err) {
        // Define o novo erro se a busca falhar
        setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
        setData(null); // Garante que os dados antigos sumam
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchData();
    }
  }, [city]);

  // RETORNA O SET ERROR para que o componente principal possa limpá-lo
  return { data, loading, error, setError }; 
};
