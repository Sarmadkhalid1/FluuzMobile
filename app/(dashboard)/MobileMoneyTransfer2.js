import React, { useState } from "react";
import { View, Pressable, Image } from "react-native";
import previous from '../../assets/images/previous.png';
import tw from 'twrnc';
import { CheckBox } from '@rneui/themed';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';


const MobileMoneyTransfer2 = () => {

    const [selectedIndex, setIndex] = useState(0);

    return (
        <View style={tw`mx-10`}>
            <Link href="../" asChild>
                <Pressable >
                    <Image
                        source={previous} style={tw` w-20 h-20 ml-[-15] `}
                    />
                </Pressable>
            </Link>

            <CustomText style={tw`font-bold text-3xl items-center`}>How do you want to pay?</CustomText>
            <CustomText style={tw`font-medium text-base  mt-3 `}>Pickup Cash at one of the following agent.</CustomText>

            <View style={tw`flex-row `}>
                <CustomText style={tw`ml-10 font-semibold mt-20 text-xl`}>Premier wallet</CustomText>
                <View style={tw`ml-20 mt-17`}>
                    <CheckBox
                        checked={selectedIndex === 0}
                        onPress={() => setIndex(0)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                </View>

            </View>


            <Pressable
                style={tw`${CustomStyles.btn} mt-60`}>
                <View style={tw`flex-row items-center gap-3`}>
                    <CustomText style={tw`text-white font-bold text-lg py-3 `}>Next</CustomText>
                </View>
            </Pressable>
        </View>
    )
}
export default MobileMoneyTransfer2;