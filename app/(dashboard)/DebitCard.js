import React from 'react';
import { View, Pressable, Image } from "react-native";
import cross from '../../assets/images/cross.png';
import debitcard from '../../assets/images/debitcard.png';
import tw from 'twrnc';
import swipedownblack from '../../assets/images/swipedownblack.png';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';


const DebitCard = () => {
    return (
        <View >
            <Link href="/SetBalance" asChild>
                <Pressable >
                    <Image
                        source={cross} style={tw` w-20 h-20 ml-5 `}
                    />
                </Pressable>
            </Link>

            <View style={tw`mx-10`}>
                <CustomText style={tw` font-bold text-9`}>Hello, Debit Card</CustomText>
                <CustomText style={tw`font-medium text-sm `}>Get your debit card to pay, withdraw cash and keep track of your savings.</CustomText>
            </View>

            <Image style={tw`h-70 w-70 mt-20 mx-auto`} source={debitcard} />

            <View style={tw`mt-20 items-center`}>
                <CustomText style={tw`font-bold`}>Swipe for more</CustomText>
                <Image style={tw`h-2 w-4 mt-3`} source={swipedownblack} />
            </View>

            <Pressable
                style={tw`${CustomStyles.btn} mt-13 py-3 mx-10`}
            >
                <CustomText style={tw`text-white font-bold text-lg `}>Set up balance</CustomText>
            </Pressable>

        </View>
    )
}
export default DebitCard;