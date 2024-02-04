const productionBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

interface Environment {
  baseUrl: string;
}

export const environment: Environment = {
  baseUrl: productionBaseUrl
};
