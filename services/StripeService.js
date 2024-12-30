import axiosInstance from './Axios';

const controller = '/Stripe/'

export async function getDailyRates(senderCurrency, receiverCurrency) {
    return await axiosInstance.get(controller + 'GetDailyRates?senderCurrency=' + senderCurrency + '&receiverCurrency=' + receiverCurrency);
};

export async function getTransactionDetails(id) {
    return await axiosInstance.get(controller + `GetTransactionDetails?id=` + id);
};

export async function deleteCard(cardId) {
    return await axiosInstance.get(controller + 'DeleteCard?cardId=' + cardId);
};

export async function getCardList() {
    return await axiosInstance.get(controller + 'GetCardList');
};

export async function setupIntent() {
    return await axiosInstance.get(controller + 'SetupIntent');
};

export async function createConnectAccount(countryCode, recipientId, type) {
    return await axiosInstance.get(controller + 'CreateConnectAccount?countryCode=' + countryCode + '&recipientId=' + recipientId + '&type=' + type);
};

export async function retrieveAccount(connectId) {
    return await axiosInstance.get(controller + 'RetrieveAccount?connectId=' + connectId);
}

export async function uploadFilesToStripe(purpose, filesData) {
    return await axiosInstance.post(controller + 'UploadFiles?purpose=' + purpose, filesData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function createBankAccount(connectId, data) {
    return await axiosInstance.post(controller + 'CreateBankAccount?connectId=' + connectId, data);
}

export async function updateAccount(connectId, data) {
    return await axiosInstance.post(controller + 'UpdateAccount?connectId=' + connectId, data);
}

export async function createPerson(connectId, who) {
    return await axiosInstance.get(controller + 'CreatePerson?connectId=' + connectId + '&who=' + who);
};

export async function getAllOwners(connectId) {
    return await axiosInstance.get(controller + `GetAllOwners?connectId=` + connectId);
};

export async function getUnResolvedOwner(connectId) {
    return await axiosInstance.get(controller + `GetUnResolvedOwner?connectId=` + connectId);
};

export async function getAllDirectors(connectId) {
    return await axiosInstance.get(controller + `GetAllDirectors?connectId=` + connectId);
};

export async function getUnResolvedDirector(connectId) {
    return await axiosInstance.get(controller + `GetUnResolvedDirector?connectId=` + connectId);
};

export async function getAllExecutives(connectId) {
    return await axiosInstance.get(controller + `GetAllExecutives?connectId=` + connectId);
};

export async function getUnResolvedExecutive(connectId) {
    return await axiosInstance.get(controller + `GetUnResolvedExecutive?connectId=` + connectId);
};

export async function getOwner(connectId) {
    return await axiosInstance.get(controller + `GetOwner?connectId=` + connectId);
};

export async function getExecutive(connectId) {
    return await axiosInstance.get(controller + `GetExecutive?connectId=` + connectId);
};

export async function getRepresentative(connectId) {
    return await axiosInstance.get(controller + `GetRepresentative?connectId=` + connectId);
};

export async function getDirector(connectId) {
    return await axiosInstance.get(controller + `GetDirector?connectId=` + connectId);
};

export async function getLegalGuardian(connectId) {
    return await axiosInstance.get(controller + `GetLegalGuardian?connectId=` + connectId);
};

export async function updatePerson(connectId, personId, data) {
    return await axiosInstance.post(controller + 'UpdatePerson?connectId=' + connectId + '&personId=' + personId, data);
}

export async function deletePerson(connectId, personId) {
    return await axiosInstance.get(controller + 'DeletePerson?connectId=' + connectId + '&personId=' + personId);
};

export async function WhoIsThisPerson(connectId, personId) {
    return await axiosInstance.get(controller + 'WhoIsThisPerson?connectId=' + connectId + '&personId=' + personId);
};

export async function createVirtualCard() {
    return await axiosInstance.post(controller + 'CreateVirtualCard');
};
