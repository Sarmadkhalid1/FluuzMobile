import React, { useState, useRef } from "react";
import { View, TextInput, Pressable, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import previous from '../../assets/images/previous.png';
import tw from 'twrnc';
import { Link, router, } from "expo-router";
import CustomText from "../../components/CustomText";
import PhoneInput from "react-native-phone-number-input";
import * as SecureStore from 'expo-secure-store';
import validator from 'validator';
import { addOrganization } from "../../services/OrganizationService";
import { useTranslation } from 'react-i18next';


const PreAddOrganization = () => {

    const [organizationName, setOrganizationName] = useState('');
    const [organizationNameValid, setOrganizationNameValid] = useState(true);
    const [title, setTitle] = useState('');
    const [titleValid, setTitleValid] = useState(true);
    const [amount, setAmount] = useState('');
    const [amountValid, setAmountValid] = useState(true);
    const [about, setAbout] = useState('');
    const [aboutValid, setAboutValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();



    async function handleSave() {
        let ca = true;
        let tm = true;
        let ga = true;
        let ab = true;
        if (loading) return;

        if (organizationName == "") {
            setOrganizationNameValid(false)
            ca = false;
        } else {
            setOrganizationNameValid(true)
        }

        if (title == "") {
            setTitleValid(false)
            tm = false;
        } else {
            setTitleValid(true)
        }

        if (amount == "") {
            setAmountValid(false)
            ga = false;
        } else {
            setAmountValid(true)
        }


        if (about == "") {
            setAboutValid(false)
            ab = false;

        } else {
            setAboutValid(true)
        }

        if (!ca || !tm || !ga || !ab) return;

        setLoading(true);

        const jwt = JSON.parse(await SecureStore.getItemAsync('jwt_token'));
        const data = {
            organizationName,
            title,
            amount,
            about
        };
        console.log(data);

        try {
            const res = await addOrganization(data);
            router.back()
        } catch (error) {
            Alert("An error occured");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <Link href="" asChild>
                    <Pressable>
                        <Image source={previous} style={tw`w-20 h-20`} />
                    </Pressable>
                </Link>

                <CustomText style={tw`font-bold text-6 mx-10`}>{t("Screens.PreAddOrganization.text")}</CustomText>

                <View style={tw`mt-5 gap-1 mx-10`}>

                    <View style={tw`gap-1 mt-3`}>
                        <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.PreAddOrganization.textName")}</CustomText>
                        <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!organizationNameValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} placeholderTextColor="#0058CA66" onChangeText={setOrganizationName} placeholder="Smile Foundation"></TextInput>
                        {!organizationNameValid && <CustomText style={tw`text-red-500`}>{t("Screens.PreAddOrganization.textNameValid")}</CustomText>}
                    </View>

                    <View style={tw`gap-1 mt-3`}>
                        <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.PreAddOrganization.textTitle")}</CustomText>
                        <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!titleValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} placeholderTextColor="#0058CA66" onChangeText={setTitle} placeholder="Doe"></TextInput>
                        {!titleValid && <CustomText style={tw`text-red-500`}>{t("Screens.PreAddOrganization.textTitleValid")}</CustomText>}
                    </View>

                    <View style={tw`gap-1 mt-3`}>
                        <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.PreAddOrganization.textGoal")}</CustomText>
                        <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!amountValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} placeholderTextColor="#0058CA66" onChangeText={setAmount} keyboardType="numeric" placeholder="30$"></TextInput>
                        {!amountValid && <CustomText style={tw`text-red-500`}>{t("Screens.PreAddOrganization.textGoalValid")}</CustomText>}
                    </View>

                    <View style={tw`gap-1 mt-3`}>
                        <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.PreAddOrganization.textAbout")}</CustomText>
                        <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!aboutValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} placeholderTextColor="#0058CA66" onChangeText={setAbout} multiline={true} numberOfLines={5} placeholder="More than 100 million people have been forced to flee war, conflict, and persecution from Ukraine, Afghanistan, Yemen, and other parts of the world."></TextInput>
                        {!aboutValid && <CustomText style={tw`text-red-500`}>{t("Screens.PreAddOrganization.textAboutValid")}</CustomText>}
                    </View>

                </View>

                <TouchableOpacity onPress={handleSave} style={tw`${CustomStyles.btn} mx-10 py-4 mt-10 mb-10`}>
                    {loading && <ActivityIndicator color="#fff" size="large"></ActivityIndicator>}
                    {!loading && <CustomText style={tw`text-white font-bold text-lg`}>
                        {t("Screens.PreAddOrganization.textSave")}
                    </CustomText>}
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}
export default PreAddOrganization;
