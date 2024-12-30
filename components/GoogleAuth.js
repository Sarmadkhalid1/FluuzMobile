
import { View, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { verifyGoogleTokenAndLogin } from "../services/AuthService";
import google from '../assets/images/google.png';
import tw from 'twrnc';
import CustomText from "./CustomText";
import { router } from "expo-router";
import { useTranslation } from 'react-i18next';



export default function GoogleAuth({ loading, googleSigning }) {
    GoogleSignin.configure({
        webClientId: `${process.env.EXPO_PUBLIC_GOOGLE}`,
        iosClientId: `${process.env.EXPO_PUBLIC_GOOGLE_IOS}`,
        offlineAccess: true,
    });

    const [googleLoading, setGoogleLoading] = useState(false);
    const { t } = useTranslation();


    function notify(title, message) {
        Alert.alert(title, message)
    }

    async function handleGoogleAuth() {
        try {
            setGoogleLoading(true);
            googleSigning(true);
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const res = await verifyGoogleTokenAndLogin(userInfo.idToken);
            await SecureStore.setItemAsync('jwt_token', JSON.stringify(res.data));
            router.push('/SelectDetails');

        } catch (error) {
            if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                notify('Error', 'Your Google auth code outdated.')
            } else {
                notify('Error', 'Failed to login using Google.')
            }
        }
        finally {
            setGoogleLoading(false);
            googleSigning(false);
        }
    };

    return (
        <TouchableOpacity disabled={loading || googleLoading} onPress={() => handleGoogleAuth()} style={[tw`${loading || googleLoading ? 'opacity-60' : ''} p-3 mt-5 bg-[#DFEFFF] flex-row items-center border rounded-md gap-1`]}>
            {googleLoading && <ActivityIndicator color="#000000" size="large"></ActivityIndicator>}
            <Image source={google} style={tw`w-7 h-7 mr-1`} resizeMode="contain" />
            <View style={tw`flex-row items-center`}>
                <CustomText style={tw`text-base mt-0.5`}>{t("Screens.GoogleAuth.text")}</CustomText>
                <CustomText style={tw`font-bold text-base ml-1`}>Google</CustomText>
            </View>
        </TouchableOpacity>
    )
}