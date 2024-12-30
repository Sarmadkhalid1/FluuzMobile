import React, { useState } from "react";
import { View, Pressable, Image } from "react-native";
import previous from '../../assets/images/previous.png';
import card from '../../assets/images/card.png';
import tw from 'twrnc';
import { primary_color } from "../../constants/styles";
import { CheckBox } from '@rneui/themed';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';



const HowDoYouWantToPay = () => {

    const [selectedIndex, setIndex] = useState(0);

    return (
        <View style={tw`mx-10`}>
            <Link href="/HowMuchSendingExtra" asChild>
                <Pressable >
                    <Image
                        source={previous} style={tw` w-20 h-20 ml-[-15] `}
                    />
                </Pressable>
            </Link>

            <CustomText style={tw`font-bold text-6 items-center`}>How do you want to pay?</CustomText>
            <CustomText style={tw`font-medium text-base mt-3 `}>We partner with secure payment{"\n"}providers to make it easy. Learn more</CustomText>

            <Pressable  onPress={() => setIndex(0)}>
                <View style={tw`border-b pb-5 border-blue-700 mt-13`}>
                    <View style={tw`ml-10 flex-row justify-between`}>
                        <View>
                            <CustomText style={tw`font-semibold text-lg `}>Trustly</CustomText>
                            <CustomText style={tw`font-medium text-xs mt-1`}>357892457</CustomText>
                            <Pressable>
                                <CustomText style={tw`text-[${primary_color}]`}>+ Pay with a different account</CustomText>
                            </Pressable>

                        </View>
                        <View style={tw``}>
                            <CheckBox
                                checked={selectedIndex === 0}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </View>

                </View>
            </Pressable>

            <Pressable onPress={() => setIndex(1)}>
                <View style={tw`flex-row mt-2 justify-between`}>
                    <View style={tw`flex-row w-50`}>
                        <Image style={tw`h-5 w-7 mr-3 mt-1`} source={card} />
                        <View>
                            <CustomText style={tw`font-semibold text-lg`}>Debit / Credit Card</CustomText>
                            <CustomText style={tw`font-medium text-xs mt-1`}>We accept visa, maestro and master card</CustomText>
                        </View>
                    </View>
                    <View style={tw``}>
                        <CheckBox
                            checked={selectedIndex === 1}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                        />
                    </View>

                </View>
            </Pressable>

            <Link href={selectedIndex === 1 ? "/BankDetailsExtra" : "/TransferExtra"} asChild>
                <Pressable
                    style={tw`${CustomStyles.btn} mt-73 py-3`}
                >
                    <View style={tw`flex-row items-center gap-3`}>
                        <CustomText style={tw`text-white font-bold text-lg `}>Next</CustomText>
                    </View>
                </Pressable>
            </Link>
        </View>
    )
}
export default HowDoYouWantToPay;