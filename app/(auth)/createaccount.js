import { View, Image, Pressable, Dimensions } from "react-native";
import tw from 'twrnc';
import React, { useState } from 'react';
import previous from '../../assets/images/previous.png';
import { Link } from "expo-router";
import CustomText from "../../components/CustomText";
import { primary_color } from '../../constants/styles';
import MSAuth from "../../components/MSAuth";
import GoogleAuth from '../../components/GoogleAuth';
import * as Linking from 'expo-linking';
import CustomStyles from '../../constants/styles';
import { useTranslation } from 'react-i18next';


const { height } = Dimensions.get('screen');

const CreateAccount = () => {
    const redirectUrl = Linking.createURL('createaccount');
    const [emailValid, setEmailValid] = useState(true);
    const [emailExist, setEmailExist] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [msLoading, setMSLoading] = useState(false);
    const { t } = useTranslation();


    return (
        <View style={[tw`mx-5`, { height }]}>
            <Link href="/Onboarding" asChild>
                <Pressable >
                    <Image
                        source={previous} style={tw`w-20 h-20 ml-[-15] mt-5`} />
                </Pressable>
            </Link>
            <CustomText style={[tw`font-extrabold text-4xl mt-2`]}>{t("Screens.CreateAccount.text")}</CustomText>

            <View style={tw`mt-10`} >
                <View>
                    <GoogleAuth loading={loading || msLoading} googleSigning={setGoogleLoading} />

                    <MSAuth loading={loading || googleLoading} redirectUrl={redirectUrl} msSigning={setMSLoading} />
                </View>

                <View style={tw`flex-row `}>
                    <CustomText style={tw`font-semibold`}>{t("Screens.CreateAccount.textAlready")}</CustomText>
                    <Link href='/Login' style={tw`text-[${primary_color}] ml-1`}>{t("Screens.CreateAccount.textLog")}</Link>
                </View>

                <View style={tw`flex-row mt-8 items-center`}>
                    <View style={tw`bg-black grow h-0.3`} />
                    <CustomText style={tw`mx-3`}>{t("Screens.CreateAccount.textOr")}</CustomText>
                    <View style={tw`bg-black grow h-0.3`} />
                </View>

                <Link asChild href="/register">
                    <Pressable
                        style={tw`${CustomStyles.btn} mt-15 py-3`}
                    >
                        <CustomText style={tw`text-white font-bold text-lg`}>{t("Screens.CreateAccount.btnContinue")}</CustomText>
                    </Pressable>
                </Link>
            </View>
        </View>
    )
}
export default CreateAccount;
