import React, { useEffect, useState } from "react";
import { View, Pressable, Image, Dimensions, ScrollView, Alert, ActivityIndicator } from "react-native";
import previous from '../../assets/images/previous.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import { Card } from "react-native-shadow-cards";
import { Link, useRouter } from "expo-router";
import CustomText from '../../components/CustomText';
import part1 from '../../assets/images/progress_2.png'
import part2 from '../../assets/images/progress_1_b.png'
import { useSelector } from "react-redux";
import { getAddRecipientData, getCardData, getFeeData, getHowMuchSendingData } from "../../store";
import { getCurrencyCodeByCountryCode, getSymbolByCountryCode } from "../../services/Countries-js";
import { formatCurrency } from "../../services/Helper";
import { useTranslation } from 'react-i18next';
import { sendTransaction } from "../../services/TransactionService";

const { width, height } = Dimensions.get('window');

const ArrivedMoney = () => {
    const router = useRouter();

    const [senderAmount, setSenderAmount] = useState('');
    const [receiverAmount, setReceiverAmount] = useState('');
    const [senderCountry, setSenderCountry] = useState('');
    const [receiverCountry, setReceiverCountry] = useState('');
    const [selectedCard, setSelectedCard] = useState('');
    const [selectedRecipient, setSelectedRecipient] = useState({});
    const [receiverName, setReceiverName] = useState('');
    const [rate, setRate] = useState('');
    const [fee, setFee] = useState(0);
    const [loading, setloading] = useState(false);
    const [paying, setPaying] = useState(false);
    const { t } = useTranslation();

    const howMuchSendingData = useSelector(getHowMuchSendingData);
    const feeData = useSelector(getFeeData);
    const cardData = useSelector(getCardData);
    const recipientData = useSelector(getAddRecipientData);

    useEffect(() => {
        setOldState();
    }, [])

    const setOldState = async () => {
        if (howMuchSendingData.senderAmount) {
            setSenderAmount(howMuchSendingData.senderAmount);
        }
        if (howMuchSendingData.receiverAmount) {
            setReceiverAmount(howMuchSendingData.receiverAmount);
        }
        if (howMuchSendingData.rate) {
            setRate(howMuchSendingData.rate);
        }
        if (howMuchSendingData.senderCountry) {
            setSenderCountry(howMuchSendingData.senderCountry);
        }
        if (howMuchSendingData.receiverCountry) {
            setReceiverCountry(howMuchSendingData.receiverCountry);
        }
        if (cardData) {
            setSelectedCard(cardData);
        }
        if (recipientData.id) {
            setSelectedRecipient(recipientData);
        }
        if (recipientData.firstName) {
            setReceiverName(recipientData.firstName + ' ' + recipientData.lastName);
        }
        if (feeData) {
            setFee(feeData);
        }
    }

    const handlePayment = async () => {
        try {
            setPaying(true);
            const data = {
                recipientName: receiverName,
                recipientCurrencyCode: getCurrencyCodeByCountryCode(receiverCountry),
                amount: senderAmount,
                rate: rate,
                deliveryMethod: 'Bank',
                selectedCard: selectedCard,
            }
            await sendTransaction(selectedRecipient.connectId, data);
            Alert.alert('Transfer Success', 'Your transaction is processed. You can check the status in transaction details.');
            router.push('/Home');
        }
        catch (err) {
            setPaying(false);
            console.log(err);
        }
    }

    if (loading)
        return (
            <View style={{ height, width }}>
                <ActivityIndicator style={tw`my-auto`} size={"large"}></ActivityIndicator>
            </View>
        );

    return (
        <View>
            <ScrollView>
                <View style={tw`flex-row items-center`}>
                    <Link href="/CardList" asChild>
                        <Pressable >
                            <Image
                                source={previous} style={tw`w-20 h-20`}
                            />
                        </Pressable>
                    </Link>
                    <View style={tw`flex-row ml-10`}>
                        <Image source={part1} />
                        <Image source={part2} style={tw`-ml-2 -mt-1`} />
                    </View>
                </View>

                <CustomText style={[tw`font-extrabold mt-2 text-3xl ml-5`]}>{t("Screens.SendConfirmation.text")}</CustomText>

                <View style={tw`mx-auto mt-7 `}>
                    <Card style={tw` p-5`}>
                        <CustomText style={tw`font-semibold text-6`}>{getCurrencyCodeByCountryCode(senderCountry)}{senderAmount} {t("Screens.SendConfirmation.textTo")} {receiverName}</CustomText>
                    </Card>
                </View>

                <View style={tw`mx-auto mt-10`}>
                    <Card >
                        <View style={tw`p-5 gap-3 `}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold text-6`}>{t("Screens.SendConfirmation.textTransfer")}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.SendConfirmation.textExchange")}</CustomText>
                                <CustomText> 1{getCurrencyCodeByCountryCode(senderCountry)}= {formatCurrency(rate)}{getCurrencyCodeByCountryCode(receiverCountry)}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.SendConfirmation.textYou")}</CustomText>
                                <CustomText>{getSymbolByCountryCode(senderCountry)}{senderAmount}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.SendConfirmation.textThey")}</CustomText>
                                <CustomText>{getSymbolByCountryCode(receiverCountry)}{receiverAmount}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.SendConfirmation.textFee")}</CustomText>
                                <CustomText>{fee}%</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.SendConfirmation.textTotal")}</CustomText>
                                <CustomText>{getSymbolByCountryCode(senderCountry)}{formatCurrency(fee / 100 * parseFloat(senderAmount) + parseFloat(senderAmount))}</CustomText>
                            </View>
                        </View>
                    </Card>
                </View>

                <Pressable
                    onPress={handlePayment}
                    disabled={paying}
                    style={tw`${CustomStyles.btnlight} mt-7 mx-10 `}
                >
                    <View style={tw`flex-row items-center py-3 gap-3`}>
                        {paying && <ActivityIndicator size={"large"}></ActivityIndicator>}
                        {!paying && <CustomText style={tw`text-[${primary_color}] font-bold text-lg`}>{t("Screens.SendConfirmation.textConfirm")}</CustomText>}
                    </View>
                </Pressable>
            </ScrollView>
        </View>
    )
}
export default ArrivedMoney;