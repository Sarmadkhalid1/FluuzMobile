import React from "react";
import { View, Pressable, Image, TextInput } from "react-native";
import previous from '../../assets/images/previous.png';
import card from '../../assets/images/card1.png';
import schedule from '../../assets/images/schedule_svg.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import Input from '../../components/TextInput';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';


export default BankDetails = () => {
    return (
        <View>
            <View style={tw`flex-row items-center justify-between`}>
                <Link href="/HowDoYouWantToPayExtra" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw` w-20 h-20 ml-5 `}
                        />
                    </Pressable>
                </Link>
            </View>

            <View style={tw`mx-10`}>
                <CustomText style={tw`font-bold text-7 `}>The Card Number</CustomText>
                <View style={tw`mt-5 gap-1`}>
                    <View style={tw`gap-1`}>
                        <CustomText style={tw`font-medium text-xs mt-1`}>Bank</CustomText>
                        <View style={tw`relative`}>
                            <Input placeholder="+42"></Input>
                        </View>
                    </View>

                    <View style={tw`gap-1`}>
                        <CustomText style={tw`font-medium text-xs mt-1`}>Card Number</CustomText>
                        <TextInput style={tw`bg-[#EBF4FF] text-base rounded-md border border-[#0058CA4D] p-3.5 pl-15 `} placeholderTextColor="#0058CA66"  ></TextInput>

                        <Image source={card} style={tw`absolute h-4 w-5.5 ml-5 bottom-5`} />
                    </View>
                    <View style={[tw`flex-row`]} >
                        <View style={tw`gap-1`}>
                            <CustomText style={tw`font-medium text-xs mt-1`}>MM/YY</CustomText>
                            <TextInput style={tw`bg-[#EBF4FF] text-base rounded-md border border-[#0058CA4D] p-3.5 w-35 pl-15 `}  ></TextInput>
                            <Image source={schedule} style={tw`absolute h-5 w-5 ml-5 bottom-5`} />
                        </View>
                        <View style={tw`gap-1 ml-5`}>
                            <CustomText style={tw`font-medium text-xs mt-1`}>CVC/(3 digits)</CustomText>
                            <TextInput style={tw`bg-[#EBF4FF] text-base rounded-md border border-[#0058CA4D] p-3.5 w-35 pl-15 `}  ></TextInput>
                            <Image source={schedule} style={tw`absolute h-5 w-5 ml-5 bottom-5`} />
                        </View>
                    </View>
                </View>
                <View style={tw`mx-25 mt-25`}>
                    <CustomText style={tw`text-[${primary_color}] font-bold text-4xl`}>$5541</CustomText>
                </View>
                <Link href="/TransferExtra" asChild>
                    <Pressable
                        style={tw`${CustomStyles.btn} mt-15 py-3`}
                    >
                        <View style={tw`flex-row items-center gap-3`}>
                            <CustomText style={tw`text-white font-bold text-lg `}>Complete Payment</CustomText>
                        </View>
                    </Pressable>
                </Link>
            </View>
        </View>
    )
}