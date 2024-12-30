import React, { useState, useRef } from "react";
import { View, TextInput, Pressable, ImageBackground, Image, Dimensions, Modal, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import previous from '../../assets/images/previous.png';
import upload from '../../assets/images/upload.png';
import tw from 'twrnc';
const { width, height } = Dimensions.get('screen');
import { Link, } from "expo-router";
import Input from '../../components/TextInput'
import CustomText from "../../components/CustomText";
import { useTranslation } from 'react-i18next';



const RegisterCharity = () => {
    const [text, setText] = useState('');
    const { t } = useTranslation();


    const handleChangeText = newText => {
        setText(newText);
    };

    return (
        <ScrollView>
            <View>
                <Link href="/Donations" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw` w-20 h-20 `}
                        />
                    </Pressable>
                </Link>

                <CustomText style={tw`text-4xl font-bold mx-10 `}>{t("Screens.RegisterCharity.text")}</CustomText>
                <CustomText style={tw`mx-10 mt-5 text-base`}>{t("Screens.RegisterCharity.textSet")}</CustomText>

                <View style={tw`mx-10 mt-10 mb-10 gap-2`}>
                    <View style={tw`gap-1  `}>
                        <CustomText style={tw`font-bold text-sm mt-1 `}>{t("Screens.RegisterCharity.textName")}</CustomText>
                        <Input placeholder={"Smile foundation"}></Input>
                    </View>

                    <View style={tw`gap-1  `}>
                        <CustomText style={tw`font-bold text-sm mt-1 `}>{t("Screens.RegisterCharity.textTitle")}</CustomText>
                        <Input placeholder={"Wells in Uganda"}></Input>
                    </View>

                    <View style={tw`gap-1  `}>
                        <CustomText style={tw`font-bold text-sm mt-1 `}>{t("Screens.RegisterCharity.textOrgannization")}</CustomText>
                        <Input placeholder={"0012-5500 00669"}></Input>
                    </View>

                    <View style={tw`gap-1  `}>
                        <CustomText style={tw`font-bold text-sm mt-1 `}>{t("Screens.RegisterCharity.textGoal")}</CustomText>
                        <Input placeholder={"$50,000"}></Input>
                    </View>

                    <View style={tw`gap-1  `}>
                        <CustomText style={tw`font-bold text-sm mt-1 `}>{t("Screens.RegisterCharity.textAbout")}</CustomText>
                        <Input multiline={true} numberOfLines={5} placeholder={" We've been building water wells in rural Africa since 1996.We believe clean water is the first step out of poverty, and that those without any should have it first."}></Input>
                    </View>

                    <View style={tw`gap-1  `}>
                        <CustomText style={tw`font-bold text-sm mt-1 `}>{t("Screens.RegisterCharity.textUpload")}</CustomText>
                        <View style={tw`bg-[#EBF4FF] p-10 rounded-lg border-dashed border-2 border-indigo-200`}>
                            <Image style={tw`h-10 w-10 mx-auto`} source={upload} />
                        </View>
                    </View>
                    <Pressable
                        style={tw`${CustomStyles.btn} mt-6 py-3`}
                    >
                        <CustomText style={tw`text-white font-bold text-lg`}>{t("Screens.RegisterCharity.textSend")}</CustomText>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}
export default RegisterCharity;
