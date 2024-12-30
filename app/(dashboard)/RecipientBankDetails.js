import React from "react";
import { View, Pressable, Image } from "react-native";
import previous from '../../assets/images/previous.png';
import swipedown from '../../assets/images/swipedown.png';
import setting from '../../assets/images/setting.png';
import tw from 'twrnc';
import Input from '../../components/TextInput';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';


export default RecipientBankDetails = () => {
    return (
        <View>
            <View style={tw`flex-row items-center justify-between`}>
                <Link href="/SavedRecipient" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw` w-20 h-20 ml-5 `}
                        />
                    </Pressable>
                </Link>

                <Link href="/Account" asChild>
                    <Pressable >
                        <Image
                            source={setting} style={tw`w-8 h-8 mr-8 `}
                        />
                    </Pressable>
                </Link>
            </View>

            <View style={tw`mx-10`}>
                <CustomText style={tw`font-bold text-7 `}>Recipient bank details</CustomText>

                <View style={tw`mt-5 gap-1`}>
                    <View style={tw`gap-1`}>
                        <CustomText style={tw`font-medium text-xs mt-1`}>Bank</CustomText>
                        <View style={tw`relative`}>
                            <Input placeholder={""}></Input>

                            <Link href="/SelectBank" asChild>
                                <Pressable>
                                    <Image
                                        source={swipedown}
                                        style={tw`absolute h-3 w-4.5 right-5 bottom-5`}
                                    />
                                </Pressable>
                            </Link>
                        </View>
                    </View>

                    <View style={tw`gap-1`}>
                        <CustomText style={tw`font-medium text-xs mt-1`}>Account Number</CustomText>
                        <Input placeholder={""}></Input>
                    </View>

                    <View style={tw`gap-1`}>
                        <CustomText style={tw`font-medium text-xs mt-1`}>Confirm Account Number</CustomText>
                        <Input placeholder={""}></Input>
                    </View>

                    <View style={tw`gap-1`}>
                        <CustomText style={tw`font-medium text-xs mt-1 `}>Routing Number</CustomText>
                        <Input placeholder={""}></Input>
                    </View>
                </View>

                <Pressable
                    style={tw`${CustomStyles.btn} mt-13 py-3`}
                >
                    <View style={tw`flex-row items-center gap-3`}>
                        <CustomText style={tw`text-white font-bold text-lg `}>Save</CustomText>
                    </View>
                </Pressable>
            </View>

        </View>
    )
}