import React from "react";
import { View, Pressable, Image, Dimensions, ScrollView } from "react-native";
import previous from '../../assets/images/previous.png';
import paypal from '../../assets/images/paypal.png';
import creditcard from '../../assets/images/creditcard.png';
import bitcoin from '../../assets/images/bitcoin.png';
import payoneer from '../../assets/images/payoneer.png';
import paystack from '../../assets/images/paystack.png';
import paytm from '../../assets/images/paytm.png';
import voguepay from '../../assets/images/voguepay.png';
import dot1 from '../../assets/images/dot1.png';
import setting from '../../assets/images/setting.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import { Card } from "react-native-shadow-cards";
import { Link, } from "expo-router";
import CustomText from "../../components/CustomText";


const { width, height } = Dimensions.get('window');


const Deposit = () => {
    return (
        <ScrollView>
            <View style={{ height, width }}>
                <View>
                    <View>
                        <View style={tw`flex-row items-center justify-between`}>
                            <Link href="/SelectBank" asChild>
                                <Pressable >
                                    <Image
                                        source={previous} style={tw` w-20 h-20 ml-5 `}
                                    />
                                </Pressable>
                            </Link>
                            <Link href="/Account" asChild>
                                <Pressable >
                                    <Image
                                        source={setting} style={tw`w-8 h-8 mr-8 `}
                                    />
                                </Pressable>
                            </Link>
                        </View>
                    </View>

                    <CustomText style={tw`font-bold text-7 ml-10`}>Deposit</CustomText>

                    <View>
                        <View style={tw`flex-row justify-center mt-6 gap-3`}>
                            <View>
                                <Image style={tw`h-18 w-18 mx-auto`} source={paypal} />
                                <CustomText style={tw`font-semibold text-center w-20`}>Paypal</CustomText>
                            </View>

                            <View>
                                <Image style={tw`h-18 w-18 mx-auto`} source={creditcard} />
                                <CustomText style={tw`font-semibold text-center w-20`}>Credit Card</CustomText>
                            </View>

                            <View>
                                <Image style={tw`h-18 w-18 mx-auto`} source={bitcoin} />
                                <CustomText style={tw`font-semibold text-center w-20`}>Bitcoin</CustomText>
                            </View>

                            <View>
                                <Image style={tw`h-18 w-18 mx-auto`} source={payoneer} />
                                <CustomText style={tw`font-semibold text-center w-20`}>Payoneer</CustomText>
                            </View>
                        </View>
                    </View>

                    <View style={tw`flex-row justify-center mt-6 gap-3`}>

                        <View>
                            <Image style={tw`h-18 w-18 mx-auto`} source={paystack} />
                            <CustomText style={tw`font-semibold text-center w-20`}>PaystaCK</CustomText>
                        </View>

                        <View>
                            <Image style={tw`h-18 w-18 mx-auto`} source={paytm} />
                            <CustomText style={tw`font-semibold text-center w-20`}>Pay TM</CustomText>
                        </View>

                        <View>
                            <Image style={tw`h-18 w-18 mx-auto`} source={voguepay} />
                            <CustomText style={tw`font-semibold text-center w-20`}>VoguePay</CustomText>
                        </View>

                        <View>
                            <View style={tw`flex-row items-center mx-auto`}>
                                <View style={tw`bg-blue-200 w-18 h-18 rounded-full flex-row items-center`} >
                                    <Image style={tw`h-2 ml-4  w-2`} source={dot1} />
                                    <Image style={tw`h-2 mx-2 w-2`} source={dot1} />
                                    <Image style={tw`h-2 mx-0 w-2`} source={dot1} />
                                </View>
                            </View>
                            <CustomText style={tw`font-semibold text-center w-20`}>See All</CustomText>
                        </View>
                    </View>
                </View>
                <View style={[{ width }, tw`grow`]}>
                    <Card style={[{ width }, tw`mt-auto`]}>
                        <View style={tw`p-5 gap-3 mx-7`}>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-semibold text-4`}>Total Cost</CustomText>
                                <CustomText>$456</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between border-b pb-2 border-[${primary_color}]`}>
                                <CustomText >Fee</CustomText>
                                <CustomText>$8</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText >Rate</CustomText>
                                <CustomText>1$= 345KES</CustomText>
                            </View>
                        </View>
                    </Card>
                    <Pressable
                        style={tw`${CustomStyles.btn} mt-13 mb-5 py-3 mx-10`}
                    >
                        <View style={tw`flex-row items-center gap-3`}>
                            <Link href="/ArrivedMoney" style={tw`text-white font-bold text-lg`}>Continue</Link>
                        </View>
                    </Pressable>
                </View>

            </View>
        </ScrollView>
    )
}
export default Deposit;