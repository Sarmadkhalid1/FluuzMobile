import axiosInstance from './Axios';

const controller = '/Organization/'

export async function addOrganization(data) {
    return await axiosInstance.post(controller + 'AddOrganization', data);
};