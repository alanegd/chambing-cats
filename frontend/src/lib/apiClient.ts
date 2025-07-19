// src/lib/apiClient.ts

// Lee la URL base de la API desde las variables de entorno.
// import.meta.env.VITE_API_BASE_URL es para proyectos con Vite.
// Si usas Create React App, sería process.env.REACT_APP_API_BASE_URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("La variable de entorno VITE_API_BASE_URL no está definida. Por favor, créala en tu archivo .env");
}

/**
 * Realiza una petición a la API de forma estandarizada.
 * @param endpoint - El endpoint al que se va a llamar (ej. '/posts').
 * @param options - Opciones de la petición fetch (method, headers, body, etc.).
 * @returns La respuesta de la API en formato JSON.
 */
async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Aquí podrías añadir cabeceras de autenticación en el futuro
    // 'Authorization': `Bearer ${getToken()}`,
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      // Si la respuesta no es exitosa, intenta parsear el error del cuerpo
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    // Si el método es DELETE o la respuesta no tiene contenido, devuelve un objeto vacío
    if (response.status === 204 || options.method === 'DELETE') {
        return {} as T;
    }

    return await response.json() as T;
  } catch (error) {
    console.error('Error en la llamada a la API:', error);
    // Re-lanza el error para que el código que llama pueda manejarlo
    throw error;
  }
}

export default apiClient;
