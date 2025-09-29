import { useState, useEffect } from 'react';
import type { WeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const useWeather = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Limpa erros anteriores ao iniciar nova busca

      if (!API_KEY) {
        setError('Chave de API não configurada. Verifique suas variáveis de ambiente.');
        setLoading(false);
        return;
      }

      const encodedCity = encodeURIComponent(city);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric&lang=pt_br`;

      try {
        const response = await fetch(url );
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Erro 401: Chave de API inválida ou não autorizada. Verifique sua chave.');
          } else if (response.status === 404) {
            throw new Error(`Erro 404: Cidade "${city}" não encontrada. Tente outro nome.`);
          } else {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
          }
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchData();
    }
  }, [city, API_KEY]); // Adicionado API_KEY como dependência para re-executar se mudar

  return { data, loading, error, setError }; 
};