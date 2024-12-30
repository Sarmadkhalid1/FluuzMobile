import React from "react";
import { View, Pressable, Image } from "react-native";
import previous from '../../assets/images/previous.png';
import tw from 'twrnc';
import { primary_color } from "../../constants/styles";
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';


const Trustly = () => {
    return (
        <View>
            <Link href="/Trustly2Extra" asChild >
                <Pressable >
                    <Image
                        source={previous} style={tw` w-20 h-20 ml-5 `}
                    />
                </Pressable>
            </Link>

            <View style={tw`mx-10  mt-50 `}>

                <CustomText style={tw`font-bold text-6 text-center`}>Lorem Ipsum</CustomText>
                <CustomText style={tw`font-medium text-base mt-3 text-center`}>We partner with secure payment {"\n"} providers to make it easy.</CustomText>

                <Link href="/MoneySent" asChild>
                    <Pressable style={tw`${CustomStyles.btnlight} mt-7 py-3`}>
                        <CustomText style={tw`text-[${primary_color}] font-bold text-lg `}>Open mobile bank ID</CustomText>
                    </Pressable>
                </Link>
            </View>
        </View>
    )
}
export default Trustly;