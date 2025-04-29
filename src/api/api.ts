const BASE_URL = (import.meta as any).env.VITE_API_BASE_URL;

const api = {
  post: async (endpoint: string, body: any) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Виникла помилка!');
    }

    return response;
  },

  get: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Виникла помилка!');
    }

    return response;
  },
};

export default api;
