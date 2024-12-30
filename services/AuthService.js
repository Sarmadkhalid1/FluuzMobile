import axiosInstance from './Axios';

const controller = '/Auth/'

export async function login(data) {
    return await axiosInstance.post(controller + 'Login', data);
};

export async function registerService(data) {
    return await axiosInstance.post(controller + 'Register', data);
};

export async function resendOTP(data) {
    return await axiosInstance.post(controller + 'ResendOTPCode', data);
}

export async function verifyOTPCode(data) {
    return await axiosInstance.post(controller + 'VerifyOTPCode', data);
};

export async function verifyOTPToken(data) {
    return await axiosInstance.post(controller + 'VerifyOTPToken', data);
}

export async function verifyLoginToken() {
    return await axiosInstance.get(controller + 'VerifyLoginToken');
}

export async function verifyGoogleTokenAndLogin(token) {
    return await axiosInstance.post(controller + 'VerifyGoogleTokenAndLogin', { token });
}

export async function MobileAndCountryCodeAdded() {
    return await axiosInstance.get(controller + 'MobileAndCountryCodeAdded');
}

export async function addPhoneAndCountry(data) {
    return await axiosInstance.get(controller + 'AddPhoneAndCountry?phone=' + data.phone + '&countrycode=' + data.countrycode + '&currency=' + data.currency);
}

export async function verifyMicrosoftTokenAndLogin(token) {
    return await axiosInstance.post(controller + 'VerifyMicrosoftTokenAndLogin', { token });
}

export async function getLoginUserCountry() {
    return await axiosInstance.get(controller + 'GetLoginUserCountry');
}