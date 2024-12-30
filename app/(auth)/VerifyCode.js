import { View, Image, TextInput, TouchableOpacity, Dimensions, Pressable, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Link, router } from "expo-router";
import React, { useRef, useState, useEffect } from 'react';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles'
import previous from '../../assets/images/previous.png';
import { resendOTP } from "../../services/AuthService";
import { verifyOTPCode } from "../../services/AuthService";
import { verifyOTPToken } from "../../services/AuthService";
import * as SecureStore from 'expo-secure-store';
import CustomText from '../../components/CustomText';
import { getVerifyCodeData } from "../../store";
import { useSelector } from "react-redux";
import { OtpInput } from "react-native-otp-entry";
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';



export default function VerifyCode() {
    const { height } = Dimensions.get('window');
    // const inputRefs = [useRef(), useRef(), useRef(), useRef()]
    // const [otpValues, setOtpValues] = useState(['', '', '', '']);
    // const [activeInput, setActiveInput] = useState(0);
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(180);
    const [verifying, setVerifying] = useState(false);
    const [resending, setResending] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const { t } = useTranslation();


    const verifyCodeData = useSelector(getVerifyCodeData);

    function startTimer() {
        setTimer(180);
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval)
                return lastTimerCount - 1;
            })
        }, 1000)
        return () => clearInterval(interval)
    }

    useEffect(() => {
        verifyOTPSession();
        // inputRefs[0].current.focus();
        startTimer();
    }, [verifyCodeData]);

    async function verifyOTPSession() {
        try {
            let tokenData = verifyCodeData.tokenData;
            tokenData = JSON.parse(tokenData);
            await verifyOTPToken(tokenData);
        }
        catch (error) {
            router.back();
        }
    }

    // const handleTextChange = (index, text) => {
    //     if (text === '.') return;
    //     setInvalid(false);
    //     const newOtpValues = [...otpValues];
    //     newOtpValues[index] = text;

    //     if (text.length === 1 && index < 3) {
    //         inputRefs[index + 1].current.focus();
    //         setActiveInput(index + 1);
    //     } else if (text.length === 0 && index > 0) {
    //         inputRefs[index - 1].current.focus();
    //         setActiveInput(index - 1);
    //     }
    //     setOtpValues(newOtpValues);
    // };

    async function handleVerifyOTP() {
        try {
            setInvalid(false);
            setVerifying(true);
            const code = otp;
            let tokenData = verifyCodeData.tokenData;
            tokenData = JSON.parse(tokenData);

            let data = {
                code,
                tokenData: {
                    token: tokenData.token,
                    userId: tokenData.userId,
                    location: tokenData.location
                }
            }

            let res = await verifyOTPCode(data);
            await SecureStore.setItemAsync('jwt_token', JSON.stringify(res.data));
            router.push('Home');
        } catch (error) {
            setInvalid(true);
        }
        finally {
            setVerifying(false);
        }
    }

    async function handleResendOTP() {
        if (resending || timer > 0) return;
        try {
            setInvalid(false);
            setResending(true);
            let tokenData = verifyCodeData.tokenData;
            tokenData = JSON.parse(tokenData);
            await resendOTP(tokenData);
            startTimer();
        } catch (error) {
            console.error(error);
        }
        finally {
            setResending(false);
        }
    }

    return (
        <View style={{ height }}>
            <ScrollView>
                <View style={tw`w-80 mx-auto`}>
                    <View style={tw`flex-row items-center justify-between mt-5`} >
                        <Link href="../" asChild>
                            <Pressable>
                                <Image
                                    source={previous}
                                    style={tw`w-15 ml-[-10] h-15`} />
                            </Pressable>
                        </Link>
                    </View>

                    <CustomText style={[tw`text-4xl mt-4 font-extrabold`]} >{t("Screens.VerifyCode.text")}</CustomText>

                    <View style={tw`bg-[#DFEFFF] rounded-t-2xl p-4 mt-10`}>
                        <CustomText style={[tw`text-xl font-bold mt-4 mx-auto`]} >{t("Screens.VerifyCode.textPlease")}</CustomText>
                        <CustomText style={[tw`text-sm mt-4`]} >{t("Screens.VerifyCode.textAn")}</CustomText>
                        {verifyCodeData && verifyCodeData.phoneNumber && <CustomText style={[tw`text-sm mt-3 mx-auto`]} >********{verifyCodeData.phoneNumber.substring(verifyCodeData.phoneNumber.length - 2, verifyCodeData.phoneNumber.length)}</CustomText>}

                        {/* <View style={[tw`flex-row justify-between mt-8`]} >

                            {[0, 1, 2, 3].map((index) => (
                                <View key={index} style={tw`bg-gray-100 ${index == activeInput ? 'bg-blue-100 border border-blue-400 ' : ''} w-15 h-15 rounded justify-center items-center ${otpValues[index] !== '' ? 'bg-[' + primary_color + ']' : ''}`}>
                                    <TextInput
                                        selectTextOnFocus={true}
                                        ref={inputRefs[index]}
                                        onChangeText={(text) => handleTextChange(index, text)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                        value={otpValues[index]}
                                        onFocus={() => setActiveInput(index)}
                                        style={tw`text-black text-center font-bold text-4xl ${otpValues[index] !== '' ? 'text-white' : ''}`}
                                    />
                                </View>
                            ))}
                        </View> */}



                        <OtpInput
                            numberOfDigits={4}
                            focusColor="blue"
                            focusStickBlinkingDuration={500}
                            place
                            keyboardType="numeric"
                            onTextChange={(text) => setOtp(text)}
                            value={otp}
                            theme={{
                                containerStyle: styles.container,
                                pinCodeContainerStyle: styles.pinCodeContainer,
                                pinCodeTextStyle: styles.pinCodeText,
                                focusStickStyle: styles.focusStick,
                                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                                filledPinCodeContainerStyle: styles.filledPinCodeContainerStyle,
                            }}
                        />



                        {/* <CustomText style={tw`text-red-400 text-center mt-5 text-sm`}>(00:52)</CustomText> */}
                        <CustomText style={tw`text-red-500 text-center mt-5 text-sm`}>{timer > 0 ? `${timer} Seconds` : <CustomText>
                            {t("Screens.VerifyCode.textOTP")}</CustomText>}</CustomText>

                        <View style={tw`mx-auto mt-5 text-sm`} >
                            {/* <CustomText style={tw`text-center`}>
                            OTP code is valid for 3 minutes.
                        </CustomText> */}
                            <View style={tw`flex-row items-center`}>
                                <CustomText style={tw`text-center`}>
                                    {t("Screens.VerifyCode.textDidn't")}
                                </CustomText>

                                {resending && <ActivityIndicator style={tw`ml-2`} color="#000000" size="small"></ActivityIndicator>}
                                {!resending && <Pressable disabled={resending} onPress={() => handleResendOTP()} style={tw`ml-1`} >
                                    <CustomText style={tw`text-xs ${timer <= 0 ? 'text-blue-600' : 'text-gray-400'} font-extrabold underline`}>
                                        {t("Screens.VerifyCode.textResend")}
                                    </CustomText>
                                </Pressable>}
                            </View>

                            {invalid && <CustomText style={tw`mt-5 text-lg text-red-500 text-center`}>
                                {t("Screens.VerifyCode.textInvalid")}
                            </CustomText>}
                        </View>

                        <TouchableOpacity
                            onPress={() => handleVerifyOTP()}
                            disabled={timer <= 0 || verifying || resending}
                            style={[tw`rounded-full p-3 mt-10 mb-10 w-70 items-center justify-center bg-[#0058CA] ${timer <= 0 || verifying || resending ? 'opacity-60' : ''} `]}>
                            <CustomText style={tw`text-white font-bold text-lg`}>
                                {verifying && <ActivityIndicator color="#fff" size="large"></ActivityIndicator>}
                                {!verifying && <CustomText>{t("Screens.VerifyCode.btnVerify")}</CustomText>}
                            </CustomText>
                        </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity>
                        <CustomText style={tw`text-blue-500 text-xs font-extrabold ml-20 mt-7 underline`}>Privacy Terms and conditions</CustomText>
                    </TouchableOpacity> */}
                </View>
            </ScrollView >

        </View >
    )
}
const styles = StyleSheet.create({
    container: {
    },
    activePinCodeContainer: {
        backgroundColor: '#0058CA24'

    },
    filledPinCodeContainerStyle: {
        backgroundColor: 'blue',
    },
    pinCodeContainer: {
        backgroundColor: '#F5F6FA',

        width: 65,
        height: 65,
    },
    pinCodeText: {
        color: 'white',
        fontWeight: 'bold'
    },
})


