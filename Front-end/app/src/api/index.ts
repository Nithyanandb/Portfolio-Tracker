export const fetchIndexData = async (symbol: string) => {
  // Implement your API call here
  // This is a placeholder implementation
  const response = await fetch(`/api/index/${symbol}`);
  if (!response.ok) {
    throw new Error('Failed to fetch index data');
  }
  return response.json();
};
