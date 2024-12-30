import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Slot, router, usePathname } from "expo-router";
import AppBar from "../../components/AppBar";
import SplashScreen from "../../components/SplashScreen";
import { verifyLoginToken, MobileAndCountryCodeAdded } from '../../services/AuthService';
import { store, setSavedRecipientData, setCameFrom } from '../../store';
import '../../localization/i18n';
import { Provider } from "react-redux";

export default Layout = () => {
    const route = usePathname();

    const [loading, setLoading] = useState(true);
    const [selectedLink, setSelectedLink] = useState("Home");
    const [showAppbar, setShowAppbar] = useState(true);

    useEffect(() => {
        checkToken();
    }, [])

    useEffect(() => {
        verifyToken();
        if (route === '/Home') {
            resetSavedRecipientState();
            resetCameFromState();
            setSelectedLink('Home');
            setShowAppbar(true);
        }
        else if (route === '/HowMuchSending') {
            resetCameFromState();
            setSelectedLink('Send');
            setShowAppbar(true);
        }
        else if (route === '/SavedRecipients') {
            resetSavedRecipientState();
            resetCameFromState();
            setSelectedLink('Recipients');
            setShowAppbar(true);
        }
        else if (route === '/TransactionHistory') {
            resetCameFromState();
            resetSavedRecipientState();
            setSelectedLink('Transactions');
            setShowAppbar(true);
        }
        else {
            setShowAppbar(false);
        }
    }, [usePathname()])

    function resetSavedRecipientState(){
        store.dispatch(setSavedRecipientData({
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            userId: null,
            connectId: null
        }));
    }

    function resetCameFromState(){
        store.dispatch(setCameFrom(null));
    }

    async function checkToken() {
        const token = await SecureStore.getItemAsync('jwt_token')
        if (token) {
            try {
                await verifyLoginToken();
                let res = await MobileAndCountryCodeAdded();
                if (res.data) {
                    if (!res.data.phone || !res.data.country) {
                        router.push(`/SelectDetails`);
                    }
                }
                setLoading(false);
            }
            catch {
                router.replace('/');
            }
        }
        else {
            router.replace('/');
        }
    }

    async function verifyToken() {
        const token = await SecureStore.getItemAsync('jwt_token')
        if (token) {
            try {
                await verifyLoginToken();
                setLoading(false);
            }
            catch {
                router.replace('/');
            }
        }
        else {
            router.replace('/');
        }
    }

    if (loading)
        return <SplashScreen />

    return (
        <Provider store={store}>
            <Slot />
            <AppBar selectedLink={selectedLink} show={showAppbar} setSelectedLink={setSelectedLink}></AppBar>
        </Provider>
    );
};