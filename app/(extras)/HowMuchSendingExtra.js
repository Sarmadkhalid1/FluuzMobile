import React, { useState } from 'react';
import { View, Pressable, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import previous from '../../assets/images/previous.png';
import downarrow from '../../assets/images/swipedown.png';
import dotstwo from '../../assets/images/dotstwo.png';
import us from '../../assets/countries/us.png';
import sek from '../../assets/countries/se.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import { Card } from 'react-native-shadow-cards';
import { Link, } from "expo-router";
import { TextInput } from "react-native";
import currency from 'currency.js';
import CustomText from '../../components/CustomText';


const { width, height } = Dimensions.get('window');

const HowMuchSending = () => {
    const formatCurrency = (value, symbol) => {
        return currency(value, { symbol: symbol, precision: 0 }).format()
    }

    // const [writing, setWriting] = useState(false);
    const [sendAmount, setSendAmount] = useState(formatCurrency('5300', '$'));
    const [getAmount, setgetAmount] = useState(formatCurrency('54652.70', 'SEK'));

    const setAndFormatSendAmount = (value) => {
        setSendAmount(formatCurrency(value, '$'));
    }

    const setAndFormatgetAmount = (value) => {
        setgetAmount(formatCurrency(value, 'KES'));
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[{ backgroundColor: 'white', height, width }, tw`mb-10`]}>
                <Link href="/Onboarding" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw` w-20 h-20 ml-5`}
                        />
                    </Pressable>
                </Link>

                <View style={tw`mx-10`}>
                    <CustomText style={tw` font-bold text-7`}>How much are you sending?</CustomText>
                    <View style={tw`flex-row gap-2 items-center`}>
                        <CustomText style={tw`text-5`}>Sending to</CustomText>
                        <View style={tw`flex-row`}>
                            <Link href="/SendToExtra" style={tw`text-5 font-semibold text-[${primary_color}]`}>
                                Sweden
                            </Link>
                            <Image style={tw`w-4.5 h-3 my-auto ml-1`} source={downarrow} />
                        </View>
                    </View>
                </View>

                <View style={tw`mx-10 justify-between mt-9 flex-row`}>
                    <Image style={tw`h-30 mr-7 w-7 mt-3`} source={dotstwo} />

                    <View >
                        <View >
                            <Card style={tw`py-3 px-5 h-16 w-60`} >
                                <CustomText style={tw`font-semibold text-4`}>You send</CustomText>
                                <View style={tw`flex-row justify-between pb-2`}>
                                    {/* <CustomText style={tw`font-semibold text-5`} >$5300</CustomText> */}
                                    <View style={tw`flex-row`}>
                                        {/* <CustomText style={tw`text-5 font-bold mr-1`}>$</CustomText> */}
                                        <TextInput style={tw`text-5 font-bold w-30`} keyboardType="numeric" editable={true} value={sendAmount} onChangeText={(text) => setAndFormatSendAmount(text)}></TextInput>
                                    </View>
                                    <View style={tw`flex-row`}>
                                        <Image style={tw`h-4 w-6 mt-0.5`} source={us} />
                                        <CustomText style={tw`text-3 ml-1 my-auto`}>US</CustomText>
                                    </View>

                                </View>
                            </Card>
                        </View>

                        <View style={tw`mx-auto mt-3`}>
                            <Card style={tw`py-3 px-5 h-16 w-60`} >
                                <CustomText style={tw`font-semibold text-4`}>They get</CustomText>
                                <View style={tw`flex-row justify-between pb-2`}>
                                    {/* <CustomText style={tw`font-semibold text-5`} >$10300 KES</CustomText> */}
                                    <View style={tw`flex-row`}>
                                        {/* <TextInput style={tw`text-5 font-bold mr-1`} keyboardType="numeric" value="10300" ></TextInput> */}
                                        <TextInput style={tw`text-5 font-bold  w-30`} keyboardType="numeric" editable={true} value={getAmount} onChangeText={(text) => setAndFormatgetAmount(text)}></TextInput>

                                        {/* <CustomText style={tw`text-5 font-bold`}>KES</CustomText> */}
                                    </View>
                                    <View style={tw`flex-row`}>
                                        <Image style={tw`h-4 w-6 mt-0.5`} source={sek} />
                                        <CustomText style={tw`text-3 ml-1 my-auto`}>Sweden</CustomText>
                                    </View>
                                </View>
                            </Card>
                        </View>
                    </View>
                </View>

                <Link href="/SendToExtra" asChild>
                    <TouchableOpacity
                        style={tw` py-1 border border-[#0058CA] rounded-full items-center py-3 mt-9 mx-20 `}
                    >
                        <CustomText style={tw`font-semibold text-lg `}>Change Currency</CustomText>
                    </TouchableOpacity>
                </Link>

                <Link href="/HowToDeliverMoneyExtra" asChild style={tw`${CustomStyles.btnlight} mt-14 py-3 mx-10 `}>
                    <TouchableOpacity>
                        <View style={tw`flex-row items-center`}>
                            <CustomText style={tw`text-[${primary_color}] font-bold text-lg `}>Delivery methods</CustomText>
                        </View>
                    </TouchableOpacity>
                </Link>

                <View style={tw`mx-auto mt-7`}>
                    <Card >
                        <View style={tw`px-5 py-2 gap-3`}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold text-6`}>Total Cost</CustomText>
                                <CustomText style={tw`font-semibold text-4`}>{sendAmount}</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between pb-2`}>
                                <CustomText style={tw`font-semibold`} >Fee</CustomText>
                                <CustomText>$8</CustomText>
                            </View>
                        </View>
                        <View style={tw`flex-row`}>
                            <View style={tw`bg-[${primary_color}] h-[.3] grow`}></View>
                        </View>
                        <View style={tw`px-5 py-2 pb-4 gap-3`}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold`}>Rate</CustomText>
                                <CustomText>1$= SEK10.31</CustomText>
                            </View>
                        </View>
                    </Card>
                </View>

                <Link href="/HowDoYouWantToPayExtra" asChild>
                    <Pressable
                        style={tw`${CustomStyles.btn} mt-6 py-3 mx-10`}
                    >
                        <CustomText href="/HowToDeliverMoneyExtra" style={tw`text-white font-bold text-lg`}>Next</CustomText>
                    </Pressable>
                </Link>

            </View>
        </ScrollView >
    )
}
export default HowMuchSending;