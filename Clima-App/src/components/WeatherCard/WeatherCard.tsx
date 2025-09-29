import React, { useState } from 'react';
import type { FormEvent } from 'react'; 
import styles from './WeatherCard.module.css';
import { useWeather } from '../../hooks/useWeather'; 

const WeatherCard: React.FC = () => {
    // Estado para a cidade atual que está sendo exibida (inicia a busca)
    const [city, setCity] = useState<string>('Indaiatuba, BR');
    // Estado para o texto que o usuário está digitando
    const [inputCity, setInputCity] = useState<string>(''); 
    
    // 1. CLIMA ATUAL: Desestrutura o setError
    const { 
        data, 
        loading, 
        error, 
        setError // AGORA ESTÁ SENDO DESESTRUTURADO
    } = useWeather(city); 

    const handleSubmit = (e: FormEvent) => { 
        e.preventDefault(); 
        
        // 🚨 O PONTO CRÍTICO: Limpa o erro anterior antes de tentar uma nova busca
        if (setError) { // Verifica se a função existe (se o hook retornou)
            setError(null);
        }

        if (inputCity.trim() !== '' && inputCity.trim().toLowerCase() !== city.trim().toLowerCase()) {
            setCity(inputCity);
            setInputCity(''); 
        }
    };

    // --- TRATAMENTO DE ESTADOS GERAL ---
    if (loading && !data) { 
        return (
            <div className={styles.cardContainer}>
                <p className={styles.loadingText}>Carregando dados do clima...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.cardContainer}>
                <p className={styles.errorText}>Erro ao buscar dados: {error}</p>
                <p className={styles.errorTextSmall}>Tente digitar outro nome e buscar novamente.</p>
                {/* FORMULÁRIO DE RECUPERAÇÃO DE ERRO */}
                <form onSubmit={handleSubmit} className={styles.searchBar}>
                    <input 
                        type="text" 
                        placeholder="Nome da cidade..." 
                        className={styles.cityInput} // Use a classe normal para o input
                        value={inputCity}
                        onChange={(e) => setInputCity(e.target.value)} 
                    />
                    <button type="submit" className={styles.searchButton} disabled={inputCity.trim() === ''}>
                        Tentar
                    </button>
                </form>
            </div>
        );
    }

    if (!data) {
        return null; 
    }

    // --- PREPARAÇÃO DE DADOS ---
    
    // Dados do clima atual
    const temperature = Math.round(data.main.temp); 
    const description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    const windSpeed = (data.wind.speed * 3.6).toFixed(1); // Ajuste para 1 casa decimal
    const tempMin = Math.round(data.main.temp_min);
    const tempMax = Math.round(data.main.temp_max);
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const iconCode = data.weather[0].icon; 
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    return (
        <div className={styles.cardContainer}>
            {/* 1. Área de Busca: FORMULÁRIO PRINCIPAL */}
            <form onSubmit={handleSubmit} className={styles.searchBar}>
                <input 
                    type="text" 
                    placeholder="Buscar nova cidade..." 
                    className={styles.cityInput} 
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)} 
                    disabled={loading}
                />
                <button 
                    type="submit" 
                    className={styles.searchButton} 
                    disabled={loading || inputCity.trim() === ''}
                >
                    🔍
                </button>
            </form>

            {/* Conteúdo Principal do Clima */}
            <div className={styles.mainContent}>
                <div className={styles.weatherIcon}>
                    <img src={iconUrl} alt={description} className={styles.iconImage} />
                </div>

                <h1 className={styles.temperature}>{temperature}°C</h1>
                <p className={styles.location}>{data.name}, {data.sys.country}</p> 

                {/* Detalhes (6 Itens) */}
                <div className={styles.detailsGrid}>
                    <div>
                        <span className={styles.detailLabel}>Mín</span>
                        <p className={styles.detailValue}>{tempMin}°C</p>
                    </div>
                    <div>
                        <span className={styles.detailLabel}>Máx</span>
                        <p className={styles.detailValue}>{tempMax}°C</p>
                    </div>
                    <div>
                        <span className={styles.detailLabel}>Vento</span>
                        <p className={styles.detailValue}>{windSpeed} km/h</p>
                    </div>
                    <div>
                        <span className={styles.detailLabel}>Umidade</span>
                        <p className={styles.detailValue}>{humidity}%</p>
                    </div>
                    <div>
                        <span className={styles.detailLabel}>Pressão</span>
                        <p className={styles.detailValue}>{pressure} hPa</p>
                    </div>
                    <div>
                        <span className={styles.detailLabel}>Descrição</span>
                        <p className={styles.detailValue}>{description}</p>
                    </div>
                </div>
            </div>
            
            <p className={styles.footerText}>DanielBritoSJunior</p>
        </div>
    );
};

export default WeatherCard;
