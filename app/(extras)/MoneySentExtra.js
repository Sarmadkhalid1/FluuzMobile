import React from "react";
import { View, Pressable, ImageBackground, Image, Dimensions } from "react-native";
import background from '../../assets/images/background.png';
import tw from 'twrnc';
import cross from '../../assets/images/cross.png';
import { primary_color } from "../../constants/styles";
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';


const { width, height } = Dimensions.get('screen');

const MoneySent = () => {
    return (
        <ImageBackground source={background} style={{ alignContent: 'center', alignItems: 'center', height, width, position: 'absolute' }} resizeMode="cover">

            <Link href="/Onboarding" asChild style={[tw`mt-5`, { alignSelf: 'flex-start' }]}>
                <Pressable >
                    <Image source={cross} style={[tw` w-20 h-20 ml-4 mt-5`]} />
                </Pressable>
            </Link>

            <View style={tw`mx-10 items-center mt-10`}>
                <CustomText style={tw`font-bold text-6 items-center`}>Money on the way</CustomText>
                <CustomText style={tw`font-medium text-base mt-3 text-center`}>We partner with secure payment providers to make it easy.</CustomText>

            </View>

            <Pressable
                style={tw`${CustomStyles.btnlight} mt-7 px-20 py-3`}
            >
                <CustomText style={tw`text-[${primary_color}] font-semibold text-lg `}>Open mobile bank ID</CustomText>
            </Pressable>

            <View style={tw`mx-10 bg-white p-7 mt-7 rounded-lg `}>
                <CustomText style={tw`font-bold text-5 items-center`}>You sent SEK54652.70 to Abdi</CustomText>
                <CustomText style={tw`font-medium text-sm mt-3`}>Most transfer arrives in few minutes. We’ll let you know when your money is ready.</CustomText>

                <Link href="/Reminder" asChild style={tw`${CustomStyles.btnlight} mt-7 `}>
                    <Pressable>
                        <View style={tw`flex-row items-center gap-3`}>
                            <Link href="/Reminder" style={tw`text-[${primary_color}] font-semibold text-base py-3`}>Schedule Transfer</Link>
                        </View>
                    </Pressable>
                </Link>

                <Pressable
                    style={tw`${CustomStyles.btn} mt-3`}
                >
                    <View style={tw`flex-row items-center gap-3`}>
                        <CustomText style={tw`text-white font-semibold text-base py-3`}>Check status and details</CustomText>
                    </View>
                </Pressable>

                <Link href="/Onboarding" asChild style={tw`mx-auto pt-7`}>
                    <Pressable >
                        <CustomText style={tw`text-[${primary_color}] text-lg `}>Done</CustomText>
                    </Pressable>
                </Link>

            </View>
        </ImageBackground>
    )
}
export default MoneySent;