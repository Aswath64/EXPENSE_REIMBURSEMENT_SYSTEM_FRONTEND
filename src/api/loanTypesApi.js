import axiosClient from './axiosClient';

export const getLoanTypes = () => axiosClient.get('/loantypes').then(r => r.data);
export const createLoanType = (payload) => axiosClient.post('/loantypes', payload).then(r => r.data);
export const deleteLoanType = (id) => axiosClient.delete(`/loantypes/${id}`).then(r => r.data);
