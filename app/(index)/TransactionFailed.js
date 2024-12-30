import React from "react";
import { View, Pressable, ImageBackground, Image, Dimensions } from "react-native";
import background from '../../assets/images/background.png';
import tw from 'twrnc';
import cross from '../../assets/images/cross.png';
import { Link, } from "expo-router";
import CustomText from "../../components/CustomText";

const { width, height } = Dimensions.get('screen');


const TransactionFailed = () => {
    return (
        <ImageBackground source={background} style={{ height, width, position: 'absolute' }} resizeMode="cover">

            <Link style={tw`mt-8`} href="/Trustly" asChild>
                <Pressable >
                    <Image
                        source={cross} style={tw` w-20 h-20 ml-5 `}
                    />
                </Pressable>
            </Link>

            <View style={tw`mx-10 bg-white p-5 pt-13 my-auto rounded-lg`}>
                <CustomText style={tw`font-bold text-5 text-center`}>Transaction Failed</CustomText>
                <CustomText style={tw`font-medium text-sm mt-3 text-center `}>Most transfer arrives in few minutes. We’ll let you know when your money is ready.</CustomText>

                <Pressable
                    style={tw`${CustomStyles.btn} mt-7 mb-20`}
                >
                    <View style={tw`flex-row items-center gap-3`}>
                        <CustomText style={tw`text-white font-semibold text-lg py-3`}>Try Again</CustomText>
                    </View>
                </Pressable>
            </View>

        </ImageBackground>
    )
}
export default TransactionFailed;