import React, { useState, useRef } from "react";
import { View, TextInput, Pressable, ImageBackground, Image, Dimensions, Modal, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import previous from '../../assets/images/previous.png';
import tw from 'twrnc';
const { width, height } = Dimensions.get('screen');
import { Link, } from "expo-router";
import CustomText from "../../components/CustomText";
import { primary_color } from "../../constants/styles";

const InviteFriends = () => {
    return (
        <View>
            <Link href="/Home" asChild>
                <Pressable style={tw`mt-5`} >
                    <Image
                        source={previous} style={tw` w-20 h-20 `}
                    />
                </Pressable>
            </Link>

            <CustomText style={tw`font-bold text-4xl mx-5`}>Invite your friends</CustomText>
            <View style={tw`mx-10`}>
                <CustomText style={tw`font-bold text-xl`}>Get 20$ in credits </CustomText>
                <CustomText style={tw`font-semibold text-[#8A8D9F] text-base mt-3`}>Available until 24 July 2024 </CustomText>
                <CustomText style={tw`font-semibold text-lg mt-5`}>Use this voucher in payment page and enjoy your 20$ in credits</CustomText>
                <CustomText style={{ fontSize: 20 }}>
                    <CustomText style={styles.coloredDot}>{'\u25CF'}</CustomText>
                    {` Give a friend 20$ in credits to use for their first transaction.`}
                </CustomText>

                <CustomText style={{ fontSize: 20 }}>
                    <CustomText style={styles.coloredDot}>{'\u25CF'}</CustomText>
                    {` Give a friend 20$ in credits to use for their first transaction.`}
                </CustomText>
            </View>

        </View>
    )
}
export default InviteFriends;
const styles = StyleSheet.create({
    defaultText: {
        fontSize: 20,
    },
    coloredDot: {
        color: '#0058CA',
    },
});
