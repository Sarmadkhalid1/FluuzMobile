import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Slot, router, useNavigation } from "expo-router";
import SplashScreen from "../../components/SplashScreen";
import { verifyLoginToken } from '../../services/AuthService';
import { Provider } from 'react-redux';
import { store } from '../../store';
import '../../localization/i18n';

export default Layout = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkToken();
    }, [])

    async function checkToken() {
        const token = await SecureStore.getItemAsync('jwt_token')
        if (token) {
            try {
                await verifyLoginToken();
                router.push('/SelectDetails');
            }
            catch {
                setLoading(false);
            }
        }
        else {
            setLoading(false);
        }
    }

    if (loading)
        return <SplashScreen />

    return <Provider store={store}><Slot /></Provider>
};