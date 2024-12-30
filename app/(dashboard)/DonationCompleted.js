import React, { useState, useRef } from "react";
import { View, TextInput, Pressable, ImageBackground, Image, Dimensions, Modal, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import previous from '../../assets/images/previous.png';
import unhcr from '../../assets/images/unhcr.png';
import tw from 'twrnc';
const { width, height } = Dimensions.get('screen');
import { Link, } from "expo-router";
import Input from '../../components/TextInput'
import CustomText from "../../components/CustomText";
import markblue from '../../assets/images/markblue.png'
import { Card } from 'react-native-shadow-cards';
import { CheckBox } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

const DonationCompleted = () => {

    const { t } = useTranslation();


    return (
        <View style={tw`flex-1 relative`}>

            <Link href="/Donations" asChild>
                <Pressable>
                    <Image source={previous} style={tw`w-20 h-20`} />
                </Pressable>
            </Link>

            <CustomText style={tw`${CustomStyles.text_primary} text-2xl text-center font-bold`}>{t("Screens.DonationCompleted.text")}</CustomText>
            <CustomText style={tw`font-bold text-lg text-center mt-1`}>For 100$</CustomText>

            <Image style={tw`mx-auto mt-20`} source={markblue} />

            <CustomText style={tw`text-center text-lg font-semibold mt-10`}>{t("Screens.DonationCompleted.textYou")}</CustomText>
            <CustomText style={tw`text-center text-lg font-semibold`}>The UN Refugee Agency</CustomText>

            <CustomText style={tw`${CustomStyles.text_primary} text-sm text-center font-bold mt-10`}>{t("Screens.DonationCompleted.textLearn")}</CustomText>

            <TouchableOpacity style={tw`${CustomStyles.btn} mx-10 px-25 py-3 absolute bottom-10 `}>
                <CustomText style={tw`text-white font-bold text-lg`}>{t("Screens.DonationCompleted.textDonate")}</CustomText>
            </TouchableOpacity>

        </View>

    )
}
export default DonationCompleted;