import React, { useState } from "react";
import { View, Pressable, Image } from "react-native";
import previous from '../../assets/images/previous.png';
import mobile from '../../assets/images/mobile.png';
import cash from '../../assets/images/cash.png';
import tw from 'twrnc';
import Bank from '../../assets/images/bank_svg.png'
import { primary_color } from "../../constants/styles";
import arrowblack from '../../assets/images/arrowblack.png';
import { Link, } from "expo-router";
import CustomText from "../../components/CustomText";


const DeliverMoney = () => {

    const [disbaled, setDisabled] = useState(true);

    return (
        <View style={tw`mx-10`}>
            <Link href="/SendingTo" asChild>
                <Pressable style={tw`ml-[-15]`} >
                    <Image
                        source={previous} style={tw` w-20 h-20 `}
                    />
                </Pressable>
            </Link>

            <CustomText style={tw`font-bold text-6 items-center`}>How should we deliver your money?</CustomText>
            <CustomText style={tw`font-medium text-base mt-3`}>Exclusive deals for our community from hand picked partners</CustomText>

            <View style={tw`flex-row justify-between mt-10 border-b pb-5 border-blue-700`}>
                <View style={tw`flex-row`}>
                    <Image style={tw`h-5 w-7.5 mt-1`} source={cash} />
                    <View style={tw`ml-5`}>
                        <CustomText style={tw`font-semibold text-lg`}>Cash pickup</CustomText>
                        <CustomText style={tw`text-xs mt-1 w-50`}>To a cash pickup point</CustomText>
                        <View style={tw`flex-row  mt-2`}>
                            <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                            <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                        </View>
                    </View>
                </View>
                <View style={tw`my-auto`}>
                    <Link href="/MobileMoneyTransfer1" asChild>
                        <Pressable >
                            <Image style={tw`h-3 w-3`} source={arrowblack} />
                        </Pressable>
                    </Link>
                </View>
            </View>

            <View style={tw`flex-row justify-between border-b pb-5 border-blue-700 mt-2`}>
                <View style={tw`flex-row`}>
                    <Image style={tw`h-8 w-7.5 mt-1`} source={mobile} />
                    <View style={tw`ml-5`}>
                        <CustomText style={tw`font-semibold text-lg`}>Mobile money transfer</CustomText>
                        <CustomText style={tw`text-xs mt-1 w-50`}>To a mobile wallet on your recipients' phone</CustomText>
                        <View style={tw`flex-row mt-2`}>
                            <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                            <CustomText style={tw`border py-0 px-2 border-blue-300`}>KES</CustomText>
                        </View>
                    </View>
                </View>
                <View style={tw`my-auto`}>

                    <Link href="/MobileMoneyTransfer2" asChild>
                        <Pressable >
                            <Image style={tw`h-3 w-3`} source={arrowblack} />
                        </Pressable>
                    </Link>
                </View>
            </View>

            <View style={tw`flex-row justify-between mt-3 `}>
                <View style={tw`flex-row`}>
                    <Image style={tw`h-7 w-7.5 mt-1`} source={Bank} />
                    <View style={tw`ml-5`}>
                        <CustomText style={tw`font-semibold text-lg`}>Bank Deposit</CustomText>
                        <CustomText style={tw`text-xs mt-1 w-50`}>Send money 24/7</CustomText>
                    </View>
                </View>
                <View style={tw`my-auto`}>
                    <Link href="/AddBankDetails" asChild>
                        <Pressable >
                            <Image style={tw`h-3 w-3`} source={arrowblack} />
                        </Pressable>
                    </Link>
                </View>
            </View>




            <View style={tw`mx-15 mt-12`}>
                <CustomText style={tw`font-bold text-6`}>$44254 in total</CustomText>
                <CustomText style={tw`text-[${primary_color}] text-xl`}>See pricing details</CustomText>
            </View>
            <Pressable
                style={tw`${CustomStyles.btn} ${disbaled ? 'bg-[#0058CA99]' : ''} mt-10`}
                disabled={disbaled}
            >
                <View style={tw`flex-row items-center gap-3 py-3`}>
                    <CustomText style={tw`text-white font-bold text-lg`}>Next</CustomText>
                </View>
            </Pressable>
        </View>
    )
}
export default DeliverMoney;