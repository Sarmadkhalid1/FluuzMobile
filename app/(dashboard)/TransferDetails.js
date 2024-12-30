import React, { useEffect, useState } from "react";
import { View, Pressable, Image, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import previous from '../../assets/images/previous.png';
import dotsextra from '../../assets/images/dotsextra.png';
import location from '../../assets/images/location2.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import { Link, useLocalSearchParams, usePathname, router } from "expo-router";
import CustomText from '../../components/CustomText';
import { getTransactionById } from "../../services/TransactionService";
import { getLabelByCountryCode, getSymbolByCountryCode } from "../../services/Countries-js";
import { formatCurrency } from "../../services/Helper";
import { useTranslation } from 'react-i18next';
import { getRecipientByConnectId } from '../../services/RecipientService';
import { useSelector } from "react-redux";
import { getFeeData, getHowMuchSendingData } from "../../store";


const { width, height } = Dimensions.get('screen');

const TransferDetails = () => {
    const params = useLocalSearchParams();

    const [transactionDetails, setTransactionDetails] = useState({});
    const [selectedOption, setSelectedOption] = useState('timeline');
    const [country, setCountry] = useState('');
    const [senderCountry, setSenderCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const [fee, setFee] = useState(0);
    const { t } = useTranslation();

    const feeStateData = useSelector(getFeeData);
    const oldStateData = useSelector(getHowMuchSendingData);


    useEffect(() => {
        if (params) {
            onLoad(params.id);
        }
    }, [usePathname()])


    const getRecipientCountry = async (transactionDetails) => {
        try {
            let response = await getRecipientByConnectId(transactionDetails.connectId);
            setCountry(response.data.country);
        } catch (error) {
            console.error(error);
        }
    }

    async function onLoad(id) {
        try {
            const res = await getTransactionById(id);
            setTransactionDetails(res.data);
            getRecipientCountry(res.data);
            if(feeStateData){
                setFee(feeStateData);
            }
            if(oldStateData){
                setSenderCountry(oldStateData.senderCountry)
            }
            setLoading(false);
        }
        catch (error) {
            router.push("/TransactionHistory");
        }
    }

    function formatDate(value) {
        var date = new Date(value)
        var hours = date.getHours();
        var minutes = date.getMinutes();

        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var monthName = months[date.getMonth()];
        var day = date.getDate();
        var formattedDate = hours + ':' + minutes + ' ' + monthName + ' ' + day;

        return formattedDate;
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

                <CustomText style={[tw`font-extrabold mb-5 text-2xl mx-auto`]}>{t("Screens.TransferDetails.text")}</CustomText>

                <View style={tw`flex-row mx-10`}>
                    <TouchableOpacity
                        style={[
                            tw`border-b-2 grow`,
                            selectedOption === 'timeline' ? { borderColor: '#0058CA' } : { borderColor: '#def' }
                        ]}
                        onPress={() => setSelectedOption('timeline')}
                    >
                        <CustomText style={[tw`text-center `, selectedOption === 'timeline' ? { color: '#0058CA' } : { color: '#000' }]}>{t("Screens.TransferDetails.textTimeline")}</CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            tw`border-b-2 grow`,
                            selectedOption === 'summary' ? { borderColor: '#0058CA' } : { borderColor: '#def' }
                        ]}
                        onPress={() => setSelectedOption('summary')}
                    >
                        <CustomText style={[tw`text-center`, selectedOption === 'summary' ? { color: '#0058CA' } : { color: '#000' }]}>{t("Screens.TransferDetails.textSummary")}</CustomText>
                    </TouchableOpacity>
                </View>

                {selectedOption === 'timeline' && (
                    <View style={tw` mx-10 mt-10`}>
                        <View style={tw`gap-3`}>

                            <View style={tw`flex-row justify-between border-b pb-2 px-3 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textTransfer")}</CustomText>
                                <CustomText>{transactionDetails.transferNumber}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 px-3 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textStatus")}</CustomText>
                                <CustomText>{transactionDetails.status}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 px-3 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textRecipient")}</CustomText>
                                <CustomText>{transactionDetails.recipientName}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 px-3 border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textThey")}</CustomText>
                                <CustomText>{getSymbolByCountryCode(country)}{transactionDetails.amount}</CustomText>
                            </View>
                        </View>

                        {/* <View style={tw`mx-auto mt-10`}>

                            <View style={tw`flex-row  w-full`}>

                                <Image style={tw`h-33`} source={dotsextra} />

                                <View style={tw`gap-3.5 pl-5 pr-5 w-full`}>
                                    <View style={tw`flex-row justify-between`}>
                                        <CustomText style={tw`font-semibold`} >{t("Screens.TransferDetails.textStarting")}</CustomText>
                                        <CustomText>{formatDate(transactionDetails.createdDate)}</CustomText>
                                    </View>
                                    <View style={tw`flex-row justify-between`}>
                                        <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textWe")}</CustomText>
                                        <CustomText>{formatDate(transactionDetails.createdDate)}</CustomText>
                                    </View>
                                    <View style={tw`flex-row justify-between`}>
                                        <CustomText style={tw`font-semibold w-50`}>{t("Screens.TransferDetails.textMoney")} {getLabelByCountryCode(country)} </CustomText>
                                        <CustomText>{formatDate(transactionDetails.createdDate)}</CustomText>
                                    </View>
                                    <View style={tw`flex-row justify-between`}>
                                        <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textpaid")}</CustomText>
                                        <CustomText>{formatDate(transactionDetails.createdDate)}</CustomText>
                                    </View>

                                </View>
                            </View>
                        </View> */}
                    </View>

                )}

                {selectedOption === 'summary' && (
                    <View style={tw` mx-10 mt-10`}>
                        <View style={tw`gap-3`}>
                            <View style={tw`flex-row justify-between px-3`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textTransfer")}</CustomText>
                                <CustomText>{transactionDetails.transferNumber}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between px-3 `}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textRecipient")}</CustomText>
                                <CustomText>{transactionDetails.recipientName}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between px-3`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textDestination")}</CustomText>
                                <CustomText>{getLabelByCountryCode(country)}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between pb-2 px-3`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textDelivery")}</CustomText>
                                <CustomText>{transactionDetails.deliveryMethod}</CustomText>
                            </View>

                            {transactionDetails.deliveryMethod == 'cash' &&
                                <View style={tw`ml-auto flex-row gap-2 pr-2 items-center`}>
                                    <CustomText style={tw`font-bold`}>{t("Screens.TransferDetails.textSee")}</CustomText>
                                    <Image style={tw`w-4.5 h-5`} source={location} />
                                </View>
                            }

                            <View style={tw`flex-row`}>
                                <View style={tw`bg-[${primary_color}] h-[.3] grow`}></View>
                            </View>

                            <View style={tw`flex-row justify-between px-3 `}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textYou")}</CustomText>
                                <CustomText>{getSymbolByCountryCode(senderCountry)} {formatCurrency(transactionDetails.amount)}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between px-3`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textFee")}</CustomText>
                                <CustomText>{fee}%</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between px-3 `}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textTotal")}</CustomText>
                                <CustomText>{getSymbolByCountryCode(senderCountry)} {formatCurrency((fee / 100) * parseFloat(transactionDetails.amount) + parseFloat(transactionDetails.amount))}</CustomText>
                            </View>

                            {transactionDetails.deliveryMethod == 'cash' &&

                                <View style={tw`ml-auto flex-row gap-2 pr-2 items-center`}>
                                    <CustomText style={tw`font-bold`}>{t("Screens.TransferDetails.textView")}</CustomText>
                                    <Image style={tw`w-4.5 h-5`} source={location} />
                                </View>
                            }

                            <View style={tw`flex-row`}>
                                <View style={tw`bg-[${primary_color}] h-[.3] grow`}></View>
                            </View>

                            <View style={tw`flex-row justify-between pb-2 px-3  border-b border-[${primary_color}]`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textExchange")}</CustomText>
                                <CustomText>{transactionDetails.rate}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between px-3`}>
                                <CustomText style={tw`font-semibold`}>{t("Screens.TransferDetails.textThey")}</CustomText>
                                <CustomText>{getSymbolByCountryCode(country)}{transactionDetails.amount}</CustomText>
                            </View>
                        </View>
                    </View>
                )}

                {/* <Pressable
                    style={tw`${CustomStyles.btn} mt-5 mx-10 mb-5`}
                >
                    <View style={tw`flex-row items-center gap-3 py-3`}>
                        <CustomText style={tw`text-white font-bold text-lg`}>{t("Screens.TransferDetails.textSend")}</CustomText>
                    </View>
                </Pressable> */}

            </ScrollView>
        </View>
    )
}
export default TransferDetails;