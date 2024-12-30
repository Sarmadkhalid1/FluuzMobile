import { View, Image, TextInput, Pressable } from "react-native";
import tw from 'twrnc';
import CustomStyles from '../../constants/styles'
import React, { useState } from 'react';
import previous from '../../assets/images/previous.png';
import Input from '../../components/TextInput'
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';

export default function AddBankDetails({ placeholder, bg_color }) {
    const [writing, setWriting] = useState(false);

    return (
        <View style={tw`mx-10`}>
            <Link href="/HowToDeliverMoneyExtra" asChild>
                <Pressable >
                    <Image
                        source={previous} style={tw`w-20 h-20 ml-[-20.5]`}
                    />
                </Pressable>
            </Link>
            <View >
                <CustomText style={tw`${CustomStyles} font-extrabold text-4xl mt-2`}>Add bank details</CustomText>
                <CustomText style={tw`mt-7 text-base`} >To send money to the right bank account.</CustomText>
            </View>
            <View style={tw`mt-5 gap-1`}>
                <View style={tw`gap-1`}>
                    <CustomText style={tw`font-medium text-base mt-5`}>Bank Name</CustomText>
                    <Input ></Input>
                </View>

                <View style={tw`gap-1`}>
                    <CustomText style={tw`font-medium text-base mt-5`}>Account Number</CustomText>
                    <TextInput style={tw`${CustomStyles.input_field} ${writing ? 'border-blue-500' : ''} ${bg_color ? bg_color : ''} text-black`} onFocus={() => setWriting(true)} onBlur={() => setWriting(false)} placeholderTextColor="#0058CA66" placeholder={placeholder} keyboardType="numeric" />
                </View>

            </View>

            <Link href="/HowMuchSendingExtra" as asChild>
                <Pressable
                    style={tw`${CustomStyles.btn} mt-15`}>
                    <CustomText style={tw`text-white text-xl font-bold py-3`}>
                        Save
                    </CustomText>
                </Pressable>
            </Link>

        </View>
    )
}