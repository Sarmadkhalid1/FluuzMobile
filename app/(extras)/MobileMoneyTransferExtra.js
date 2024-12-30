import React, { useState } from "react";
import { View, Pressable, Image, ScrollView, TouchableOpacity } from "react-native";
import previous from '../../assets/images/previous.png';
import mpesa from '../../assets/images/mpesa.png';
import premierwallet from '../../assets/images/premierwallet.png';
import edahab from '../../assets/images/edahab.png';
import hormuud from '../../assets/images/hormuud.png';
import telesom from '../../assets/images/telesom.png';
import golis from '../../assets/images/gollissahal.png';
import sopay from '../../assets/images/sopay.png';
import tw from 'twrnc';
import { primary_color } from "../../constants/styles";
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';


const MobileMoneyTransfer = () => {
    const [disbaled, setDisabled] = useState(true);

    return (
        <ScrollView>
            <View style={tw`mx-10`}>
                <Link href="/HowToDeliverMoneyExtra" asChild>
                    <Pressable style={tw`ml-[-20]`} >
                        <Image
                            source={previous} style={tw` w-20 h-20`}
                        />
                    </Pressable>
                </Link>

                <CustomText style={tw`font-bold text-6 items-center`}>Mobile money transfer</CustomText>
                <CustomText style={tw`font-medium text-base mt-3`}>Send to mobile wallet with one of{"\n"}these options</CustomText>

                <Link href="/HowMuchSendingExtra" as asChild>
                    <TouchableOpacity style={tw`flex-row justify-between mt-10 border-b pb-5 border-blue-700`}>
                        <View style={tw`flex-row`}>
                            <Image style={tw`h-12 w-20 mt-1`} source={mpesa} resizeMode="contain" />
                            <View style={tw`ml-5`}>
                                <CustomText style={tw`font-semibold text-lg`}>M pesa</CustomText>
                                <View style={tw`flex-row  mt-2`}>
                                    <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                    <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>

                <Link href="/HowMuchSendingExtra" as asChild>
                    <TouchableOpacity style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                        <View style={tw`flex-row`}>
                            <Image style={tw`h-12 w-20 mt-1`} source={premierwallet} resizeMode="contain" />
                            <View style={tw`ml-5`}>
                                <CustomText style={tw`font-semibold text-lg`}>Premier Wallet</CustomText>
                                <View style={tw`flex-row  mt-2`}>
                                    <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                    <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>

                <Link href="/HowMuchSendingExtra" as asChild>
                    <TouchableOpacity style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                        <View style={tw`flex-row`}>
                            <Image style={tw`w-20 h-12 mt-1`} source={edahab} resizeMode="contain" />
                            <View style={tw`ml-5`}>
                                <CustomText style={tw`font-semibold text-lg`}>e-Dahab</CustomText>
                                <View style={tw`flex-row  mt-2`}>
                                    <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                    <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>

                <Link href="/HowMuchSendingExtra" as asChild>
                    <TouchableOpacity style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                        <View style={tw`flex-row`}>
                            <Image style={tw`w-20 h-12 mt-1`} source={hormuud} resizeMode="contain" />
                            <View style={tw`ml-5`}>
                                <CustomText style={tw`font-semibold text-lg`}>Hormuud EVC Plus</CustomText>
                                <View style={tw`flex-row  mt-2`}>
                                    <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                    <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>

                <Link href="/HowMuchSendingExtra" as asChild>
                    <TouchableOpacity style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                        <View style={tw`flex-row`}>
                            <Image style={tw`h-12 w-20 mt-1`} source={telesom} resizeMode="contain" />
                            <View style={tw`ml-5`}>
                                <CustomText style={tw`font-semibold text-lg`}>Telesom Zaad</CustomText>
                                <View style={tw`flex-row  mt-2`}>
                                    <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                    <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>

                <Link href="/HowMuchSendingExtra" as asChild>
                    <TouchableOpacity style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                        <View style={tw`flex-row`}>
                            <Image style={tw`h-12 w-20 mt-1`} source={golis} resizeMode="contain" />
                            <View style={tw`ml-5`}>
                                <CustomText style={tw`font-semibold text-lg`}>Golis Zaad</CustomText>
                                <View style={tw`flex-row  mt-2`}>
                                    <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                    <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>

                <Link href="/HowMuchSendingExtra" as asChild>
                    <TouchableOpacity style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                        <View style={tw`flex-row`}>
                            <Image style={tw`h-12 w-20 mt-1`} source={sopay} resizeMode="contain" />
                            <View style={tw`ml-5`}>
                                <CustomText style={tw`font-semibold text-lg`}>Sopay</CustomText>
                                <View style={tw`flex-row  mt-2`}>
                                    <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                    <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>

                <View style={tw`mx-auto mt-15`}>
                    <CustomText style={tw`font-bold text-7`}>$44254 in total</CustomText>
                    <CustomText style={tw`text-[${primary_color}] text-2xl`}>See pricing details</CustomText>
                </View>
            </View>
        </ScrollView>
    )
}
export default MobileMoneyTransfer;