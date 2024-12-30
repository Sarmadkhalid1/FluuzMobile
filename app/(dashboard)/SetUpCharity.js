import React, { useState, useRef } from "react";
import { View, TextInput, Pressable, ImageBackground, Image, Dimensions, Modal, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import previous from '../../assets/images/previous.png';
import person from '../../assets/images/person.png';
import person2 from '../../assets/images/person2.png';
import charity from '../../assets/images/charity.png';
import tw from 'twrnc';
import { Link, } from "expo-router";
import Input from '../../components/TextInput'
import CustomText from "../../components/CustomText";
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('screen');
const SetUpCharity = () => {
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
            </View>

            <View style={tw`mx-5`}>
                <CustomText style={tw`text-xl font-bold text-4xl`}>Wells in Uganda</CustomText>
                <CustomText style={tw`font-semibold`}>By Smile foundation</CustomText>
            </View>

            <View style={tw`mt-10 relative`}>
                <Image style={tw`mx-auto`} source={charity} />
                <CustomText style={tw`absolute mx-15  mt-10 text-white font-bold text-lg`}>A Gift of $20 provides someone with water for 20 years. </CustomText>
                <Link href="/Donations" asChild >
                    <Pressable style={tw`bg-[#DFEFFF] py-3 px-10 rounded-full absolute bottom-14 ml-27`}>
                        <CustomText style={tw`text-base font-bold`}>Donate now</CustomText>
                    </Pressable>
                </Link>
            </View>

            <View style={tw`mx-5 mt-5`}>
                <CustomText style={tw`font-bold text-xl`}>About</CustomText>
                <CustomText style={tw`mt-3 font-semibold text-base`}>We've been building water wells in rural Africa since 1996.
                    We believe clean water is the first step out of poverty, and that those without any should have it first. </CustomText>
                <Pressable>
                    <CustomText style={tw`${CustomStyles.text_primary} text-lg text-right`}>Learn more</CustomText>
                </Pressable>
            </View>

            <View style={tw`mx-5 rounded-lg border border-blue-500 mt-15 p-5 bg-[#EBF4FF]`}>
                <Progress.Bar progress={0.55} width={300} height={8} />
                <View style={tw`mt-2 flex-row justify-between`}>
                    <CustomText style={tw`text-gray-500 font-bold`}>$25,000</CustomText>
                    <CustomText style={tw`text-gray-500 font-bold`}>861</CustomText>
                    <CustomText style={tw`text-gray-500 font-bold`}>$50,000</CustomText>
                </View>

                <View style={tw`flex-row justify-between`}>
                    <CustomText style={tw`text-gray-500 font-bold`}>Raised</CustomText>
                    <CustomText style={tw`text-gray-500 font-bold`}>Donations</CustomText>
                    <CustomText style={tw`text-gray-500 font-bold`}>Goal</CustomText>
                </View>
            </View>

            <View style={tw`flex-row justify-between mx-5 mt-10`}>
                <CustomText style={tw`font-bold text-lg`}>Participant</CustomText>
                <Pressable>
                    <CustomText style={tw`font-bold text-lg ${CustomStyles.text_primary}`}>See All</CustomText>
                </Pressable>
            </View>

            <View style={tw`flex-row mx-5 relative mb-18`}>
                <Image style={tw`absolute border-[6px] border-white rounded-full`} source={person} />
                <Image style={tw`absolute left-10 z-99 border-[6px] border-white rounded-full`} source={person2} />
                <Image style={tw`absolute left-20 z-999  border-[6px] border-white rounded-full`} source={person} />
                <Image style={tw`absolute left-30 z-9999 border-[6px] border-white rounded-full`} source={person2} />
                <View style={tw`bg-[#0058CA] w-18 h-18 rounded-full absolute left-40 z-9999  border-[6px] border-white rounded-full`}>
                    <CustomText style={tw`font-bold  text-base text-white mx-auto my-auto`}>10+</CustomText>
                </View>
            </View>

            <Pressable
                style={tw`${CustomStyles.btn} mt-6 py-3 mx-10 mb-15 `}
            >
                <CustomText style={tw`text-white font-bold text-lg`}>Donate Now</CustomText>
            </Pressable>

        </ScrollView>
    )
}
export default SetUpCharity;