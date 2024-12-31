import axios from 'axios';

const BASE_URL = 'http://localhost:2000/api/button';

export interface ButtonActionRequest {
  actionType: string;
  buttonId: string;
  userId?: string;
  additionalData?: string;
}

export const buttonApi = {
  async handleButtonAction(request: ButtonActionRequest) {
    try {
      const response = await axios.post(`${BASE_URL}/action`, request, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to process button action');
    }
  },

  async getButtonState(buttonId: string) {
    try {
      const response = await axios.get(`${BASE_URL}/state/${buttonId}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get button state');
    }
  }
};