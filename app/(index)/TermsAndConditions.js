import { View, Image, Dimensions, Pressable, ScrollView } from "react-native";
import { Link, } from "expo-router";
import React from 'react';
import tw from 'twrnc';
import previous from '../../assets/images/previous.png';
import CustomText from "../../components/CustomText";


export default function TermsAndConditions() {
    const { width, height } = Dimensions.get('window');


    return (
        <View style={{ height }}>
            <ScrollView>
                <View style={tw``}>
                    <View style={tw`flex-row items-center justify-between mt-5`} >
                        <Link href="/Account" asChild>
                            <Pressable >
                                <Image
                                    source={previous} style={tw` w-20 h-20 ml-5 `} />
                            </Pressable>
                        </Link>
                    </View>
                </View>
                <View style={[tw`mx-10`]} >
                    <CustomText style={[tw`font-extrabold mt-2 text-3xl`]}>Terms and conditions</CustomText>

                    <View style={[tw`justify-center`]} >
                        <CustomText style={[tw` mt-6 text-base`]}>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CustomText>
                        <CustomText style={[tw` mt-1 text-base`]}>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CustomText>
                        <CustomText style={[tw` mt-6 text-base`]}>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CustomText>
                        <CustomText style={[tw` mt-1  text-base`]}>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CustomText>

                    </View>
                </View>


            </ScrollView>

        </View>
    )
}