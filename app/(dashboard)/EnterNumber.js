import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Pressable, ScrollView } from "react-native";
import { Link, } from "expo-router";
import React, { useState, useRef } from 'react';
import tw from 'twrnc';
import CustomStyles from '../../constants/styles'
import PhoneInput from "react-native-phone-number-input";
import CustomText from '../../components/CustomText';


const { width, height } = Dimensions.get('window');

export default function EnterNumber() {

    const phoneInput = useRef(null);
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);

    const handlePhoneInputChange = (text) => {
        setValue(text);
        const isValid = phoneInput.current?.isValidNumber(text);
        setValid(isValid);
    };


    return (
        <View style={{ height }}>
            <ScrollView>
                <View style={tw`w-80 mx-auto`}>
                    <View style={tw`flex-row items-center justify-between mt-5`} >
                        <Link href="/EnterEmail" asChild>
                            <Pressable>
                                <View>
                                    <Image source={require('../../assets/images/previous.png')} style={tw`w-15 ml-[-12] h-15`} />
                                </View>
                            </Pressable>
                        </Link>
                    </View>

                    <CustomText style={[tw`text-xl mt-4 font-extrabold`]} >Enter the Email Address or Phone Number you are registered with</CustomText>

                    <CustomText style={[tw`text-lg mt-25 font-bold `]}>Phone Number</CustomText>

                    <View>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="SE"
                            layout="first"
                            onChangeText={handlePhoneInputChange}
                            withShadow
                        />

                        {!valid && <CustomText style={tw`mt-2 text-red-500`}   >Please enter a valid phone number to Continue</CustomText>}
                        <TouchableOpacity>
                            <Link href="/EnterEmail" style={tw`text-blue-500 text-xs font-bold underline mt-3`}>Use Email</Link>
                        </TouchableOpacity>

                        {!valid && (
                            <Pressable style={tw`${CustomStyles.btn} p-3 mt-25`}  >

                                <CustomText style={tw`text-white font-bold text-lg`}>Send OPT</CustomText>
                            </Pressable>
                        )}

                        {valid && (
                            <Link asChild href="/EnterEmail" style={tw`text-white font-bold`}>
                                <TouchableOpacity style={tw`${CustomStyles.btn} p-3 mt-20`}  >

                                    <CustomText style={tw`text-white font-bold text-lg`}>Send OPT</CustomText>
                                </TouchableOpacity>
                            </Link>
                        )}
                    </View>



                    <TouchableOpacity>
                        <Link href="/TermsAndConditions" style={tw`text-blue-500 text-xs font-extrabold ml-20 mt-7`}>Privacy Terms and conditions</Link>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
})