import { View, Image, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import React from 'react';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles'
import previous from '../../assets/images/previous.png';
import CustomText from "../../components/CustomText";

export default function MoneyTransfer2() {
    const { width, height } = Dimensions.get('window');


    return (
        <View style={{ height }}>
            <ScrollView>
                <View style={tw`w-80 mx-auto`}>
                    <View style={tw`flex-row items-center justify-between mt-5`} >
                        <Image
                            source={previous}
                            style={
                                tw`w-15 ml-[-12] h-15`
                            }
                        />
                        <Image
                            source={require('../../assets/images/MenuLine.png')}
                            style={
                                tw`w-7 h-5 `
                            }
                        />
                    </View>
                </View>
                <View style={[tw`mx-10`]} >
                    <View style={[tw`flex-row`]} >
                        <CustomText style={[tw`font-extrabold mt-2 text-3xl`]}>Fluuz</CustomText>
                        <Image source={require('../../assets/images/eng.png')} style={
                            tw`w-16  h-5 ml-34 `
                        } />
                    </View>
                    <CustomText style={[tw`font-extrabold mt-2 text-lg`]}>Fluuz {">"}  General Information</CustomText>
                    <CustomText style={[tw`font-extrabold mt-9 text-xl`]}>How do I create a transfer account?</CustomText>

                    <View style={[tw`justify-center`]} >
                        <CustomText style={[tw` mt-3 text-base`]}>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CustomText>
                        <CustomText style={[tw` mt-1 text-base`]}>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CustomText>
                        <CustomText style={[tw`font-bold mt-7 text-lg`]}>Have a question. Need help?</CustomText>
                        <CustomText style={tw`text-blue-500 text-base font-bold mt-2`} color="#0058CA">Got an invite code?</CustomText>
                        <CustomText style={[tw`font-medium mt-7 text-lg`]}>Was the article helpful?</CustomText>
                        <View style={[tw`flex-row mx-auto`]} >
                            <Image source={require('../../assets/images/like.png')}
                                style={tw`w-40 h-40  mt-7 mb-5`} />
                            <Image source={require('../../assets/images/dislike.png')}
                                style={tw`w-40 h-40  mt-7 mb-5`} />

                        </View>
                        <CustomText style={[tw`font-medium ml-4  text-lg`]}>801  out of 1000 found it helpful</CustomText>
                        <CustomText style={tw`text-blue-500 text-base font-bold mt-20 ml-20`} color="#0058CA">Got an invite code?</CustomText>
                        <CustomText style={[tw`font-medium  text-lg ml-21`]}>Let us help you!</CustomText>

                        <TouchableOpacity
                            style={tw`bg-blue-500 rounded-full  p-3 mt-6 w-80 items-center justify-center bg-[${primary_color}]`}>
                            <CustomText style={tw`text-white font-bold text-lg`}>Contact Us</CustomText>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={tw`bg-[#DFEFFF]  mt-10 pb-30 `} >
                    <View style={[tw`mx-1`]}>
                        <CustomText style={tw`ml-10  mt-4 text-black font-bold text-3xl`}>Fluuz</CustomText>
                        <CustomText style={tw`ml-10 mt-2 text-black mx-10 `}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CustomText>
                        <CustomText style={tw`ml-10  mt-15 text-black font-bold text-3xl`}>Help</CustomText>
                        <CustomText style={tw`ml-10 mt-2 font-medium text-black `}>How it works</CustomText>
                        <CustomText style={tw`ml-10 mt-2 font-medium text-black `}>Help center</CustomText>
                        <CustomText style={tw`ml-10 mt-2 font-medium text-black `}>Customer Support</CustomText>
                        <CustomText style={tw`ml-10  mt-5 text-black font-bold text-3xl`}>About us</CustomText>
                        <CustomText style={tw`ml-10 mt-2 font-medium text-black `}>Our Story</CustomText>
                        <CustomText style={tw`ml-10 mt-2 font-medium text-black `}>Career</CustomText>
                        <CustomText style={tw`ml-10 mt-2 font-medium text-black `}>Press & Media</CustomText>
                        <CustomText style={tw`ml-10  mt-5 text-black font-bold text-3xl`}>Legal</CustomText>
                        <CustomText style={tw`ml-10 mt-3 font-medium text-black `}>Terms and condtions</CustomText>
                        <CustomText style={tw`ml-10 mt-2 font-medium text-black `}>Privacy Policy</CustomText>
                        <CustomText style={tw`ml-10 mt-2 font-medium text-black `}>Whistleblowing</CustomText>
                        <CustomText style={tw`ml-10 mt-2 font-medium text-black `}>Feedback and Complaints</CustomText>
                        <CustomText style={tw`ml-10  mt-4 text-black font-bold text-3xl`}>Connect with us</CustomText>

                        <View style={tw`flex-row mx-10 mt-4`} >
                            <Image
                                source={require('../../assets/images/insta.png')}
                                style={
                                    tw`w-15  h-15 `
                                }
                            />
                            <Image
                                source={require('../../assets/images/insta.png')}
                                style={
                                    tw`w-15 h-15 ml-5 `
                                }
                            />
                            <Image
                                source={require('../../assets/images/linkedin.png')}
                                style={
                                    tw`w-15 h-15 ml-5 `
                                }
                            />
                        </View>
                        <View style={tw`flex-row mx-10 items-center`}>
                            <View style={tw`flex-1 mt-5 h-0.4 bg-blue-500`} />
                        </View>


                    </View>
                    <CustomText style={tw`ml-10 mt-2 font-medium mx-15 text-black `}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</CustomText>


                </View>
            </ScrollView>

        </View>
    )
}