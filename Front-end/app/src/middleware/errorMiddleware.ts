import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return message;
  }
  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  toast.error(message);
  return message;
}; 