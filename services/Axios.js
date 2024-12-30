import axios from 'axios';
import promise from 'promise';
import * as SecureStore from 'expo-secure-store';


// Add a request interceptor 
var axiosInstance = axios.create();

axios.defaults.baseURL = `${process.env.EXPO_PUBLIC_API_URL}`;
axiosInstance.defaults.baseURL = `${process.env.EXPO_PUBLIC_API_URL}`;

axiosInstance.interceptors.request.use(async function (req) {
    try {
        await checkServer();
        if (req.headers) {
            const data = await SecureStore.getItemAsync('jwt_token')
            if (data) {
                const token = JSON.parse(data);
                req.headers.Authorization = `Bearer ${token.accessToken}`;
            }
        }
        return req;
    }
    catch (error) {
        SecureStore.deleteItemAsync('jwt_token');
        return promise.reject(error);
    }
}, function (error) {
    return promise.reject(error);
});

async function checkServer() {
    return await axios.get('/Auth/Preflight', { timeout: 10000 });
}


export default axiosInstance;