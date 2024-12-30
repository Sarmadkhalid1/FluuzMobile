import axiosInstance from './Axios';

const controller = '/Recipient/'

export async function addRecipient(data) {
    return await axiosInstance.post(controller + 'AddRecipient', data);
};

export async function getAllRecipients(countryCode) {
    return await axiosInstance.get(controller + `GetAllRecipients?countryCode=` + countryCode);
};

export async function getRecipientByConnectId(connectId) {
    return await axiosInstance.get(controller + `GetRecipientByConnectId?connectId=` + connectId);
};

export async function getRecipientById(id) {
    return await axiosInstance.get(controller + `GetRecipientById?id=` + id);
};