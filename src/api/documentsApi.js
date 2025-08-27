import axiosClient from './axiosClient';

// Document metadata creation (expects file uploaded separately and fileUrl provided)
// Or change to multipart upload if implementing file sending to backend
export const createDocument = (payload) => axiosClient.post('/documents', payload).then(r => r.data);
export const getDocument = (id) => axiosClient.get(`/documents/${id}`).then(r => r.data);
export const deleteDocument = (id) => axiosClient.delete(`/documents/${id}`).then(r => r.data);
