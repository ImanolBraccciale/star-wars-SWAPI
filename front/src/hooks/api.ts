// URL base de tu API
const BASE_URL = "http://localhost:4000";

// Función para hacer peticiones a la API
const fetchFromAPI = async (endpoint: string, method = "GET", queryParams?: Record<string, string>) => {
    try {
        // Crear cadena de consulta si hay parámetros
        const queryString = queryParams ? `?${new URLSearchParams(queryParams)}` : '';
         
        // Las options
        const options: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };
        
        // Petición dinámica
        const response = await fetch(`${BASE_URL}/${endpoint}${queryString}`, options);
        console.log(response);
        
        // Error
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// Peticiones dinámicas simples con filtros
export const getPeople = (filters?: Record<string, string>) => fetchFromAPI("people", "GET", filters);
export const getStarships = (filters?: Record<string, string>) => fetchFromAPI("starships", "GET", filters);
export const getPlanets = (filters?: Record<string, string>) => fetchFromAPI("planets", "GET", filters);
export const getFilms = (filters?: Record<string, string>) => fetchFromAPI("films", "GET", filters);
