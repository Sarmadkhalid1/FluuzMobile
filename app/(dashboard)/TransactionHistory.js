import React, { useEffect, useState } from "react";
import { View, Pressable, Image, ScrollView, Dimensions, Alert, ActivityIndicator } from "react-native";
import tw from 'twrnc';
import { Link, router } from "expo-router";
import CustomText from '../../components/CustomText';
import previous from '../../assets/images/previous.png';
import vector from '../../assets/images/Vector.png';
import { getTransactionHistory } from "../../services/TransactionService";
import { Card } from 'react-native-shadow-cards';
import person3 from '../../assets/images/person3.png';
import { getSymbolByCountryCode } from "../../services/Countries-js";
import { formatCurrency, formatDate, formatTime, getAmPm } from "../../services/Helper";
import { getLoginUserCountry } from '../../services/AuthService';
import { setAddRecipientData, setCameFrom, store } from "../../store";
import transectiondetail from '../../assets/images/transectiondetail.png';
import { primary_color, secondary_color } from '../../constants/styles';
import { getRecipientByConnectId } from "../../services/RecipientService";

const { width, height } = Dimensions.get('screen');

const TransactionHistory = () => {

    const [list, setList] = useState({});
    const [loading, setLoading] = useState(true);
    const [senderAmount, setSenderAmount] = useState('10');
    const [senderCountry, setSenderCountry] = useState('');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        loadTransactionHistory()
    }, []);

    useEffect(() => {
        getUserCountry()
    }, []);

    const getUserCountry = async () => {
        try {
            let response = await getLoginUserCountry();
            setSenderCountry(response.data);
            setSenderAmount(formatCurrency(senderAmount));
        } catch (error) {
            console.error(error);
        }
    }

    const loadTransactionHistory = async () => {
        try {
            const res = await getTransactionHistory();
            const groupedByCreatedDate = res.data.reduce((acc, obj) => {
                const createdDate = formatDate(obj.createdDate);
                if (!acc[createdDate]) {
                    acc[createdDate] = [];
                }
                acc[createdDate].push(obj);
                return acc;
            }, {});
            setList(groupedByCreatedDate);
            setLoading(false);
        } catch (error) {
            Alert.alert("Error", error)
        }
    }

    const handleRoute = async (id, status, connectId) => {
        if (status === 'MoreDetails') {
            let response = await getRecipientByConnectId(connectId);
            store.dispatch(setAddRecipientData(response.data));
            store.dispatch(setCameFrom(`/TransferDetails?id=" + ${id}`));
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

    function formatDate2(dateString) {
        const inputDate = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const options = { hour: 'numeric', minute: 'numeric', hour12: true };

        if (inputDate.toDateString() === today.toDateString()) {
            return 'Today, ' + inputDate.toLocaleTimeString('en-US', options);
        } else if (inputDate.toDateString() === yesterday.toDateString()) {
            return 'Yesterday, ' + inputDate.toLocaleTimeString('en-US', options);
        } else {
            return inputDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        }
    }

    if (loading) {
        return (
            <View style={{ height, width }}>
                <ActivityIndicator style={tw`my-auto`} size={"large"}></ActivityIndicator>
            </View>
        );
    }

    return (
        <ScrollView>
            <Link href="/Home" asChild>
                <Pressable>
                    <Image
                        source={previous} style={tw`w-20 h-20 ml-0`}
                    />
                </Pressable>
            </Link>
            <View style={tw`mx-5`}>
                <CustomText style={tw`text-xl font-bold mt-2 mb-5`}>Transaction History</CustomText>

                <View>
                    {Object.keys(list).map((key, index) => (
                        <View key={index} style={tw`my-5`}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`text-gray-500 text-lg`}>{daysOfWeek[new Date(key.toString()).getDay()]}</CustomText>
                                <CustomText style={tw`text-gray-400`}>{key}</CustomText>
                            </View>
                            {list[key.toString()].map((item) => (
                                <View key={item.id} style={tw`my-1`}>
                                    <Pressable onPress={() => handleRoute(item.id, item.status, item.connectId)}>
                                        <Card key={index} style={tw`p-4 mt-1 flex-row justify-between ${item.status === 'MoreDetails' || item.status === 'Reject' ? 'bg-red-100 border-red-500' : 'bg-[#EBF4FF] border-blue-500'} border`}>
                                            <View style={tw`flex-row items-center gap-3`}>
                                                {/* <Image style={tw`w-15 h-15 rounded-lg`} source={person3} /> */}
                                                <View style={[tw`bg-[${secondary_color}] mx-auto w-15 h-15]`, { borderRadius: 50 }]}>
                                                    <CustomText style={tw`text-[${primary_color}] font-bold text-7 my-auto text-center capitalize`}>{item.recipientName.charAt(0)}</CustomText>
                                                </View>
                                                <View style={tw`my-auto`}>
                                                    <CustomText style={tw`font-bold`}>{item.recipientName}</CustomText>
                                                    <CustomText style={tw`text-gray-500`}>{formatDate2(item.createdDate)}</CustomText>
                                                    <CustomText style={tw`text-gray-500`}>{formatTime(item.createdDate)} {getAmPm(formatTime(item.createdDate))}</CustomText>
                                                </View>
                                            </View>
                                            <View style={tw`flex-col ml-auto mr-3`}>
                                                <CustomText style={tw`${CustomStyles.text_primary} ml-3 my-auto text-lg`}>{getSymbolByCountryCode(senderCountry)}{formatCurrency(item.amount)}</CustomText>
                                                <Badge status={item.status} />
                                            </View>
                                            <Image style={tw`my-auto`} source={vector} />
                                        </Card>
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    ))}

                    {Object.keys(list).length == 0 &&
                        <View style={tw`mb-5 gap-2`}>
                            <Image style={tw`w-full h-20 rounded-xl`} source={transectiondetail} />
                            <Image style={tw`w-full h-20 rounded-xl`} source={transectiondetail} />
                            <Image style={tw`w-full h-20 rounded-xl`} source={transectiondetail} />
                        </View>
                    }
                </View>


            </View>
        </ScrollView >
    )
};
export default TransactionHistory;