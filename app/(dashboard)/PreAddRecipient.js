import React, { useState, useRef } from "react";
import { View, TextInput, Pressable, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import previous from '../../assets/images/previous.png';
import tw from 'twrnc';
import { Link, router, } from "expo-router";
import CustomText from "../../components/CustomText";
import PhoneInput from "react-native-phone-number-input";
import validator from 'validator';
import { getHowMuchSendingData, setAddRecipientData, setCameFrom, setHowMuchSendingData, store } from "../../store";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { addRecipient } from "../../services/RecipientService";
import { getCountryList } from "../../services/Countries-js";
import { Dropdown } from "react-native-element-dropdown";

const PreAddRecipient = () => {
    const route = useRoute();
    const { type } = route.params;

    const navigation = useNavigation();

    const phoneInput = useRef(null);
    const [firstName, setFirstName] = useState('');
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastName, setLastName] = useState('');
    const [lastNameValid, setLastNameValid] = useState(true);
    const [organizationName, setOrganizationName] = useState('');
    const [goalAmount, setGoalAmount] = useState(0);
    const [goalValid, setGoalValid] = useState(true);
    const [about, setAbout] = useState('');
    const [aboutValid, setAboutValid] = useState('');
    const [organizationNameValid, setOrganizationNameValid] = useState(true);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [emailExist, setEmailExist] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneValid, setPhoneValid] = useState(true);
    const [phoneExist, setPhoneExist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countryCode, setCountryCode] = useState('');
    const [countryCodeValid, setcountryCodeValid] = useState(false);
    const { t } = useTranslation();

    const countryList = getCountryList();

    const prevStateData = useSelector(getHowMuchSendingData);

    async function setGoal(amount) {
        setGoalAmount(parseInt(amount));
    }

    async function handleRegister() {
        let na = true;
        let em = true;
        let ph = true;
        let valid = true;
        if (loading) return;

        if (type === 'recipient') {
            if (firstName === "") {
                setFirstNameValid(false);
                valid = false;
            } else {
                setFirstNameValid(true);
            }

            if (lastName === "") {
                setLastNameValid(false);
                valid = false;
            } else {
                setLastNameValid(true);
            }
        } else {
            if (organizationName === "") {
                setOrganizationNameValid(false);
                valid = false;
            } else {
                setOrganizationNameValid(true);
            }
            if (about.length < 1000) {
                setAboutValid(false);
                valid = false;
            } else {
                setAboutValid(true);
            }
            if (goalAmount === 0) {
                setGoalValid(false);
                valid = false;
            }
            else {
                setGoalValid(true);
            }
            if(countryCode === ''){
                setcountryCodeValid(false);
                valid = false;
            }
            else{
                setcountryCodeValid(true);
            }
        }

        if (validator.isEmail(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
            em = false;
        }

        if (phoneInput.current.isValidNumber(phone)) {
            setPhoneValid(true);
        } else {
            setPhoneValid(false);
            ph = false;
        }

        if (!na || !em || !ph || !valid) return;

        setLoading(true);

        const data = type === 'recipient' ? {
            firstName,
            lastName,
            email,
            phone: phoneInput.current.getNumberAfterPossiblyEliminatingZero().formattedNumber.replace(" ", ""),
            country: prevStateData.receiverCountry,
            type: 'Recipient',
        } : {
            firstName: organizationName,
            email,
            phone: phoneInput.current.getNumberAfterPossiblyEliminatingZero().formattedNumber.replace(" ", ""),
            country: countryCode,
            type: 'Organization',
            about,
            goalAmount
        };

        try {
            const res = await addRecipient(data);
            store.dispatch(setAddRecipientData(res.data));
            store.dispatch(setHowMuchSendingData({
                senderAmount: prevStateData.senderAmount,
                senderCountry: prevStateData.senderCountry,
                receiverAmount: prevStateData.receiverAmount,
                receiverCountry: type === 'recipient' ? prevStateData.receiverCountry : countryCode,
                rate: prevStateData.rate,
                payoutMethod: prevStateData.payoutMethod,
            }));
            if(type !== 'recipient'){
                store.dispatch(setCameFrom('/Donations'));
            }
            navigation.navigate('AddRecipients', { type })
        } catch (error) {
            console.log(error);
            if (error && error.response) {
                if (error.response.data.message.includes('Email')) {
                    setEmailExist(true);
                }
                else if (error.response.data.message.includes('Phone')) {
                    setPhoneExist(true);
                }
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Link href="" asChild>
                            <Pressable>
                                <Image source={previous} style={tw`w-20 h-20`} />
                            </Pressable>
                        </Link>

                        <CustomText style={tw`font-bold text-6 mx-10`}>Please provide information about {type === 'recipient' ? 'recipient' : 'organization'}.</CustomText>

                        <View style={tw`mt-5 gap-1 mx-10`}>

                            {type === 'recipient' ? (
                                <>
                                    <View style={tw`gap-1 mt-3`}>
                                        <CustomText style={tw`font-medium text-sm mt-1`}>First Name</CustomText>
                                        <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!firstNameValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} placeholderTextColor="#0058CA66" onChangeText={setFirstName} placeholder="First Name"></TextInput>
                                        {!firstNameValid && <CustomText style={tw`text-red-500`}>Please enter first name</CustomText>}
                                    </View>

                                    <View style={tw`gap-1 mt-3`}>
                                        <CustomText style={tw`font-medium text-sm mt-1`}>Last Name</CustomText>
                                        <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!lastNameValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} placeholderTextColor="#0058CA66" onChangeText={setLastName} placeholder="Last Name"></TextInput>
                                        {!lastNameValid && <CustomText style={tw`text-red-500`}>Please enter last name</CustomText>}
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={tw`gap-1 mt-3`}>
                                        <CustomText style={tw`font-medium text-sm mt-1`}>Organization Name</CustomText>
                                        <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!organizationNameValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} placeholderTextColor="#0058CA66" onChangeText={setOrganizationName} placeholder="Organization Name"></TextInput>
                                        {!organizationNameValid && <CustomText style={tw`text-red-500`}>Please enter organization name</CustomText>}
                                    </View>

                                    <View style={tw`gap-1 mt-3`}>
                                        <CustomText style={tw`font-medium text-sm mt-1`}>About</CustomText>
                                        <TextInput multiline={true} numberOfLines={4} style={[
                                            tw`bg-[#EBF4FF] rounded-md p-3.5`,
                                            {
                                                borderColor: !aboutValid ? '#0058CA4D' : '#c0392b',
                                                borderWidth: 1,
                                                textAlignVertical: 'top'
                                            }
                                        ]} placeholderTextColor="#0058CA66" onChangeText={setAbout} placeholder="About Organization"></TextInput>
                                        {!aboutValid && <CustomText style={tw`text-red-500`}>Please enter minimum 1000 character long about organization.</CustomText>}
                                    </View>

                                    <View style={tw`gap-1 mt-3`}>
                                        <CustomText style={tw`font-medium text-sm mt-1`}>Goal/Amount</CustomText>
                                        <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!goalValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} keyboardType="numeric" placeholderTextColor="#0058CA66" onChangeText={value => setGoal(value)} placeholder="000.00"></TextInput>
                                    </View>

                                    <View>
                                        <CustomText style={tw`font-medium text-sm mt-2`}>Select Country</CustomText>
                                        <Dropdown
                                            style={[tw`w-full`, styles.dropdown]}
                                            data={countryList}
                                            maxHeight={300}
                                            search={true}
                                            labelField="label"
                                            value={countryCode}
                                            valueField="countryCode"
                                            placeholder="Select country"
                                            onChange={(item) => setCountryCode(item.countryCode)}
                                        />
                                        {!countryCodeValid &&
                                            <CustomText style={tw`mt-2 text-red-500`}>Please select the country</CustomText>
                                        }
                                    </View>
                                </>
                            )}

                            <View style={tw`gap-1 mt-3`}>
                                <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.PreAddRecipient.textEmail")}</CustomText>
                                <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!emailValid || emailExist ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} keyboardType="email-address" placeholderTextColor="#0058CA66" onChangeText={(value) => setEmail(value)} placeholder="Jane.doe@gmail.com"></TextInput>
                                {!emailValid && <CustomText style={tw`text-red-500`}>{t("Screens.PreAddRecipient.textEmailValid")}</CustomText>}
                                {emailExist && <CustomText style={tw`text-red-500`}>{t("Screens.PreAddRecipient.textEmailExist")}</CustomText>}
                            </View>

                            <View style={tw`gap-1 mt-3`} >
                                <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.PreAddRecipient.textPhone")}</CustomText>
                                <PhoneInput
                                    ref={phoneInput}
                                    defaultValue={phone}
                                    defaultCode="SE"
                                    layout="first"
                                    onChangeFormattedText={(value) => setPhone(value)}
                                    textContainerStyle={{
                                        backgroundColor: '#EBF4FF'
                                    }}
                                    containerStyle={[{
                                        backgroundColor: '#EBF4FF',
                                        borderWidth: 1,
                                        borderColor: !phoneValid || phoneExist ? '#c0392b' : '#0058CA4D',
                                        borderRadius: 4,
                                        height: 58,
                                    }, tw`w-full`]}
                                />
                                {!phoneValid && <CustomText style={tw`text-red-500`}>{t("Screens.PreAddRecipient.textPhoneValid")}</CustomText>}
                                {phoneExist && <CustomText style={tw`text-red-500`}>{t("Screens.PreAddRecipient.textPhoneExist")}</CustomText>}
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleRegister} style={tw`${CustomStyles.btn} mx-10 py-4 mt-10 mb-10`}>
                            {loading && <ActivityIndicator color="#fff" size="large"></ActivityIndicator>}
                            {!loading && <CustomText style={tw`text-white font-bold text-lg`}>
                                {t("Screens.PreAddRecipient.textSave")}
                            </CustomText>}
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
export default PreAddRecipient;

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
})

