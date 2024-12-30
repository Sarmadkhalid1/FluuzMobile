import React, { useState, useEffect } from 'react';
import { View, Pressable, Image, Dimensions, ScrollView, Alert, ActivityIndicator, StyleSheet } from "react-native";
import previous from '../../assets/images/previous.png';
import dotstwo from '../../assets/images/dotstwo.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import { Card } from 'react-native-shadow-cards';
import { Link, useRouter } from "expo-router";
import { TextInput } from "react-native";
import CustomText from '../../components/CustomText';
import { getDailyRates } from "../../services/RaypdService";
import { getLoginUserCountry } from "../../services/AuthService";
import { getLabelByCountryCode, getFlagByCountryCode, getSymbolByCountryCode, getCurrencyCodeByCountryCode } from '../../services/Countries-js';
import { Dropdown } from 'react-native-element-dropdown';
import { formatCurrency } from '../../services/Helper';
import { getHowMuchSendingData, getSavedRecipientData, setHowMuchSendingData, setAddRecipientData, setSavedRecipientData, store, getFeeData } from '../../store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


const { width, height } = Dimensions.get('window');

const HowMuchSending = () => {
    const router = useRouter();

    const [senderAmount, setSenderAmount] = useState('10');
    const [receiverAmount, setReceiverAmount] = useState('');
    const [senderCountry, setSenderCountry] = useState('');
    const [fee, setFee] = useState(0);
    const [receiverCountry, setReceiverCountry] = useState('AE');
    const [rate, setRate] = useState(null);
    const [checking, setChecking] = useState(false);
    const [loading, setLoading] = useState(true);
    const [payoutMethod, setPayoutMethod] = useState('');
    const { t } = useTranslation();


    const payoutMethods = [
        // { label: 'Card', value: 'card' },
        { label: 'Bank', value: 'bank' },
        // { label: 'Cash', value: 'cash' },
        { label: 'Wallet', value: 'wallet' },
    ]

    const oldStateData = useSelector(getHowMuchSendingData);

    const savedRecipientData = useSelector(getSavedRecipientData);

    const stateFee = useSelector(getFeeData)

    useEffect(() => {
        getUserCurrency();
    }, []);

    useEffect(() => {
        if (senderCountry && receiverCountry) {
            handleDailyRates();
        }
    }, [senderCountry, receiverCountry]);

    const setOldState = async () => {
        try {
            if (oldStateData.senderAmount) {
                setSenderAmount(oldStateData.senderAmount);
            }
            if (oldStateData.receiverAmount) {
                setReceiverAmount(oldStateData.receiverAmount);
            }
            if (oldStateData.rate) {
                setRate(oldStateData.rate);
            }
            if (oldStateData.senderCountry) {
                setSenderCountry(oldStateData.senderCountry);
            }
            if (oldStateData.receiverCountry) {
                setReceiverCountry(oldStateData.receiverCountry);
            }
            if (oldStateData.payoutMethod) {
                setPayoutMethod(oldStateData.payoutMethod)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const saveStateAndNavigate = async () => {
        try {
            if (!payoutMethod) {
                Alert.alert('Error', 'Please select delivery method')
                return;
            }
            if (payoutMethod === 'wallet') {
                Alert.alert('Coming soon', 'You will be able to send money to E-Wallets shortly stay tunned.')
                return;
            }
            setChecking(true);
            const theState = {
                senderAmount,
                senderCountry,
                receiverAmount,
                receiverCountry,
                rate,
                payoutMethod,
            }
            store.dispatch(setHowMuchSendingData(theState));
            if (savedRecipientData.id) {
                store.dispatch(setAddRecipientData(savedRecipientData));
                store.dispatch(setSavedRecipientData({
                    id: null,
                    firstName: null,
                    lastName: null,
                    email: null,
                    phone: null,
                    userId: null,
                    connectId: null
                }));
                router.push('/AddRecipients');
            }
            else {
                router.push('/SendingTo');
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setChecking(false)
        }
    }

    const getUserCurrency = async () => {
        try {
            let response = await getLoginUserCountry();
            setSenderCountry(response.data);
            setSenderAmount(formatCurrency(senderAmount));
            setFee(stateFee);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSenderCurrency = async (value) => {
        setLoading(true)
        value = formatCurrency(value)
        setSenderAmount(value);
        let recAmount = ((value == '' ? 0 : parseFloat(value)) * rate).toString()
        recAmount = formatCurrency(recAmount)
        setReceiverAmount(recAmount);
        setLoading(false)
    }

    const handleRecCurrency = async (value) => {
        setLoading(true)
        value = formatCurrency(value);
        setReceiverAmount(value);
        let t = (value == '' ? 0 : parseFloat(value)) / rate
        setSenderAmount(formatCurrency((t).toString()));
        setLoading(false)
    }

    const handleDailyRates = async () => {
        try {
            const res = await getDailyRates(getCurrencyCodeByCountryCode(senderCountry), getCurrencyCodeByCountryCode(receiverCountry));
            setRate(parseFloat(res.data));
            let amount = senderAmount == '' ? 0 : parseFloat(senderAmount);
            let recAmount = (parseFloat(amount) * res.data).toString();
            recAmount = formatCurrency(recAmount)
            setReceiverAmount(recAmount);
            setLoading(false);
            setOldState();
        }
        catch (error) {
            console.log(error);
            Alert.alert('Country Not Supported', getLabelByCountryCode(senderCountry) + ' is not supported to send money in ' + getLabelByCountryCode(receiverCountry));
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[{ backgroundColor: 'white', height, width }, tw`mb-32`]}>
                <Link href="Home" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw` w-20 h-20 ml-5`}
                        />
                    </Pressable>
                </Link>

                <View style={tw`mx-10`}>
                    <CustomText style={tw` font-bold text-7`}>{t("Screens.HowMuchSending.text")}</CustomText>
                    <View style={tw`flex-row gap-1 items-center`}>
                        <CustomText style={tw`text-5`}>{t("Screens.HowMuchSending.textSending")}</CustomText>
                        <View style={tw`flex-row`}>
                            {!loading && <CustomText style={tw`text-5 font-semibold text-[${primary_color}]`}>
                                {getLabelByCountryCode(receiverCountry)}
                            </CustomText>}
                            {loading && <ActivityIndicator size="small" />}
                            {/* <Image style={tw`w-4.5 h-3 my-auto ml-1`} source={downarrow} /> */}
                        </View>
                    </View>
                </View>

                <View style={tw`mx-10 justify-between mt-9 flex-row`}>
                    <Image style={tw`h-30 mr-7 w-7 mt-3`} source={dotstwo} />

                    <View >
                        <View >
                            <Card style={tw`pt-1 px-3 h-16 w-60`} >
                                <CustomText style={tw`font-semibold text-4`}>{t("Screens.HowMuchSending.textYou")}</CustomText>
                                <View style={tw`flex-row justify-between pb-2`}>
                                    <View style={tw`flex-row items-center`}>
                                        {!loading &&
                                            <>
                                                <CustomText style={tw`text-5 font-bold`}>{getSymbolByCountryCode(senderCountry)}</CustomText>
                                                <TextInput style={tw`text-5 font-bold w-23`} keyboardType="numeric" editable={true} value={senderAmount} onChangeText={handleSenderCurrency}></TextInput>
                                            </>
                                        }
                                        {loading && <ActivityIndicator size="small" />}
                                    </View>
                                    <View style={tw`pb-1`}>
                                        {!loading && senderCountry &&
                                            <>
                                                <Image style={tw`h-4 w-6 ml-auto mt-[-5]`} source={getFlagByCountryCode(senderCountry)} />
                                                <CustomText style={tw`text-3 ml-1 my-auto w-25 text-right`} numberOfLines={1}>{getLabelByCountryCode(senderCountry)}</CustomText>
                                            </>
                                        }
                                    </View>
                                </View>
                            </Card>
                        </View>

                        <View style={tw`mt-3`}>
                            <Card style={tw`pt-1 px-3 h-16 w-60`} >
                                <CustomText style={tw`font-semibold text-4`}>{t("Screens.HowMuchSending.textThey")}</CustomText>
                                <View style={tw`flex-row justify-between pb-2`}>
                                    <View style={tw`flex-row items-center`}>
                                        {!loading &&
                                            <>
                                                <CustomText style={tw`text-5 font-bold`}>{getSymbolByCountryCode(receiverCountry)}</CustomText>
                                                <TextInput style={tw`text-5 font-bold w-23`} keyboardType="numeric" value={receiverAmount} editable={true} onChangeText={handleRecCurrency}></TextInput>
                                            </>
                                        }
                                        {loading && <ActivityIndicator size="small" />}
                                    </View>
                                    <View style={tw`pb-1`}>
                                        {!loading && receiverCountry &&
                                            <>
                                                <Image style={tw`h-4 w-6 ml-auto mt-[-5]`} source={getFlagByCountryCode(receiverCountry)} />
                                                <CustomText style={tw`text-3 ml-1 my-auto w-25 text-right`} numberOfLines={1}>{getLabelByCountryCode(receiverCountry)}</CustomText>
                                            </>
                                        }
                                    </View>
                                </View>
                            </Card>
                        </View>
                    </View>
                </View>

                <View style={tw`mx-5`}>
                    {/* change currency */}
                    <Link href={"/SendTo?comingFrom=HowMuchSending"} asChild>
                        <Pressable
                            style={tw`border border-[#0058CA] rounded-full items-center py-2 mt-9`}
                        >
                            <CustomText style={tw`font-semibold text-lg font-bold`}>{t("Screens.HowMuchSending.textChange")}</CustomText>
                        </Pressable>
                    </Link>

                    {/* Delivery method dropdown */}
                    <CustomText style={tw`mt-5`}>{t("Screens.HowMuchSending.textDelivery")}</CustomText>
                    <Card>
                        <Dropdown
                            style={tw`w-full p-3 rounded capitalize`}
                            data={payoutMethods}
                            value={payoutMethod}
                            valueField="value"
                            labelField="label"
                            placeholder="Select"
                            onChange={item => { setPayoutMethod(item.value) }}
                        />
                    </Card>
                </View>

                <View style={tw`mx-auto mt-10`}>
                    <Card >
                        <View style={tw`px-5 py-2 gap-3`}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold text-6`}>{t("Screens.HowMuchSending.textTotal")}</CustomText>
                                {!loading &&
                                    <CustomText style={tw`font-semibold text-4`}>{getSymbolByCountryCode(senderCountry)}{formatCurrency(((fee / 100) * parseFloat(senderAmount)) + parseFloat(senderAmount))}</CustomText>
                                }
                                {loading && <ActivityIndicator size="small" />}
                            </View>
                            <View style={tw`flex-row justify-between pb-2`}>
                                <CustomText style={tw`font-semibold`} >{t("Screens.HowMuchSending.textFee")}</CustomText>
                                {!loading &&
                                    <CustomText>{getSymbolByCountryCode(senderCountry)}{formatCurrency((fee / 100) * senderAmount)}</CustomText>
                                }
                                {loading && <ActivityIndicator size="small" />}
                            </View>
                        </View>
                        <View style={tw`flex-row`}>
                            <View style={tw`bg-[${primary_color}] h-[.3] grow`}></View>
                        </View>
                        <View style={tw`px-5 py-2 pb-4 gap-3`}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.HowMuchSending.textRate")}</CustomText>
                                {!loading &&
                                    <View style={tw`flex-row`}>
                                        <CustomText>{getSymbolByCountryCode(senderCountry)}{formatCurrency(1)} = </CustomText>
                                        <CustomText>{getSymbolByCountryCode(receiverCountry)}{formatCurrency(rate)}</CustomText>
                                    </View>
                                }
                                {loading && <ActivityIndicator size="small" />}
                            </View>
                        </View>
                    </Card>
                </View>

                <Pressable disabled={checking || loading} onPress={saveStateAndNavigate}
                    style={tw`${CustomStyles.btn} mt-6 py-3 mx-10`}
                >
                    {(checking) && <ActivityIndicator size={'large'}></ActivityIndicator>}
                    {!checking && <CustomText style={tw`text-white font-bold text-lg`}>{t("Screens.HowMuchSending.textNext")}</CustomText>}
                </Pressable>
            </View>
        </ScrollView >
    )
}
export default HowMuchSending;

const styles = StyleSheet.create({
    dropdown: {
        width: 90,
        height: 40,
        marginStart: 150,
        backgroundColor: 'white',
        padding: 6,
    },
})