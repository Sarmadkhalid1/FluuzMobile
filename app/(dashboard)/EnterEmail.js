import { View, Image, TextInput, TouchableOpacity, Dimensions, Pressable, ScrollView } from "react-native";
import { Link, } from "expo-router";
import React, { useState } from 'react';
import tw from 'twrnc';
import { Card } from 'react-native-shadow-cards';
import validator from 'validator';
import CustomText from '../../components/CustomText';


const { width, height } = Dimensions.get('window');

export default function EnterEmail() {

    const [valid, setValid] = useState(false)

    function handleEmail(text) {
        setValid(validator.isEmail(text));
    }

    return (
        <View style={{ height }}>
            <ScrollView>
                <View style={tw`w-80 mx-auto`}>
                    <View style={tw`flex-row items-center justify-between mt-5`} >
                        <Link href="/SelectDetails" asChild>
                            <Pressable>
                                <View>
                                    <Image source={require('../../assets/images/previous.png')} style={tw`w-15 ml-[-12] h-15`} />
                                </View>
                            </Pressable>
                        </Link>
                    </View>

                    <CustomText style={[tw`text-xl mt-4 font-extrabold`]} >Enter the Email Address or Phone Number you are registered with</CustomText>

                    <CustomText style={[tw`text-lg mt-25 font-bold `]}>Email</CustomText>

                    <Card style={[tw`w-80 h-11 items-start justify-around mt-5 `]}>
                        <View>
                            <TextInput style={tw`pl-6`} onChangeText={handleEmail} placeholder="Enter you email"></TextInput>
                        </View>
                    </Card>
                    {!valid && <CustomText style={tw`mt-2 text-red-500`}   >Please enter a valid Email Address</CustomText>}

                    <TouchableOpacity>
                        <Link href="/EnterNumber" style={tw`text-blue-500 text-xs font-bold underline mt-6`}>Use Phone Number</Link>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[tw`rounded-full p-3 mt-20 w-80 items-center justify-center bg-[#0058CA]`]}>
                        <CustomText style={tw`text-white font-bold text-lg`}>Send OPT</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Link href="/TermsAndConditions" style={tw`text-blue-500 text-xs font-extrabold ml-20 mt-7`}>Privacy Terms and conditions</Link>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </View>
    )
}