export const API_CONFIG = {
  BASE_URL: 'https://your-api-base-url.com',
  CACHE_DURATION: 30000, // 30 seconds

  getEndpointUrl(endpoint: string): string {
    return `${this.BASE_URL}/api/${endpoint}`;
  }
}; 