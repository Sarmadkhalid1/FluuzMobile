
import { View, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";
import tw from 'twrnc';
import CustomText from "./CustomText";
import microsoft from '../assets/images/microsoft.png';
import * as WebBrowser from 'expo-web-browser';
import { verifyMicrosoftTokenAndLogin } from '../services/AuthService';
import { useTranslation } from 'react-i18next';


export default function MSAuth({ loading, msSigning, redirectUrl }) {
    let microsoftLoginUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.EXPO_PUBLIC_MS_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}&scope=User.Read%20openid%20profile%20offline_access`;

    const [msLoading, setMSLoading] = useState(false);
    const { t } = useTranslation();

    function notify(title, message) {
        Alert.alert(title, message)
    }

    async function handleMSAuth() {
        try {
            if (microsoftLoginUrl) {
                setMSLoading(true);
                msSigning(true);
                const result = await WebBrowser.openAuthSessionAsync(microsoftLoginUrl, redirectUrl);
                if (result.type === "success") {
                    const urlCallback = new URL(result.url);
                    const code = urlCallback.searchParams.get('code');

                    // Exchange the code for an access token
                    const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `client_id=${process.env.EXPO_PUBLIC_MS_CLIENT_ID}&scope=User.Read%20openid%20profile%20offline_access&code=${code}&redirect_uri=${redirectUrl}&grant_type=authorization_code`
                    });

                    const json = await response.json();

                    // json.access_token is the access token
                    if (json.hasOwnProperty('access_token')) {
                        const res = await verifyMicrosoftTokenAndLogin(json.access_token);
                        await SecureStore.setItemAsync('jwt_token', JSON.stringify(res.data));
                        router.push('/SelectDetails');
                    }
                    else {
                        notify('Error', 'Failed to login using Microsoft.');
                        setMSLoading(false);
                        msSigning(false);
                    }
                }
                else {
                    setMSLoading(false);
                    msSigning(false);
                }
            }
            else {
                notify('Error', 'Unable to find auth url.');
            }
        }
        catch (error) {
            notify('Error', 'Failed to login using Microsoft.');
        }
        finally {
            setMSLoading(false);
            msSigning(false);
        }
    };

    return (
        <TouchableOpacity disabled={loading || msLoading} onPress={() => handleMSAuth()} style={[tw`${loading || msLoading ? 'opacity-60' : ''} p-3 mt-5 mb-5 bg-[#DFEFFF] flex-row items-center  border rounded-md gap-1`]}>
            {msLoading && <ActivityIndicator color="#000000" size="large"></ActivityIndicator>}
            <Image source={microsoft} style={tw`w-7 h-7 mr-1`} resizeMode="contain" />
            <View style={tw`flex-row items-center`}>
                <CustomText style={tw`text-base mt-0.5`}>{t("Screens.MSAuth.text")}</CustomText>
                <CustomText style={tw`font-bold text-base ml-1 `}>Microsoft Account</CustomText>
            </View>
        </TouchableOpacity>
    )
}