import axios from 'axios';

// base URL for your backend API
const API_URL = 'http://localhost:5000/api';

export const createBoard = async (boardData) => {
  try {
    const response = await axios.post(`${API_URL}/boards/create`, boardData);
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
};
export const createList = async (listData) => {
  try {
    const response = await axios.post(`${API_URL}/lists/create`, listData);
    return response.data;
  } catch (error) {
    console.error('Error creating list:', error);
    throw error;
  }
};
export const createCard = async (cardData) => {
  try {
    const response = await axios.post(`${API_URL}/cards/create`, cardData);
    return response.data;
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
};


