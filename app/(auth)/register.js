import { View, Button, Image, Keyboard, ScrollView, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, TouchableOpacity, Pressable, ActivityIndicator, StyleSheet, Text } from "react-native";
import tw from 'twrnc';
import React, { useState, useRef } from 'react';
import previous from '../../assets/images/previous.png';
import camera from '../../assets/images/camera.png';
import { Link, router } from "expo-router";
import PhoneInput from "react-native-phone-number-input";
import validator from 'validator';
import { registerService } from "../../services/AuthService";
import CustomText from "../../components/CustomText";
import * as ImagePicker from 'expo-image-picker';
import CheckBox from '@react-native-community/checkbox';
import * as WebBrowser from 'expo-web-browser';
import { store } from '../../store';
import { setVerifyCodeData } from "../../store";
import { useTranslation } from 'react-i18next';


export default function Register() {
    const phoneInput = useRef(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [emailExist, setEmailExist] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneValid, setPhoneValid] = useState(true);
    const [phoneExist, setPhoneExist] = useState(false);
    const [PID, setPID] = useState('');
    const [PIDValid, setPIDValid] = useState(true);
    const [PIDExist, setPIDExist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [privacyPolicy, setPrivacyPolicy] = useState(false);
    const { t } = useTranslation();


    async function handleRegister() {
        let na = true;
        let em = true;
        let ph = true;
        let pid = true;
        let pass = true;
        if (loading) return;

        if (firstName == "") {
            setFirstNameValid(false)
        } else {
            setFirstNameValid(true)
        }

        if (lastName == "") {
            setLastNameValid(false)
        } else {
            setLastNameValid(true)
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

        if (PID == "") {
            setPIDValid(false);
            pid = false;
        } else {
            setPIDValid(true);
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;<>?,.\/-])(?=.*[a-z]).{8,}$/;

        if (!passwordRegex.test(password)) {
            setPasswordValid(false);
            pass = false;
        } else {
            setPasswordValid(true);
        }

        if (!na || !em || !ph || !pid || !pass) return;

        setLoading(true);
        let data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phoneNumber: phoneInput.current.getNumberAfterPossiblyEliminatingZero().formattedNumber.replace(" ", ""),
            personalIdentityNumber: PID,
            password: password,
            inviteCode: null,
            role: 'Customer'
        };

        try {
            const res = await registerService(data);
            store.dispatch(setVerifyCodeData({ tokenData: JSON.stringify(res.data), email, phoneNumber: data.phoneNumber }));
            router.push('VerifyCode');
        } catch (error) {
            if (error && error.response) {
                if (error.response.data.message.includes('Email')) {
                    setEmailExist(true);
                }
                else if (error.response.data.message.includes('Phone')) {
                    setPhoneExist(true);
                }
                else if (error.response.data.message.includes('Personal')) {
                    setPIDExist(true);
                }
            }
        }
        finally {
            setLoading(false);
        }
    };

    const openBrowser = async () => {
        await WebBrowser.openBrowserAsync('https://fluuz.com');
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <ScrollView>
            <KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={tw`mx-5`}>
                        <Link href="/createaccount" asChild>
                            <Pressable >
                                <Image
                                    source={previous} style={tw`w-20 h-20 ml-[-15] mt-5`} />
                            </Pressable>
                        </Link>
                        <View >
                            <CustomText style={[tw`font-extrabold text-4xl mt-2`]}>{t("Screens.Register.text")}</CustomText>
                            <CustomText style={[tw`my-5 text-xs`]}>{t("Screens.Register.textCreate")}</CustomText>
                        </View>

                        {/* <View style={tw`mx-auto`}>
                            {!image &&
                                <Pressable style={tw`bg-gray-300 h-25 w-25 rounded-full flex items-center justify-center`} onPress={pickImage} >
                                    <Image style={tw``} source={camera} />
                                </Pressable>
                            }
                            {image && <Image source={{ uri: image }} style={styles.image} />}
                        </View> */}

                        <View style={tw`mt-5 gap-1 `}>

                            <View style={tw`gap-1 mt-3`}>
                                <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.Register.textFirst")}</CustomText>
                                <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!firstNameValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} placeholderTextColor="#0058CA66" onChangeText={setFirstName} placeholder="Jane"></TextInput>
                                {!firstNameValid && <CustomText style={tw`text-red-500`}>{t("Screens.Register.textFirstValid")}</CustomText>}
                            </View>

                            <View style={tw`gap-1 mt-3`}>
                                <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.Register.textLast")}</CustomText>
                                <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!lastNameValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} placeholderTextColor="#0058CA66" onChangeText={setLastName} placeholder="Doe"></TextInput>
                                {!lastNameValid && <CustomText style={tw`text-red-500`}>{t("Screens.Register.textLastValid")}</CustomText>}
                            </View>

                            <View style={tw`gap-1 mt-3`}>
                                <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.Register.textEmail")}</CustomText>
                                <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!emailValid || emailExist ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} keyboardType="email-address" placeholderTextColor="#0058CA66" onChangeText={(value) => setEmail(value)} placeholder="Jane.doe@gmail.com"></TextInput>
                                {!emailValid && <CustomText style={tw`text-red-500`}>{t("Screens.Register.textEmailValid")}</CustomText>}
                                {emailExist && <CustomText style={tw`text-red-500`}>{t("Screens.Register.textEmailExist")}</CustomText>}
                            </View>

                            <View style={tw`gap-1 mt-4`} >
                                <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.Register.textPhone")}</CustomText>
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
                                {!phoneValid && <CustomText style={tw`text-red-500`}>{t("Screens.Register.textPhoneValid")}</CustomText>}
                                {phoneExist && <CustomText style={tw`text-red-500`}>{t("Screens.Register.textPhoneExist")}</CustomText>}
                            </View>

                            <View style={tw`gap-1 mt-4`}>
                                <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.Register.textPersonal")}</CustomText>
                                <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!PIDValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `} onChangeText={(value) => setPID(value)} placeholder={"198901019876 "} placeholderTextColor="#0058CA66"></TextInput>
                                {!PIDValid && <CustomText style={tw`text-red-500`}>{t("Screens.Register.textPersonalValid")}</CustomText>}
                                {PIDExist && <CustomText style={tw`text-red-500`}>{t("Screens.Register.textPersonalExist")}</CustomText>}
                            </View>

                            <View style={tw`gap-1 mt-4`}>
                                <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.Register.textPassword")}</CustomText>
                                <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${!passwordValid ? 'border-[#c0392b]' : 'border-[#0058CA4D]'} p-3.5 `}
                                    secureTextEntry={true}
                                    onChangeText={(value) => setPassword(value)}
                                    placeholder={"*********** "}
                                    placeholderTextColor="#0058CA66"></TextInput>
                                {!passwordValid && <CustomText style={tw`text-red-500`}>{t("Screens.Register.textPasswordValid")}</CustomText>}
                            </View>

                            <View style={tw`gap-1 mt-4`}>
                                <CustomText style={tw`font-medium text-sm mt-1`}>{t("Screens.Register.textConfirm")}</CustomText>
                                <TextInput style={tw`bg-[#EBF4FF] rounded-md border ${confirmPassword === password ? 'border-[#0058CA4D]' : 'border-[#c0392b]'} p-3.5 `}
                                    secureTextEntry={true}
                                    onChangeText={(value) => setConfirmPassword(value)}
                                    placeholder={"*********** "}
                                    placeholderTextColor="#0058CA66"></TextInput>
                                {confirmPassword !== password && <CustomText style={tw`text-red-500`}>{t("Screens.Register.textConfirmValid")}</CustomText>}
                            </View>

                        </View>

                        <TouchableOpacity>
                            <CustomText style={tw`text-blue-500 text-xs font-extrabold mt-2`} color="#0058CA">
                                {t("Screens.Register.textGot")}
                            </CustomText>
                        </TouchableOpacity>

                        <View >
                            <View style={tw`flex-row mt-5`}>
                                <CheckBox
                                    value={privacyPolicy}
                                    onValueChange={setPrivacyPolicy}
                                />
                                <View>
                                    <CustomText>{t("Screens.Register.textBy")}</CustomText>
                                    <CustomText>{t("Screens.Register.textOur")}
                                        <CustomText onPress={() => openBrowser()} style={tw`text-blue-500`}>{t("Screens.Register.textTerms")}</CustomText>
                                        {t("Screens.Register.textAnd")}
                                        <CustomText onPress={() => openBrowser()} style={tw`text-blue-500`}> {t("Screens.Register.textPrivacy")}</CustomText>
                                    </CustomText>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => handleRegister()} disabled={!privacyPolicy} style={[tw`${CustomStyles.btn} ${!privacyPolicy ? 'bg-blue-300' : ''} p-3 mt-10 mb-15`]}>
                            {loading && <ActivityIndicator color="#fff" size="large"></ActivityIndicator>}
                            {!loading && <CustomText style={tw`text-white font-bold text-lg`}>
                                {t("Screens.Register.btnCreate")}
                            </CustomText>}
                        </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
});