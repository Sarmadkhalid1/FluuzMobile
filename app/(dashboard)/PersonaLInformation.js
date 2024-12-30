import { View, Image, TextInput, Pressable, ScrollView } from "react-native";
import { Link, } from "expo-router";
import React from 'react';
import tw from 'twrnc';
import { StyleSheet } from 'react-native';
import CustomText from '../../components/CustomText';


export default function PersonaLInformation() {

    return (
        <ScrollView>
            <View style={tw`w-80 ml-8`}>
                <Link href="/Account" asChild>
                    <Pressable>
                        <View>
                            <Image source={require('../../assets/images/previous.png')} style={tw`w-20 ml-[-20] h-20`} />
                        </View>
                    </Pressable>
                </Link>
                <CustomText style={tw`font-extrabold text-3xl mt-2`}>Personal Information</CustomText>
                <CustomText style={tw`mt-2 w-70 text-sm `} >Need to change your personal details</CustomText>
            </View>


            <View style={tw`flex-row ml-9`}>
                <View>
                    <CustomText style={tw`font-semibold mt-10 text-lg`}>First Name</CustomText>
                    <TextInput style={tw`font-medium text-sm `}>Abdi</TextInput>

                    <View>
                        <View style={tw`w-80 mt-1 mr-[-10] h-0.4 bg-blue-400`} />
                    </View>
                </View>
            </View>

            <View style={tw`flex-row ml-9`}>
                <View>
                    <CustomText style={tw`font-semibold mt-4 text-lg`}>Last Name</CustomText>
                    <TextInput style={tw`font-medium text-sm `}>Ahmed</TextInput>
                    <View>
                        <View style={tw`w-80 mt-1 mr-[-10] h-0.4 bg-blue-400`} />
                    </View>
                </View>
            </View>

            <View style={tw`flex-row ml-9`}>
                <View>
                    <CustomText style={tw`font-semibold mt-4 text-lg`}>Address</CustomText>
                    <TextInput style={tw`font-medium text-sm `}>Lorem Ipsum</TextInput>
                    <View>
                        <View style={tw`w-80 mt-1 mr-[-10] h-0.4 bg-blue-400`} />
                    </View>
                </View>
            </View>

            <View style={tw`flex-row ml-9`}>
                <View>
                    <CustomText style={tw`font-semibold mt-4 text-lg`}>Postal Code</CustomText>
                    <TextInput style={tw`font-medium text-sm `}>58356</TextInput>
                    <View>
                        <View style={tw`w-80 mt-1 mr-[-10] h-0.4 bg-blue-400`} />
                    </View>
                </View>
            </View>

            <View style={tw`flex-row ml-9`}>
                <View>
                    <CustomText style={tw`font-semibold mt-4 text-lg`}>City</CustomText>
                    <TextInput style={tw`font-medium text-sm `}>Lorem Ipsum</TextInput>
                    <View>
                        <View style={tw`w-80 mt-1 mr-[-10] h-0.4 bg-blue-400`} />
                    </View>
                </View>
            </View>

            <View style={tw`flex-row ml-9`}>
                <View>
                    <CustomText style={tw`font-semibold mt-4 text-lg`}>Country</CustomText>
                    <TextInput style={tw`font-medium text-sm `}>Lorem Ipsum</TextInput>
                    <View>
                        <View style={tw`w-80 mt-1 mr-[-10] h-0.4 bg-blue-400`} />
                    </View>
                </View>
            </View>

            <View style={tw`flex-row ml-9`}>
                <View>
                    <CustomText style={tw`font-semibold mt-4 text-lg`}>Email </CustomText>
                    <TextInput style={tw`font-medium text-sm `}>Mail@gmail.com</TextInput>
                    <View>
                        <View style={tw`w-80 mt-1 mr-[-10] h-0.4 bg-blue-400`} />
                    </View>
                </View>
            </View>

            <View style={tw`flex-row ml-9`}>
                <View>
                    <CustomText style={tw`font-semibold mt-4 text-lg`}>Mobile Phone Number </CustomText>
                    <TextInput style={tw`font-medium text-sm mb-10 `}>032234654</TextInput>

                </View>
            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    shadowColor: "blue",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
})