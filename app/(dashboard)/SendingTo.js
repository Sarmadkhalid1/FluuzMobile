import React, { useState, useEffect } from "react";
import { View, Pressable, Image, ScrollView, Alert, ActivityIndicator, Dimensions } from "react-native";
import previous from '../../assets/images/previous.png';
import recipientsactive from '../../assets/images/recipientsactive.png';
import arrowblack from '../../assets/images/arrowblack.png';
import tw from 'twrnc';
import { primary_color, secondary_color } from '../../constants/styles';
import { Link, useRouter } from "expo-router";
import CustomText from "../../components/CustomText";
import { getLabelByCountryCode, getSymbolByCountryCode } from '../../services/Countries-js'
import * as Linking from 'expo-linking';
import { CheckBox } from '@rneui/themed';
import { getAddRecipientData, getFeeData, getHowMuchSendingData, setAddRecipientData, store } from "../../store";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getAllRecipients } from "../../services/RecipientService";
import { Card } from 'react-native-shadow-cards';
import { formatCurrency } from '../../services/Helper';

const { width, height } = Dimensions.get('screen');

const SendingTo = () => {
    const router = useRouter();
    const redirectUrl = Linking.createURL('SendingTo');

    const [senderAmount, setSenderAmount] = useState('10');
    const [rate, setRate] = useState(null);
    const [receiverCountry, setReceiverCountry] = useState('');
    const [receiverAmount, setReceiverAmount] = useState();
    const [senderCountry, setSenderCountry] = useState('');
    const [recipients, setRecipients] = useState([]);
    const [selected, setSelected] = useState('');
    const [loading, setLoading] = useState(true);
    const [priceDetail, setPriceDetail] = useState(false);
    const [fee, setFee] = useState(0);
    const [disbaled, setDisabled] = useState(true);
    const { t } = useTranslation();

    const prevStateData = useSelector(getHowMuchSendingData);
    const oldStateData = useSelector(getAddRecipientData);
    const feeStateData = useSelector(getFeeData);

    useEffect(() => {
        getPrevDetails();
        setOldState();
    }, []);

    useEffect(() => {
        if (selected) {
            setDisabled(false);
        }
    }, [selected]);

    useEffect(() => {
        if (receiverCountry) {
            getRecipients();
        }
    }, [receiverCountry]);

    const setOldState = async () => {
        try {
            if (oldStateData) {
                setSelected(oldStateData.id);
            }
        }
        catch { }
    }

    const saveStateAndNavigate = () => {
        const user = recipients.find(f => f.id == selected)
        store.dispatch(setAddRecipientData(user));
        router.push('/AddRecipients');
    }

    const getPrevDetails = async () => {
        try {
            if (prevStateData) {
                setReceiverCountry(prevStateData.receiverCountry);
                setReceiverAmount(prevStateData.receiverAmount);
                setSenderCountry(prevStateData.senderCountry);
                setSenderAmount(prevStateData.senderAmount);
                setRate(prevStateData.rate);
                if(feeStateData){
                    setFee(feeStateData);
                }
            }
            else {
                getRecipients();
            }
        }
        catch { }
    }

    const getRecipients = async () => {
        try {
            const res = await getAllRecipients(receiverCountry);
            setRecipients(res.data.filter(f => f.type === 'Recipient'));
            setLoading(false)
        }
        catch (error) {
            console.log(error);
            Alert.alert('Error', 'Unable to load recipients');
        }
    }

    if (loading) {
        return (
            <View style={[{ height, width }, tw` `]}>
                <ActivityIndicator style={tw`my-auto`} size={"large"}></ActivityIndicator>
            </View>
        );
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[tw`px-10 mb-5`, {width}]}>
                <Link href="/PayoutMethod" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw`w-20 h-20 -ml-5`}
                        />
                    </Pressable>
                </Link>
                <View style={tw`mb-5`}>
                    <CustomText style={tw`font-bold text-7`}>{t("Screens.SendingTo.text")}</CustomText>
                    <CustomText style={tw`text-5`}>{t("Screens.SendingTo.textYour")} {getLabelByCountryCode(receiverCountry)}</CustomText>
                </View>
                {recipients.map((recipient, index) => (
                    <View
                        onTouchEnd={() => setSelected(recipient.id)}
                        key={index}
                        style={[
                            tw`flex-row justify-between p-2 py-3`,
                            {
                                borderBottomWidth: index !== recipients.length - 1 ? 1 : 0,
                                borderBottomColor: index !== recipients.length - 1 ? '#0058CA' : 'transparent',
                            },
                        ]}
                    >
                        <View style={tw`flex-row gap-4 items-center`}>
                            <View style={[tw`bg-[${secondary_color}] w-10 h-10]`, { borderRadius: 50 }]}>
                                <CustomText style={tw`text-[${primary_color}] font-bold text-7 my-auto text-center capitalize`}>{recipient.firstName.charAt(0)}</CustomText>
                            </View>
                            <CustomText style={tw`font-bold text-4`}>{recipient.firstName + ' ' + recipient.lastName}</CustomText>
                        </View>
                        <View style={tw`flex-row items-center`}>
                            <CheckBox
                                checked={selected === recipient.id}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </View>
                ))}

                <Link asChild href="/PreAddRecipient?type=recipient">
                    <Pressable style={tw`flex-row justify-between ml-3.5 mr-8 mt-10`}>
                        <View style={tw`flex-row gap-3 items-center`}>
                            <Image style={tw`h-9 w-9`} source={recipientsactive} />
                            <CustomText style={tw`text-[${primary_color}] font-semibold text-4`}>{t("Screens.SendingTo.textAdd")}</CustomText>
                        </View>
                        <Image style={tw`h-5 w-3 my-auto`} source={arrowblack} />
                    </Pressable>
                </Link>

                {!priceDetail && (
                    <View style={tw`mt-10 mx-auto`}>
                        <View style={tw`flex-row items-center`}>
                            <CustomText style={tw`font-bold text-6`}>
                                {getSymbolByCountryCode(senderCountry)}
                                {formatCurrency(((fee / 100) * parseFloat(senderAmount)) + parseFloat(senderAmount))}
                            </CustomText>
                            <CustomText style={tw`font-bold text-6 ml-1`}>{t("Screens.SendingTo.textIn")}</CustomText>
                        </View>
                        <Pressable onPress={() => setPriceDetail(true)}>
                            <CustomText style={tw`text-[${primary_color}] text-5`}>
                                {t("Screens.SendingTo.textSee")}
                            </CustomText>
                        </Pressable>
                    </View>
                )}

                {priceDetail && (<View style={tw`mx-auto w-full mt-10`}>
                    <Card style={tw`w-full`}>
                        <View style={tw`px-5 py-2 gap-3`}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold text-6`}>{t("Screens.HowMuchSending.textTotal")}</CustomText>
                                {!loading && (
                                    <CustomText style={tw`font-semibold text-4`}>
                                        {getSymbolByCountryCode(senderCountry)}
                                        {formatCurrency(((fee / 100) * parseFloat(senderAmount)) + parseFloat(senderAmount))}
                                    </CustomText>
                                )}
                                {loading && <ActivityIndicator size="small" />}
                            </View>
                            <View style={tw`flex-row justify-between pb-2`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.HowMuchSending.textFee")}</CustomText>
                                {!loading && (
                                    <CustomText>
                                        {getSymbolByCountryCode(senderCountry)}
                                        {formatCurrency((fee / 100) * senderAmount)}
                                    </CustomText>
                                )}
                                {loading && <ActivityIndicator size="small" />}
                            </View>
                        </View>
                        <View style={tw`flex-row`}>
                            <View style={tw`bg-[${primary_color}] h-[.3] grow`}></View>
                        </View>
                        <View style={tw`px-5 py-2 pb-4 gap-3`}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.HowMuchSending.textRate")}</CustomText>
                                {!loading && (
                                    <View style={tw`flex-row`}>
                                        <CustomText>
                                            {getSymbolByCountryCode(senderCountry)}
                                            {formatCurrency(1)} ={' '}
                                        </CustomText>
                                        <CustomText>
                                            {getSymbolByCountryCode(receiverCountry)}
                                            {formatCurrency(rate)}
                                        </CustomText>
                                    </View>
                                )}
                                {loading && <ActivityIndicator size="small" />}
                            </View>
                        </View>
                    </Card>
                </View>
                )}

                <Pressable
                    onPress={() => saveStateAndNavigate()}
                    style={tw`${CustomStyles.btn} mt-5 py-3 mx-10 ${disbaled ? 'bg-[#0058CA99]' : ''}`}
                    disabled={disbaled}
                >
                    <CustomText style={tw`text-white font-bold text-lg `}>{t("Screens.SendingTo.textNext")}</CustomText>

                </Pressable>
            </View>
        </ScrollView>
    )
}
export default SendingTo;