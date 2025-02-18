import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getInvestments = async () => {
    const response = await axios.get(`${API_URL}/investments`);
    return response.data;
};

export const createInvestment = async (investment) => {
    const response = await axios.post(`${API_URL}/investments`, investment);
    return response.data;
};

export const updateInvestment = async (id, investment) => {
    const response = await axios.put(`${API_URL}/investments/${id}`, investment);
    return response.data;
};

export const deleteInvestment = async (id) => {
    const response = await axios.delete(`${API_URL}/investments/${id}`);
    return response.data;
};