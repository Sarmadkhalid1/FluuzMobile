import React from "react";
import { View, Pressable, Image, ScrollView } from "react-native";
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

    return (
        <ScrollView>
            <View style={tw`mx-10`}>
                <Link href="/CashPickup" asChild>
                    <Pressable style={tw`ml-[-20]`} >
                        <Image
                            source={previous} style={tw` w-20 h-20`}
                        />
                    </Pressable>
                </Link>

                <CustomText style={tw`font-bold text-6 items-center`}>Mobile money transfer</CustomText>
                <CustomText style={tw`font-medium text-base mt-3`}>Send to mobile wallet with one of{"\n"}these options</CustomText>

                {/* <View style={tw`flex-row justify-between  mt-20 `}>
                    <View style={tw`mx-10`}>
                        <CustomText style={tw`font-semibold text-xl`}>M pesa</CustomText>
                        <View style={tw`flex-row  mt-2`}>
                            <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                            <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                        </View>
                    </View>

                    <Link href="/Transfer" style={tw`my-auto`}>
                        <View >
                            <Image style={tw`h-3 w-3`} source={arrowblack} />
                        </View>
                    </Link>
                </View> */}


                <View style={tw`flex-row justify-between mt-10 border-b pb-5 border-blue-700`}>
                    <View style={tw`flex-row`}>
                        <View style={tw`h-7 w-19 items-center my-auto`}>
                            <Image style={tw`h-9.5 w-10 mt-1 `} source={mpesa} />
                        </View>
                        <View style={tw`ml-5`}>
                            <CustomText style={tw`font-semibold text-lg`}>M pesa</CustomText>
                            <View style={tw`flex-row  mt-2`}>
                                <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                            </View>
                            {/* <CustomText style={tw`text-xs mt-1 w-50`}>To a cash pickup point</CustomText> */}
                            {/* <View style={tw`flex-row mt-2`}>
                                <Image style={tw`h-5 w-4.3`} source={location} />
                                <CustomText style={tw`text-xs ml-3 text-[${primary_color}]`}>Pickup Points</CustomText>
                            </View> */}
                        </View>
                    </View>
                </View>

                <View style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                    <View style={tw`flex-row`}>
                        <Image style={tw`h-7 w-19 mt-1 my-auto`} source={premierwallet} />
                        <View style={tw`ml-5`}>
                            <CustomText style={tw`font-semibold text-lg`}>Premier Wallet</CustomText>
                            <View style={tw`flex-row  mt-2`}>
                                <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                            </View>
                            {/* <CustomText style={tw`text-xs mt-1 w-50`}>To a cash pickup point</CustomText> */}
                            {/* <View style={tw`flex-row mt-2`}>
                                <Image style={tw`h-5 w-4.3`} source={location} />
                                <CustomText style={tw`text-xs ml-3 text-[${primary_color}]`}>Pickup Points</CustomText>
                            </View> */}
                        </View>
                    </View>
                </View>

                <View style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                    <View style={tw`flex-row`}>
                        <Image style={tw`h-7 w-19 mt-1 my-auto`} source={edahab} />
                        <View style={tw`ml-5`}>
                            <CustomText style={tw`font-semibold text-lg`}>e-Dahab</CustomText>
                            <View style={tw`flex-row  mt-2`}>
                                <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                            </View>
                            {/* <CustomText style={tw`text-xs mt-1 w-50`}>To a cash pickup point</CustomText> */}
                            {/* <View style={tw`flex-row mt-2`}>
                                <Image style={tw`h-5 w-4.3`} source={location} />
                                <CustomText style={tw`text-xs ml-3 text-[${primary_color}]`}>Pickup Points</CustomText>
                            </View> */}
                        </View>
                    </View>
                </View>

                <View style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                    <View style={tw`flex-row`}>
                        <Image style={tw`h-9 w-19 mt-1 my-auto`} source={hormuud} />
                        <View style={tw`ml-5`}>
                            <CustomText style={tw`font-semibold text-lg`}>Hormuud EVC Plus</CustomText>
                            <View style={tw`flex-row  mt-2`}>
                                <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                            </View>
                            {/* <CustomText style={tw`text-xs mt-1 w-50`}>To a cash pickup point</CustomText> */}
                            {/* <View style={tw`flex-row mt-2`}>
                                <Image style={tw`h-5 w-4.3`} source={location} />
                                <CustomText style={tw`text-xs ml-3 text-[${primary_color}]`}>Pickup Points</CustomText>
                            </View> */}
                        </View>
                    </View>
                </View>

                <View style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                    <View style={tw`flex-row`}>
                        <View style={tw`h-7 w-19 `}>
                            <Image style={tw`h-9 w-18 mt-1 `} source={telesom} />
                        </View>
                        <View style={tw`ml-5`}>
                            <CustomText style={tw`font-semibold text-lg`}>Telesom Zaad</CustomText>
                            <View style={tw`flex-row  mt-2`}>
                                <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                            </View>
                            {/* <CustomText style={tw`text-xs mt-1 w-50`}>To a cash pickup point</CustomText> */}
                            {/* <View style={tw`flex-row mt-2`}>
                                <Image style={tw`h-5 w-4.3`} source={location} />
                                <CustomText style={tw`text-xs ml-3 text-[${primary_color}]`}>Pickup Points</CustomText>
                            </View> */}
                        </View>
                    </View>
                </View>

                <View style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                    <View style={tw`flex-row`}>
                        <Image style={tw`h-11 w-19 mt-1 my-auto`} source={golis} />
                        <View style={tw`ml-5`}>
                            <CustomText style={tw`font-semibold text-lg`}>Golis Zaad</CustomText>
                            <View style={tw`flex-row  mt-2`}>
                                <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                            </View>
                            {/* <CustomText style={tw`text-xs mt-1 w-50`}>To a cash pickup point</CustomText> */}
                            {/* <View style={tw`flex-row mt-2`}>
                                <Image style={tw`h-5 w-4.3`} source={location} />
                                <CustomText style={tw`text-xs ml-3 text-[${primary_color}]`}>Pickup Points</CustomText>
                            </View> */}
                        </View>
                    </View>
                </View>

                <View style={tw`flex-row justify-between mt-5 border-b pb-5 border-blue-700`}>
                    <View style={tw`flex-row`}>
                        <Image style={tw`h-5 w-19 mt-1 my-auto`} source={sopay} />
                        <View style={tw`ml-5`}>
                            <CustomText style={tw`font-semibold text-lg`}>Sopay</CustomText>
                            <View style={tw`flex-row  mt-2`}>
                                <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                                <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                            </View>
                            {/* <CustomText style={tw`text-xs mt-1 w-50`}>To a cash pickup point</CustomText> */}
                            {/* <View style={tw`flex-row mt-2`}>
                                <Image style={tw`h-5 w-4.3`} source={location} />
                                <CustomText style={tw`text-xs ml-3 text-[${primary_color}]`}>Pickup Points</CustomText>
                            </View> */}
                        </View>
                    </View>
                </View>

                <View style={tw`mx-10 mt-15`}>
                    <CustomText style={tw`font-bold text-7`}>$44254 in total</CustomText>
                    <CustomText style={tw`text-[${primary_color}] text-2xl`}>See pricing details</CustomText>
                </View>
                <Pressable
                    style={tw`${CustomStyles.btn} mt-13 mb-10`}
                >
                    <View style={tw`py-3`}>
                        <CustomText style={tw`text-white font-bold text-lg`}>Next</CustomText>
                    </View>
                </Pressable>
            </View>
        </ScrollView>
    )
}
export default MobileMoneyTransfer;