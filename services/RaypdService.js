import axiosInstance from './Axios';

const controller = '/Rapyd/'

export async function getDailyRates(senderCurrency, receiverCurrency) {
    return await axiosInstance.get(controller + 'GetDailyRates?senderCurrency=' + senderCurrency + '&receiverCurrency=' + receiverCurrency);
};

export async function checkAnyPayoutAvailable(receiverCurrency, receiverCountry) {
    return await axiosInstance.get(controller + 'CheckAnyPayoutAvailable?receiverCurrency=' + receiverCurrency + '&receiverCountry=' + receiverCountry);
};

export async function getBeneficiaryCreateSession(senderCountry, receiverCountry, redirectUrl) {
    return await axiosInstance.get(controller + 'GetBeneficiaryCreateSession?senderCountry=' + senderCountry + '&receiverCountry=' + receiverCountry + '&redirectUrl=' + encodeURI(redirectUrl));
};

export async function getBeneficiaries(country, payout_method_type, category) {
    return await axiosInstance.get(controller + `GetBeneficiariesByPayoutMethod?country=${country}&payout_method_type=${payout_method_type}&category=${category}`);
};

export async function GetBeneficiariesByPayoutMethod(country, payout_method_type, category) {
    return await axiosInstance.get(controller + `GetBeneficiariesByPayoutMethod?country=${country}&payout_method_type=${payout_method_type}&category=${category}`);
};

export async function getAllBeneficiaries() {
    return await axiosInstance.get(controller + `GetAllBeneficiaries`);
};

export async function getCardCreateSession(redirectUrl) {
    return await axiosInstance.get(controller + 'GetCardCreateSession?redirectUrl=' + redirectUrl);
};

export async function getCardList() {
    return await axiosInstance.get(controller + 'GetCardList');
};

export async function collectPayment(data) {
    return await axiosInstance.post(controller + 'CollectPayment', data);
};

export async function getSenderRequiredFields(data) {
    return await axiosInstance.post(controller + `GetSenderReqFieldsForPayout`, data);
};

export async function getReceipentsRequiredFields(data) {
    return await axiosInstance.post(controller + `GetReceipentsRequiredFields`, data);
};

export async function getTransactionHistory() {
    return await axiosInstance.get(controller + `GetTransactionHistory`);
};

export async function createBeneficiary(data) {
    return await axiosInstance.post(controller + `CreateBeneficiary`, data);
};

export async function getCardRequiredFields(paymemt_method) {
    return await axiosInstance.get(controller + `GetCardRequiredFields?payment_method=${paymemt_method}`);
};

export async function getPaymentMethodsByCountry() {
    return await axiosInstance.get(controller + `GetPaymentMethodsByCountry`);
};

export async function getSelfFirstandLastName() {
    return await axiosInstance.get(controller + `GetSelfFirstandLastName`);
};

export async function getTransactionDetails(id) {
    return await axiosInstance.get(controller + `GetTransactionDetails?id=` + id);
}