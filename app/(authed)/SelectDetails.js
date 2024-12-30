import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, Dimensions, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import React, { useState, useRef, useEffect } from 'react';
import tw from 'twrnc';
import { Dropdown } from 'react-native-element-dropdown';
import PhoneInput from "react-native-phone-number-input";
import CustomText from '../../components/CustomText';
import CustomStyles from '../../constants/styles'
import { MobileAndCountryCodeAdded, addPhoneAndCountry } from '../../services/AuthService'
import SplashScreen from "../../components/SplashScreen"
import { getCountryList } from '../../services/Countries-js';
import { useTranslation } from 'react-i18next';


const { width, height } = Dimensions.get('window');

export default function SelectDetails() {
    const countryList = getCountryList();

    const [showCountryCode, setShowCountryCode] = useState(false);
    const [showPhoneInput, setShowPhoneInput] = useState(false);
    const [phoneError, setphoneError] = useState(false);
    const [countryCodeError, setcountryCodeError] = useState(false);

    const [countryCode, setCountryCode] = useState('');
    const [phoneValue, setphoneValue] = useState('');
    const phoneInput = useRef(null);
    const [submiting, setSubmiting] = useState(false);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        init();
    }, [])

    async function init() {
        try {
            let res = await MobileAndCountryCodeAdded();
            const { phone, country } = res.data;
            if (phone && country) {
                router.push(`Home`);
            }
            setShowCountryCode(!country);
            setShowPhoneInput(!phone);
            setCountryCode(country ?? '');
            setphoneValue(phone ?? '');
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handlePhoneInputChange = (value) => {
        if (!phoneInput.current?.isValidNumber(value)) {
            setphoneError(true);
            return
        }
        setphoneError(false);
        setphoneValue(value)
    };

    async function submit() {
        if (verfify() || submiting) {
            return;
        }
        setSubmiting(true);

        try {
            let item = countryList.find(f => f.countryCode == countryCode);
            const data = {
                phone: showPhoneInput ? phoneInput.current.getNumberAfterPossiblyEliminatingZero().formattedNumber.replace(" ", "") : phoneValue,
                countrycode: item.countryCode,
                currency: item.currencyCode
            }
            await addPhoneAndCountry(data);
            router.push('/Home');
        } catch (error) {
            console.log(error);
        }
        finally {
            setSubmiting(false);
        }
    }

    if (loading)
        return <SplashScreen />

    function verfify() {
        if (showCountryCode && countryCode == "") {
            setcountryCodeError(true);
            return true;
        }
        setcountryCodeError(false);
        return false;
    }


    return (
        <View style={{ height }}>
            <ScrollView>
                <View style={tw`w-80 mx-auto mt-10`}>

                    <CustomText style={[tw`text-3xl mt-4 font-extrabold`]} >{t("Screens.SelectDetails.text")}</CustomText>
                    {showCountryCode &&
                        <>
                            <CustomText style={[tw`text-lg mt-5 font-bold`]}>{t("Screens.SelectDetails.textSelect")}</CustomText>
                            <Dropdown
                                style={[tw`w-full`, styles.dropdown]}
                                data={countryList}
                                maxHeight={300}
                                labelField="label"
                                search={true}
                                value={countryCode}
                                valueField="countryCode"
                                placeholder="Select country"
                                onChange={(item) => setCountryCode(item.countryCode)}
                            />
                            {countryCodeError &&
                                <CustomText style={tw`mt-2 text-red-500`}>{t("Screens.SelectDetails.textPlease")}</CustomText>
                            }
                        </>
                    }

                    {showPhoneInput &&
                        <>
                            <CustomText style={[tw`text-lg mt-4 font-bold`]}>{t("Screens.SelectDetails.textPhone")}</CustomText>
                            <PhoneInput
                                ref={phoneInput}
                                defaultValue={phoneValue}
                                defaultCode="SE"
                                layout="first"
                                onChangeText={handlePhoneInputChange}
                                withShadow
                            />

                            {phoneError &&
                                <CustomText style={tw`mt-2 text-red-500`}>{t("Screens.SelectDetails.textValid")}</CustomText>
                            }
                        </>
                    }

                    <TouchableOpacity disabled={submiting} style={tw`${CustomStyles.btn} ${submiting ? 'opacity-60' : ''} p-3 mt-20`} onPress={() => submit()} >
                        {submiting && <ActivityIndicator color="#fff" size="large"></ActivityIndicator>}
                        {!submiting && <CustomText style={tw`text-white font-bold text-lg`}>{t("Screens.SelectDetails.textContinue")}</CustomText>}
                    </TouchableOpacity>
                </View>



                <TouchableOpacity>
                    <CustomText style={tw`text-blue-500 text-xs font-extrabold text-center mt-7`}>{t("Screens.SelectDetails.textPrivacy")}</CustomText>
                </TouchableOpacity>

            </ScrollView>

        </View>
    )
}

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