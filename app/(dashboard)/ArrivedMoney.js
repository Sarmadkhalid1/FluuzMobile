import React, { useEffect, useState } from "react";
import { View, Pressable, Image, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import previous from '../../assets/images/previous.png';
import vector from '../../assets/images/Vector.png';
import activities from '../../assets/images/activities.png';
import dotsextra from '../../assets/images/dotsextra.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import { Card } from "react-native-shadow-cards";
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';
import { getLabelByCurrencyCode } from "../../services/Countries-js";
import { formatCurrency } from "../../services/Helper";
import { useTranslation } from 'react-i18next';


const { width, height } = Dimensions.get('screen');

const ArrivedMoney = () => {

    const [howMuchSending, setHowMuchSending] = useState()
    const [receiver, setReceiver] = useState()
    const [payoutMethod, setPayoutMethod] = useState()
    const [paymentMethod, setPaymentMethod] = useState()
    const [loading, setloading] = useState(true);
    const { t } = useTranslation();


    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        // setHowMuchSending(JSON.parse(await AsyncStorage.getItem('HowMuchSending')));
        // setReceiver(JSON.parse(await AsyncStorage.getItem('SendingTo')));
        // setPayoutMethod(JSON.parse(await AsyncStorage.getItem('payout_method')));
        // setPaymentMethod(JSON.parse(await AsyncStorage.getItem('payment_method')));
        setloading(false)
    }

    if (loading)
        return (
            <View style={[{ height, width }, tw` `]}>
                <ActivityIndicator style={tw`my-auto`} size={"large"}></ActivityIndicator>
            </View>
        );

    return (
        <View>
            <ScrollView>
                <Link href="/TransactionHistory" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw` w-20 h-20 ml-5 `}
                        />
                    </Pressable>
                </Link>

                <CustomText style={[tw`font-extrabold mt-2 text-3xl mx-10`]}>{t("Screens.ArrivedMoney.text")}</CustomText>

                <View style={tw`mx-auto mt-7 `}>
                    <Card style={tw` p-5`}>

                        <CustomText style={tw`font-semibold text-6`}>{howMuchSending.senderAmount} {t("Screens.ArrivedMoney.textTo")} {receiver.name}</CustomText>

                        <View style={tw`flex-row mt-5 w-full`}>

                            <Image source={dotsextra} />

                            <View style={tw`gap-3.5 pl-5 pr-5 w-full`}>
                                <View style={tw`flex-row justify-between`}>
                                    <CustomText style={tw`font-semibold`} >{t("Screens.ArrivedMoney.textStarting")}</CustomText>
                                    <CustomText >17:52 Nov 10</CustomText>
                                </View>
                                <View style={tw`flex-row justify-between`}>
                                    <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textWe")}</CustomText>
                                    <CustomText>17:52 Nov 10</CustomText>
                                </View>
                                <View style={tw`flex-row justify-between`}>
                                    <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textMoney")} {getLabelByCurrencyCode(howMuchSending.receiverCurrency)} </CustomText>
                                    <CustomText>17:52 Nov 10</CustomText>
                                </View>
                                <View style={tw`flex-row justify-between`}>
                                    <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textArrived")}</CustomText>
                                    <CustomText>17:52 Nov 10</CustomText>
                                </View>

                            </View>
                        </View>

                    </Card>
                </View>

                <Link href="/ShareRecipient" asChild style={tw`${CustomStyles.btnlight} mt-7 mx-10 `}>
                    <Pressable style={tw`py-3`}>
                        <CustomText style={tw`text-[${primary_color}] font-bold text-lg`}>{t("Screens.ArrivedMoney.textShare")}</CustomText>
                    </Pressable>
                </Link>
                <View style={tw`mx-auto mt-10`}>
                    <Card >
                        <View style={tw`p-5 gap-3 `}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold text-6`}>{t("Screens.ArrivedMoney.textTransfer")}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textNumber")}</CustomText>
                                <CustomText>HSDSFDGOR343</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textExchange")}</CustomText>
                                <CustomText>{formatCurrency(1, howMuchSending.senderCurrency)} = {formatCurrency(howMuchSending.rate, howMuchSending.receiverCurrency)}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textYou")}</CustomText>
                                <CustomText>{howMuchSending.senderAmount}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textThey")}</CustomText>
                                <CustomText>{howMuchSending.receiverAmount}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textFee")}</CustomText>
                                <CustomText>0</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textTotal")}</CustomText>
                                <CustomText>{howMuchSending.senderAmount}</CustomText>
                            </View>
                        </View>
                    </Card>
                </View>

                <View style={tw`mx-auto mt-7`}>
                    <Card >
                        <View style={tw`p-5 gap-3 `}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold text-6`}>{t("Screens.ArrivedMoney.textDelivery")}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textMethod")}</CustomText>
                                <CustomText>{payoutMethod.category}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textAgent")}</CustomText>
                                <CustomText>{payoutMethod.name}</CustomText>
                            </View>
                        </View>
                    </Card>
                </View>

                <View style={tw`mx-auto mt-7`}>
                    <Card >
                        <View style={tw`p-5 gap-3 `}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold text-6`}>{t("Screens.ArrivedMoney.textRecepit")}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textName")}</CustomText>
                                <CustomText>{receiver.name}</CustomText>
                            </View>
                            {/* <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>Mobile phone number</CustomText>
                                <CustomText>1$= 345KES</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>Address</CustomText>
                                <CustomText>$453</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>City</CustomText>
                                <CustomText>1000,00 KES</CustomText>
                            </View> */}
                            <View style={tw`flex-row justify-between `}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.ArrivedMoney.textCountry")}</CustomText>
                                <CustomText>{getLabelByCurrencyCode(howMuchSending.receiverCurrency)}</CustomText>
                            </View>
                        </View>
                    </Card>

                </View>
                <Card style={tw`pl-4 py-3 pr-4 mt-7 mx-auto`}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <View style={tw`flex-row items-center gap-2`}>
                            <Image style={tw`h-4 w-6`} source={activities} />
                            <CustomText style={tw`font-semibold text-lg`}>{t("Screens.ArrivedMoney.textSee")}</CustomText>
                        </View>
                        <Image source={vector} />
                    </View>
                </Card>

                <CustomText style={tw`mt-7 text-[${primary_color}] mx-auto font-semibold`}>{t("Screens.ArrivedMoney.textNeed")}</CustomText>

                <Pressable
                    style={tw` py-1 border border-[#0058CA] rounded-full items-center mt-17 mx-25 `}
                >
                    <View style={tw`flex-row items-center py-3`}>
                        <CustomText style={tw` font-black text-lg `}>{t("Screens.ArrivedMoney.textContact")}</CustomText>
                    </View>
                </Pressable>

                <Pressable
                    style={tw`${CustomStyles.btnlight} mt-7 mx-10 `}
                >
                    <View style={tw`flex-row items-center py-3 gap-3`}>
                        <CustomText style={tw`text-[${primary_color}] font-bold text-lg`}>{t("Screens.ArrivedMoney.textSchedule")}</CustomText>
                    </View>
                </Pressable>
                <Pressable
                    style={tw`${CustomStyles.btn} mt-3 mx-10 mb-25`}
                >
                    <View style={tw`flex-row items-center gap-3 py-3`}>
                        <CustomText style={tw`text-white font-bold text-lg`}>{t("Screens.ArrivedMoney.textRepeat")}</CustomText>
                    </View>
                </Pressable>
            </ScrollView>
        </View>
    )
}
export default ArrivedMoney;