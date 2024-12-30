import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, ScrollView, ActivityIndicator, Alert, Dimensions, TextInput } from "react-native";
import person from '../../assets/images/person.png';
import person3 from '../../assets/images/person3.png';
import news from '../../assets/images/news.png';
import charity from '../../assets/images/charity.png';
import grayphline from '../../assets/images/grayphline.png';
import first from '../../assets/images/first.png';
import second from '../../assets/images/second.png';
import third from '../../assets/images/third.png';
import transectiondetail from '../../assets/images/transectiondetail.png';
import tw from 'twrnc';
import { Card } from 'react-native-shadow-cards';
import { Link, router, } from "expo-router";
import CustomText from '../../components/CustomText';
import { getFee, getTransactionHistory } from '../../services/TransactionService';
import { getDailyRates } from '../../services/RaypdService';
import { Blurred } from '../../components/Blurred';
import { getCurrencyCodeByCountryCode, getFlagByCountryCode, getLabelByCountryCode, getSymbolByCountryCode } from '../../services/Countries-js';
import { formatCurrency } from '../../services/Helper';
import { getLoginUserCountry } from '../../services/AuthService';
import { primary_color, secondary_color } from '../../constants/styles';
import { getHowMuchSendingData, setAddRecipientData, setCameFrom, setFee, setHowMuchSendingData, setSavedRecipientData, store } from '../../store';
import { useTranslation } from 'react-i18next';
import { getAllRecipients, getRecipientByConnectId } from '../../services/RecipientService';
import { formatDate, formatTime, getAmPm } from '../../services/Helper';
import { useSelector } from 'react-redux';


const { width, height } = Dimensions.get('screen');

const Home = () => {
    const [recipients, setReciepents] = useState([]);
    const [transactionList, setTransactionList] = useState([]);
    const [senderCountry, setSenderCountry] = useState('');
    const [senderAmount, setSenderAmount] = useState('10');
    const [receiverAmount, setReceiverAmount] = useState('');
    const [receiverCountry, setReceiverCountry] = useState('AE');
    const [loading, setLoading] = useState(true);
    const [rate, setRate] = useState(null);
    const [pageloading, setpageLoading] = useState(true);
    const { t } = useTranslation();

    const oldStateData = useSelector(getHowMuchSendingData);


    useEffect(() => {
        getUserCountry();
    }, [])

    useEffect(() => {
        if (senderCountry && receiverCountry) {
            handleDailyRates();
            load()
        }
    }, [senderCountry, receiverCountry]);

    const load = async () => {
        try {
            let fee = await getFee();
            store.dispatch(setFee(fee.data));
            let res = await getAllRecipients("");
            if (res.data.length > 0) {
                setReciepents(res.data);
            }
            res = await getTransactionHistory();
            setTransactionList(res.data.slice(0, 4));
            setpageLoading(false);
        } catch (error) {
            console.log(error)
        }
        finally {
            setpageLoading(false);
        }
    }

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
        }
        catch (error) {
            console.log(error);
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

    const getUserCountry = async () => {
        try {
            let response = await getLoginUserCountry();
            setSenderCountry(response.data);
            setSenderAmount(formatCurrency(senderAmount));
        } catch (error) {
            console.error(error);
        }
    }

    function send() {
        store.dispatch(setHowMuchSendingData({ senderAmount, receiverAmount, rate, senderCountry, receiverCountry }));
    }

    function setRecipient(recipient) {
        store.dispatch(setHowMuchSendingData({ receiverCountry: recipient.country }));
        store.dispatch(setSavedRecipientData(recipient));
        router.push('/HowMuchSending');
    }

    function goToCurrencySelect() {
        store.dispatch(setCameFrom('/Home'));
        router.push('/SendTo');
    }

    const handleRoute = async (id, status, connectId) => {
        if (status === 'MoreDetails') {
            let response = await getRecipientByConnectId(connectId);
            store.dispatch(setAddRecipientData(response.data));
            store.dispatch(setCameFrom(`/Home`));
            router.push('/AddRecipients');
        }
        else {
            router.push('/TransferDetails?id=' + id);
        }
    }

    const Badge = ({ status }) => {
        let badgeStyle = '';
        let badgeText = '';

        switch (status.toLowerCase()) {
            case 'approved':
                badgeStyle = 'bg-green-500';
                badgeText = 'Approved';
                break;
            case 'reject':
            case 'moredetails':
                badgeStyle = 'bg-red-500';
                badgeText = status === 'reject' ? 'Rejected' : 'More Details';
                break;
            case 'pending':
                badgeStyle = 'bg-yellow-500';
                badgeText = 'Pending';
                break;
            default:
                badgeStyle = 'bg-gray-500';
                badgeText = 'Unknown';
        }
        return (
            <View style={tw`px-2 py-1 rounded-full text-center ${badgeStyle}`}>
                <CustomText style={tw`text-white text-center text-xs`}>{badgeText}</CustomText>
            </View>
        );
    };

    if (pageloading)
        return (
            <View style={{ height, width }}>
                <ActivityIndicator style={tw`my-auto`} size={"large"}></ActivityIndicator>
            </View>
        );

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Link href="/Profile" asChild>
                        <Pressable>
                            <Image source={person} style={tw`w-10 h-10 mr-5 mt-4 rounded-full`} />
                        </Pressable>
                    </Link>
                </View>

                <CustomText style={tw`mx-5 text-2xl font-bold`}>{t("Screens.Home.text")}</CustomText>
                <CustomText style={tw`mx-5 mt-2 text-sm text-gray-500`}>{t("Screens.Home.textFavorite")}</CustomText>
                {recipients.length == 0 &&
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-3 mx-5`}>
                        <View style={tw`flex-row gap-5 mx-1`}>
                            {/* <BlurReceipent name="Martha" image={person2} />
                            <BlurReceipent name="John Doe" image={person} />
                            <BlurReceipent name="Angelo" image={person2} />
                            <BlurReceipent name="Carlos" image={person} /> */}

                            <Image style={tw`h-40 w-40 rounded-xl`} source={first} />
                            <Image style={tw`h-40 w-40 rounded-xl`} source={second} />
                            <Image style={tw`h-40 w-40 rounded-xl`} source={third} />
                            <Image style={tw`h-40 w-40 rounded-xl`} source={third} />
                            <Image style={tw`h-40 w-40 rounded-xl`} source={third} />
                            <Image style={tw`h-40 w-40 rounded-xl`} source={third} />
                        </View>
                    </ScrollView>
                }
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-3 ml-4`}>
                    {recipients.map((recipient, index) => (
                        <Pressable key={recipient.id} onPress={() => setRecipient(recipient)}>
                            <Card style={tw`border border-gray-200 my-3 ml-1 p-5 w-35${index !== 0 ? ' ml-3' : ''}`}>
                                {/* <Image style={tw`w-20 h-20 rounded-full mx-auto`} source={person2} /> */}
                                <View style={[tw`bg-[${secondary_color}] mx-auto w-15 h-15]`, { borderRadius: 50 }]}>
                                    <CustomText style={tw`text-[${primary_color}] font-bold text-7 my-auto text-center capitalize`}>{recipient.firstName.charAt(0)}</CustomText>
                                </View>
                                <CustomText style={tw`mt-2 text-xs text-center`} numberOfLines={1}>{recipient.firstName + ' ' + recipient.lastName}</CustomText>
                            </Card>
                        </Pressable>
                    ))}
                </ScrollView>


                <CustomText style={tw`mx-5 mb-2 mt-5 text-sm text-gray-500`}>{t("Screens.Home.textCurrency")}</CustomText>
                <View style={tw`flex-row gap-3 mx-auto`}>
                    <Card style={tw`pl-4 pt-4 pb-2 w-43`}>
                        <View style={tw`flex-row gap-2 mb-10`}>
                            {senderCountry &&
                                <Image style={tw`h-4 w-6`} source={getFlagByCountryCode(senderCountry)} />
                            }
                            <CustomText style={tw`text-3`}>{getCurrencyCodeByCountryCode(senderCountry)}</CustomText>
                        </View>
                        <View style={tw`flex-row items-center`}>
                            <CustomText style={tw`text-5 font-bold`}>{getSymbolByCountryCode(senderCountry)}</CustomText>
                            <TextInput style={tw`text-5 font-bold w-30`} keyboardType="numeric" editable={true} value={senderAmount} onChangeText={handleSenderCurrency}></TextInput>
                        </View>
                    </Card>
                    <Card style={tw`pl-4 pt-4 w-43`}>
                        <Pressable onPress={() => goToCurrencySelect()}>
                            <View style={tw`flex-row gap-2 mb-10`}>
                                {receiverCountry &&
                                    <Image style={tw`h-4 w-6`} source={getFlagByCountryCode(receiverCountry)} />
                                }
                                <CustomText style={tw`text-3`}>{getCurrencyCodeByCountryCode(receiverCountry)}</CustomText>
                            </View>
                        </Pressable>
                        <View style={tw`flex-row items-center`}>
                            {!loading &&
                                <>
                                    <CustomText style={tw`text-5 font-bold`}>{getSymbolByCountryCode(receiverCountry)}</CustomText>
                                    <TextInput style={tw`text-5 font-bold w-22`} keyboardType="numeric" value={receiverAmount} editable={true} onChangeText={handleRecCurrency}></TextInput>
                                </>
                            }
                            {loading && <ActivityIndicator size="small" />}
                            {!loading && <Link asChild href={`/HowMuchSending`}>
                                <Pressable onPress={() => send()}>
                                    <CustomText style={tw`text-3.5 text-blue-500 mt-1`}>{t("Screens.Home.textSend")}</CustomText>
                                </Pressable>
                            </Link>}
                        </View>
                    </Card>
                </View>


                <View style={tw`mx-5 mt-10`}>
                    <CustomText style={tw`text-2xl font-bold`}>{t("Screens.Home.textTransaction")}</CustomText>
                    {transactionList.length == 0 &&
                        <View style={tw`mb-5 gap-2`}>
                            {/* <BlurTransaction name="Carlos" />
                            <BlurTransaction name="John" /> */}
                            <Image style={tw`w-full h-20 rounded-xl`} source={transectiondetail} />
                            <Image style={tw`w-full h-20 rounded-xl`} source={transectiondetail} />
                            <Image style={tw`w-full h-20 rounded-xl`} source={transectiondetail} />
                        </View>
                    }
                    {transactionList.length > 0 &&
                        <>
                            <View>
                                {transactionList.map((transaction, index) => (
                                    <Pressable key={index} onPress={() => handleRoute(transaction.id, transaction.status, transaction.connectId)}>
                                        <Card style={tw`p-4 mt-5 flex-row justify-between ${transaction.status === 'MoreDetails' || transaction.status === 'Reject' ? 'bg-red-100 border-red-500' : 'bg-[#EBF4FF] border-blue-500'} border`}>
                                            <View style={tw`flex-row gap-3 items-center`}>
                                                {/* <Image style={tw`w-15 h-15 rounded-lg`} source={person3} /> */}
                                                <View style={[tw`bg-[${secondary_color}] mx-auto w-15 h-15]`, { borderRadius: 50 }]}>
                                                    <CustomText style={tw`text-[${primary_color}] font-bold text-7 my-auto text-center capitalize`}>{transaction.recipientName.charAt(0)}</CustomText>
                                                </View>
                                                <View >
                                                    <CustomText style={tw`font-bold`}>{transaction.recipientName}</CustomText>
                                                    <CustomText style={tw`text-gray-500`}>Sent {formatDate(transaction.createdDate)}</CustomText>
                                                    <CustomText style={tw`text-gray-500`}>{formatTime(transaction.createdDate)} {getAmPm(formatTime(transaction.createdDate))}</CustomText>
                                                </View>
                                            </View>
                                            <View style={tw`flex-col`}>
                                                <View style={tw`flex-row ml-auto items-center mb-1`}>
                                                    <CustomText style={tw`${CustomStyles.text_primary} my-auto text-lg`}>{getSymbolByCountryCode(senderCountry)}</CustomText>
                                                    <CustomText style={tw`${CustomStyles.text_primary} my-auto text-lg mr-2`}>{transaction.amount}</CustomText>
                                                </View>
                                                <Badge status={transaction.status} />
                                            </View>
                                        </Card>
                                    </Pressable>
                                ))}
                            </View>
                            <Link href="/TransactionHistory">
                                <CustomText style={tw`${CustomStyles.text_primary} mx-auto mt-3`}>{t("Screens.Home.textSee")}</CustomText>
                            </Link>
                        </>
                    }
                </View>


                <CustomText style={tw`text-xl mx-5 mt-10 font-bold`}>{t("Screens.Home.textNews")}</CustomText>
                <View style={tw`mx-auto`}>
                    <Image style={tw`h-60 mt-5 rounded-lg relative`} source={news} />
                    <View style={tw`absolute bottom-3 ml-3`}>
                        <CustomText style={tw`text-white text-4xl font-bold`}>{t("Screens.Home.textApp")}</CustomText>
                        <CustomText style={tw`text-white text-base font-bold`}>{t("Screens.Home.textMobile")}</CustomText>
                        <CustomText style={tw`text-white text-base font-bold`}>{t("Screens.Home.textComing")}</CustomText>
                        <CustomText style={tw`${CustomStyles.text_primary} text-base`}>{t("Screens.Home.textRead")}</CustomText>
                    </View>
                </View>

                <CustomText style={tw`text-xl my-5 mx-5 font-bold`}>{t("Screens.Home.textRate")}</CustomText>

                <View style={tw`bg-[#1F1F1F] mx-auto w-92 p-1 rounded-lg`}>
                    <View style={tw`flex-row justify-between w-full mt-2 items-center px-1`}>
                        <View style={tw`flex-row`}>
                            <CustomText style={tw`text-white`}>{getSymbolByCountryCode(senderCountry)}{formatCurrency(1)} = </CustomText>
                            <CustomText style={tw`text-white`}>{getSymbolByCountryCode(receiverCountry)}{formatCurrency(rate)}</CustomText>
                        </View>
                        <Pressable style={tw`bg-[#0058CA] py-1 px-6 rounded-full`}>
                            <CustomText style={tw`text-base`}>{t("Screens.Home.textEdit")}</CustomText>
                        </Pressable>
                    </View>
                    <Image style={tw`h-30 w-96 -ml-7 mt-14 mb-2`} source={grayphline} />
                </View>

                <CustomText style={tw`text-xl my-5 mx-5 font-bold`}>{t("Screens.Home.textDonate")}</CustomText>
                <View style={tw`mb-25 relative w-92 mx-auto text-center`}>
                    <Image style={tw`mx-auto w-full`} source={charity} />
                    <View style={tw`absolute text-center mt-10 justify-center items-center w-full`}>
                        <CustomText style={tw`text-center w-80 text-white font-bold text-lg`}>{t("Screens.Home.textA")}</CustomText>
                        <Link href="/Donations" asChild >
                            <Pressable style={tw`bg-[#DFEFFF] py-3 px-10 rounded-full mt-10`}>
                                <CustomText style={tw`text-base font-bold`}>{t("Screens.Home.textDonateNow")}</CustomText>
                            </Pressable>
                        </Link>
                    </View>
                </View>

                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`mx-5 flex-row gap-2 mb-25`}>
                    <View style={tw`bg-[#0058CA80] p-3 rounded-lg shadow shadow-blue-200`}>
                        <CustomText style={tw`text-white font-bold text-center mb-2`}>Plan transfer</CustomText>
                        <Image source={plan} />
                    </View>

                    <View style={tw`bg-[#0058CA80] p-3 rounded-lg shadow shadow-blue-200`}>
                        <CustomText style={tw`text-white font-bold text-center mb-2`}>Donate to charities</CustomText>
                        <Image source={donate} />
                    </View>

                    <View style={tw`bg-[#0058CA80] p-3 rounded-lg shadow shadow-blue-200`}>
                        <CustomText style={tw`text-white font-bold text-center mb-2`}>Online transfer</CustomText>
                        <Image source={online} />
                    </View>
                </ScrollView> */}

            </View>
        </ScrollView>
    )
}
export default Home;

const BlurReceipent = ({ name, image }) => {
    return (
        <Blurred>
            <Card style={tw`shadow-blue-500 p-5 w-35`}>
                <Image style={tw`w-20 h-20 rounded-full mx-auto`} source={image} />
                <CustomText style={tw`mt-2 text-xs`}>{name}</CustomText>
            </Card>
        </Blurred>
    )
}