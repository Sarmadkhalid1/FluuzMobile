import { Link, } from "expo-router";
import React from 'react';
import { Dimensions, Image, Pressable, ScrollView, View } from "react-native";
import tw from 'twrnc';
import CustomText from "../../components/CustomText";
import previous from '../../assets/images/previous.png';


export default function AboutMoneyTransfer() {
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
                    <CustomText style={[tw`font-extrabold mt-2 text-3xl`]}>About Fluuz</CustomText>

                    <View style={[tw`justify-center`]} >
                        <CustomText style={[tw` mt-6 text-base`]}>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CustomText>
                        <CustomText style={[tw` mt-1 text-base`]}>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</CustomText>

                    </View>
                </View>

                <View style={tw`bg-[#DFEFFF]  mt-10 pb-30 `} >
                    <View style={[tw`mx-1`]}>
                        <CustomText style={tw`  mt-4 ml-30 text-black font-bold text-3xl`}>Our Story</CustomText>
                    </View>
                    <CustomText style={tw`ml-10 mt-2  mx-15 text-black `}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</CustomText>


                    <Image
                        source={require('../../assets/images/2014.png')}
                        style={
                            tw` ml-9 mt-15 w-12 h-12 `
                        }
                    />
                    <View style={tw`mx-15  mr-5 flex-row`}>
                        <View style={tw` w-0.4 h-20 bg-blue-500`} />
                        <View style={tw` ml-13 mt-[-30]`}>
                            <CustomText style={tw`font-bold text-xl `} >Birth of Fluuz</CustomText>
                            <CustomText style={tw`text-xs mt-2 mr-15`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CustomText>
                        </View>
                    </View>
                    <Image
                        source={require('../../assets/images/2015.png')}
                        style={
                            tw` ml-9 w-12 h-12 `
                        }
                    />
                    <View style={tw`mx-15  mr-5 flex-row`}>
                        <View style={tw` w-0.4 h-20 bg-blue-500`} />
                        <View style={tw` ml-13 mt-[-30]`}>
                            <CustomText style={tw`font-bold text-xl `} >Building the platform</CustomText>
                            <CustomText style={tw`text-xs mt-2 mr-15`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CustomText>
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/images/2016.png')}
                        style={
                            tw` ml-9 w-12 h-12 `
                        }
                    />
                    <View style={tw`mx-15  mr-5 flex-row`}>
                        <View style={tw` w-0.4 h-25 bg-blue-500`} />
                        <View style={tw` ml-13 mt-[-30]`}>
                            <CustomText style={tw`font-bold text-xl `} >Launch the praise</CustomText>
                            <CustomText style={tw`text-xs mt-2 mr-15`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CustomText>
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/images/2017.png')}
                        style={
                            tw` ml-9 w-12 h-12 `
                        }
                    />
                    <View style={tw`mx-15  mr-5 flex-row`}>
                        <View style={tw` w-0.4 h-25 bg-blue-500`} />
                        <View style={tw` ml-13 mt-[-30]`}>
                            <CustomText style={tw`font-bold text-xl `} >Development and expansion</CustomText>
                            <CustomText style={tw`text-xs mt-2 mr-15`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CustomText>
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/images/2018.png')}
                        style={
                            tw` ml-9 w-12 h-12 `
                        }
                    />
                    <View style={tw`mx-15  mr-5 flex-row`}>
                        <View style={tw` w-0.4 h-25 bg-blue-500`} />
                        <View style={tw` ml-13 mt-[-30]`}>
                            <CustomText style={tw`font-bold text-xl `} >Growth funding</CustomText>
                            <CustomText style={tw`text-xs mt-2 mr-15`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CustomText>
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/images/2019.png')}
                        style={
                            tw` ml-9 w-12 h-12 `
                        }
                    />
                    <View style={tw`mx-15  mr-5 flex-row`}>
                        <View style={tw` w-0.4 h-25 bg-blue-500`} />
                        <View style={tw` ml-13 mt-[-30]`}>
                            <CustomText style={tw`font-bold text-xl `} >Growth and record milestone</CustomText>
                            <CustomText style={tw`text-xs mt-2 mr-15`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CustomText>
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/images/2020.png')}
                        style={
                            tw` ml-9 w-12 h-12 `
                        }
                    />
                    <View style={tw`mx-15  mr-5 flex-row`}>
                        <View style={tw` w-0.4 h-25 bg-blue-500`} />
                        <View style={tw` ml-13 mt-[-30]`}>
                            <CustomText style={tw`font-bold text-xl `} >Expansion</CustomText>
                            <CustomText style={tw`text-xs mt-2 mr-15`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CustomText>
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/images/2021.png')}
                        style={
                            tw` ml-9 w-12 h-12 `
                        }
                    />
                    <View style={tw`mx-15  mr-5 flex-row`}>
                        <View style={tw` w-0.4 h-25 bg-blue-500`} />
                        <View style={tw` ml-13 mt-[-30]`}>
                            <CustomText style={tw`font-bold text-xl `} >Growth and stability</CustomText>
                            <CustomText style={tw`text-xs mt-2 mr-15`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CustomText>
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/images/2022.png')}
                        style={
                            tw` ml-9 w-12 h-12 `
                        }
                    />
                    <View style={tw`mx-15  mr-5 flex-row`}>
                        <View style={tw` ml-13 mt-[-30]`}>
                            <CustomText style={tw`font-bold text-xl `} >Super app for imigrants</CustomText>
                            <CustomText style={tw`text-xs mt-2 mr-15`} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</CustomText>
                        </View>
                    </View>


                </View>
            </ScrollView>

        </View>
    )
}