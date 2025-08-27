import axiosClient from './axiosClient';

export const createApplication = (payload) => axiosClient.post('/applications/post', payload).then(r => r.data);
export const getApplications = (status) => axiosClient.get('/applications', { params: status ? { status } : {} }).then(r => r.data);
export const getApplicationById = (id) => axiosClient.get(`/applications/${id}`).then(r => r.data);
export const updateApplicationStatus = (id, status, rejectionReason) =>
  axiosClient.put(`/applications/${id}/status`, { status, rejectionReason }).then(r => r.data);

