import axiosInstance from './Axios';

const controller = '/Transaction/';

export async function getTransactionHistory() {
    return await axiosInstance.get(controller + `GetTransactionHistory`);
};

export async function getTransactionById(id) {
    return await axiosInstance.get(controller + `GetTransactionById?id=` + id);
};

export async function sendTransaction(connectId, data) {
    return await axiosInstance.post(controller + 'SendTransaction?connectId=' + connectId, data);
}

export async function getFee() {
    return await axiosInstance.get(controller + `GetFee`, { responseType: 'text' });
};