import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import cross from '../../assets/images/cross.png';
import pdf from '../../assets/images/pdf.png';
import mark from '../../assets/images/mark.png';
import bglight from '../../assets/images/bglight.png';
import tw from 'twrnc';
import { Link, useLocalSearchParams } from "expo-router";
import CustomText from '../../components/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import part1 from '../../assets/images/progress_2.png'
import part2 from '../../assets/images/progress_3.png'
import { useSelector } from 'react-redux';
import { getHowMuchSendingData } from '../../store';

const { width, height } = Dimensions.get('screen');

const ShareReciept = () => {
    const params = useLocalSearchParams();

    const howMuchSending = useSelector(getHowMuchSendingData)
    const [payId, setPayId] = useState('')
    const [loading, setloading] = useState(true);

    useEffect(() => {
        if (params) {
            setPayId(params.pay_id)
        }
    }, [])

    async function removePreviousStates() {
        await AsyncStorage.removeItem('SaveCard');
        await AsyncStorage.removeItem('SendingTo');
        await AsyncStorage.removeItem('HowMuchSending');
        await AsyncStorage.removeItem('payout_method');
        await AsyncStorage.removeItem('payment_method');
        await AsyncStorage.removeItem('senderinfo');
        await AsyncStorage.removeItem('Card');
    }

    function formatDate(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();

        // Adding leading zero if hour/minute is less than 10
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;

        const formattedDate = `${day} ${months[monthIndex]} ${year}, ${hour}:${minute}`;
        return formattedDate;
    }

    if (loading)
        return (
            <View style={[{ height, width }, tw` `]}>
                <ActivityIndicator style={tw`my-auto`} size={"large"}></ActivityIndicator>
            </View>
        );

    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={tw`mx-3`}>

                <View style={tw`flex-row items-center`}>
                    <Link href="/Home" asChild>
                        <Pressable >
                            <Image
                                source={cross}
                                style={tw`w-20 h-20`}
                            />
                        </Pressable>
                    </Link>

                    <View style={tw`flex-row ml-10`}>
                        <Image source={part1} />
                        <Image source={part2} style={tw`-ml-2 -mt-1`} />
                    </View>
                </View>



                <CustomText style={tw`font-bold text-2xl ml-5`}>Transfer Compleate!</CustomText>


                <View style={tw`bg-[#DFEFFF] items-center mt-10`}>
                    <Image source={mark} style={tw`w-20 h-20 absolute top-[-8.5]`} />

                    <View style={tw`relative`}>
                        <Image source={bglight} />

                        <View style={tw`mt-10 absolute ml-13.5`}>
                            <CustomText style={tw`font-bold text-xl text-center mt-5`}>Payment Success!</CustomText>

                            <CustomText style={tw`text-sm text-center mt-2`}>Your payment has been successfully done.</CustomText>
                            <View
                                style={{
                                    marginTop: 15,
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }}
                            />

                            <CustomText style={tw`text-sm text-center mt-2`}>Total Payment</CustomText>

                            <CustomText style={tw`font-bold text-xl text-center mt-2`}>{howMuchSending.senderAmount}</CustomText>

                            <View style={tw`flex-row justify-between mt-5`}>
                                <View style={tw`border border-gray-300 p-3 rounded-lg w-37`}>
                                    <CustomText>Ref Number</CustomText>
                                    <CustomText style={tw`font-bold`}>
                                        {payId == '' ? 'HSDSFDGOR343' : payId}
                                    </CustomText>
                                </View>
                                <View style={tw`border border-gray-300 p-3 rounded-lg w-37`}>
                                    <CustomText>Payment Time</CustomText>
                                    <CustomText style={tw`font-bold`}>{formatDate(new Date())}</CustomText>
                                </View>
                            </View>

                            <View style={tw`flex-row justify-between mt-5`}>
                                <View style={tw`border border-gray-300 p-3 rounded-lg w-37`}>
                                    <CustomText>Payment Method</CustomText>
                                    <CustomText style={tw`font-bold capitalize`}>{payoutMethod.category}</CustomText>
                                </View>
                                <View style={tw`border border-gray-300 p-3 rounded-lg w-37`}>
                                    <CustomText>Sender Name</CustomText>
                                    <CustomText style={tw`font-bold`}>{receiver.name}</CustomText>
                                </View>
                            </View>

                            <View style={tw`flex-row mx-auto mt-5 mb-10`}>
                                <Image source={pdf} style={tw`w-10 h-10`} />
                                <CustomText style={tw`my-auto font-semibold text-lg ml-3`}>Get PDF Recipient</CustomText>
                            </View>

                        </View>
                    </View>

                </View>

                <View style={tw`flex-row mt-5 mb-15 justify-between`}>
                    <View>
                        <Pressable
                            style={tw`${CustomStyles.btnlight} py-3 px-8`}
                        >
                            <CustomText style={tw`font-bold text-lg`}>Share recipient</CustomText>
                        </Pressable>
                    </View>

                    <Link onPress={() => removePreviousStates()} asChild href="/TransactionHistory">
                        <Pressable
                            style={tw`${CustomStyles.btn} py-3 px-8`}
                        >
                            <CustomText style={tw`text-white font-bold text-lg`}>Check status</CustomText>
                        </Pressable>
                    </Link>
                </View>

            </View>
        </ScrollView>
    )
}
export default ShareReciept;