import { View, Image, Pressable, Dimensions, ScrollView, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator, TextInput, Alert } from "react-native";
import tw from 'twrnc';
import React, { useState } from 'react';
import previous from '../../assets/images/previous.png';
import { Link, router } from "expo-router";
import { login } from "../../services/AuthService";
import CustomText from "../../components/CustomText";
import validator from 'validator';
import MSAuth from "../../components/MSAuth";
import GoogleAuth from '../../components/GoogleAuth';
import * as Linking from 'expo-linking';
import { store } from '../../store';
import { setVerifyCodeData } from "../../store";
import { useTranslation } from 'react-i18next';


const { height } = Dimensions.get('screen');

const LoginUser = () => {
    const redirectUrl = Linking.createURL('loginuser');

    const [emailValid, setEmailValid] = useState(true);
    const [passwordlValid, setpasswordValid] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [msLoading, setMSLoading] = useState(false);
    const { t } = useTranslation();


    async function handleLogin() {
        if (loading) return;
        if (validator.isEmail(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }

        if (password == "") {
            setpasswordValid(true)
            return;
        } else {
            setpasswordValid(false)
        }

        setLoading(true)

        try {
            const res = await login({ email, password });
            store.dispatch(setVerifyCodeData({ tokenData: JSON.stringify(res.data), email, phoneNumber: res.data.phoneNumber }));
            router.push('VerifyCode')
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Something went wrong, please try again')
        }
        setLoading(false);
    };

    return (
        <ScrollView>
            <KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[tw`mx-5`, { height }]}>
                        <Link href="../" asChild>
                            <Pressable >
                                <Image
                                    source={previous} style={tw`w-20 h-20 ml-[-15] mt-5`} />
                            </Pressable>
                        </Link>
                        <CustomText style={[tw`font-extrabold text-4xl mt-2`]}>{t("Screens.LoginUser.text")}</CustomText>

                        <View style={tw`mt-5`} >
                            <View>
                                <GoogleAuth loading={loading || msLoading} googleSigning={setGoogleLoading} />

                                <MSAuth loading={loading || googleLoading} redirectUrl={redirectUrl} msSigning={setMSLoading} />
                            </View>

                            <View style={tw`flex-row my-5 items-center`}>
                                <View style={tw`bg-black grow h-0.3`} />
                                <CustomText style={tw`mx-3`}>{t("Screens.LoginUser.textOr")}</CustomText>
                                <View style={tw`bg-black grow h-0.3`} />
                            </View>

                            <View style={tw`gap-1`}>
                                <CustomText style={tw`font-bold text-sm mt-1`}>{t("Screens.LoginUser.textEmail")}</CustomText>
                                <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!emailValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} keyboardType="email-address" placeholderTextColor="#0058CA66" onChangeText={(value) => setEmail(value)} placeholder="Jane.doe@gmail.com"></TextInput>
                                {!emailValid && <CustomText style={tw`text-red-500`}>{t("Screens.LoginUser.textEmailValid")}</CustomText>}
                            </View>

                            <View style={tw`gap-1 mt-4`}>
                                <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.LoginUser.textPassword")}</CustomText>
                                <TextInput style={tw`bg-[#EBF4FF] rounded-md border border-[#0058CA4D] p-3.5 `} secureTextEntry={true} onChangeText={setPassword} placeholder={"***********"} placeholderTextColor="#0058CA66"></TextInput>
                                {passwordlValid && <CustomText style={tw`text-red-500`}>{t("Screens.LoginUser.textPasswordValid")}</CustomText>}
                            </View>

                            <Pressable disabled={loading} onPress={() => handleLogin()} style={[tw`${CustomStyles.btn} ${loading ? 'opacity-60' : ''} p-3 mt-5`]}>
                                <CustomText style={tw`text-white font-bold text-lg`}>
                                    {loading && <ActivityIndicator color="#fff" size="large"></ActivityIndicator>}
                                    {!loading && <CustomText>{t("Screens.LoginUser.btnLogin")}</CustomText>}
                                </CustomText>
                            </Pressable>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default LoginUser;