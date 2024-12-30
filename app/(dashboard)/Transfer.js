import React from "react";
import { View, Pressable, Image, ScrollView } from "react-native";
import previous from '../../assets/images/previous.png';
import swipedown from '../../assets/images/swipedown.png';
import dotstwo from '../../assets/images/dotstwo.png';
import us from '../../assets/countries/us.png';
import ke from '../../assets/countries/ke.png';
import tw from 'twrnc';
import { primary_color, secondary_color } from '../../constants/styles';
import { Card } from "react-native-shadow-cards";
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';

const Transfer = () => {
    return (
        <ScrollView>
            <View>
                <Link href="/MobileMoneyTransfer" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw` w-20 h-20 ml-5 `}
                        />
                    </Pressable>
                </Link>
                <View style={tw`mx-10`}>
                    <CustomText style={tw`font-bold text-6 items-center`}>Transfer is ready, Please review</CustomText>
                    <CustomText style={tw`font-medium text-base mt-3`}>Send to mobile wallet with one of these options</CustomText>
                </View>

                <View style={tw`mx-10 justify-between mt-9 flex-row`}>
                    <Image style={tw`h-30 mr-7 w-7 mt-5`} source={dotstwo} />

                    <View >
                        <View style={tw`mx-auto`}>
                            <Card style={tw`py-3 px-5 h-16 w-60`} >
                                <CustomText style={tw`font-semibold text-4`}>You send</CustomText>
                                <View style={tw`flex-row justify-between pb-2`}>
                                    <CustomText style={tw`font-semibold text-5`} >$5300</CustomText>
                                    <View style={tw`flex-row`}>
                                        <Image style={tw`h-4 w-6 mt-0.5`} source={us} />
                                        <CustomText style={tw`text-3 ml-1`}>US</CustomText>
                                    </View>

                                </View>
                            </Card>
                        </View>

                        <View style={tw`mx-auto mt-3`}>
                            <Card style={tw`py-3 px-5 h-16 w-60`} >
                                <CustomText style={tw`font-semibold text-4`}>They get</CustomText>
                                <View style={tw`flex-row justify-between pb-2`}>
                                    <CustomText style={tw`font-semibold text-5`} >$10300 KES</CustomText>
                                    <View style={tw`flex-row`}>
                                        <Image style={tw`h-4 w-6 mt-0.5`} source={ke} />
                                        <CustomText style={tw`text-3 ml-1 my-auto`}>Kenya</CustomText>

                                    </View>
                                </View>
                            </Card>
                        </View>
                    </View>
                </View>

                <View style={tw`mx-auto mt-10`}>
                    <Card >
                        <View style={tw`p-5 gap-3 `}>
                            <CustomText style={tw`font-medium text-4`}>Recipient</CustomText>
                            <View style={tw`flex-row justify-between`}>
                                <View style={tw`flex-row`}>
                                    <View style={[tw`bg-[${secondary_color}] w-10 h-10]`, { borderRadius: 50 }]}>
                                        <CustomText style={tw`text-[${primary_color}] font-bold text-7 text-center`}>A</CustomText>
                                    </View>
                                    <CustomText style={tw`text-[${primary_color}] font-bold text-5 ml-2 my-auto`}>Abdi Ahmed</CustomText>
                                </View>
                                <View style={tw`my-auto`}>
                                    <Image style={tw`h-2.3 w-4`} source={swipedown} />
                                </View>
                            </View>
                            <CustomText style={tw`font-medium text-4`}>Delivery method</CustomText>

                            <View style={tw`ml-8 flex-row  justify-between`}>
                                <CustomText style={tw`text-[${primary_color}] font-bold text-5 ml-5`}>M Pesa</CustomText>
                                <View style={tw`my-auto`}>
                                    <Image style={tw`h-2.3 w-4`} source={swipedown} />
                                </View>
                            </View>
                            <View style={[tw`flex-row justify-between border-dashed border-t pt-2 border-[${primary_color}] `]}>
                                <CustomText style={tw`font-medium text-4`}>Pricing details</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between `}>
                                <CustomText style={tw`font-medium text-4`} >You sent</CustomText>
                                <CustomText>$8</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between `}>
                                <CustomText style={tw`font-medium text-4`}>Exchange rate</CustomText>
                                <CustomText>1$= 345KES</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between `}>
                                <CustomText style={tw`font-medium text-4`}>Abdi gets</CustomText>
                                <CustomText>6558KES</CustomText>
                            </View>
                            <View style={[tw`flex-row justify-between border-dashed border-b pb-2 border-[${primary_color}]`]}>
                                <CustomText style={tw`font-medium text-4`}>Fee</CustomText>
                                <CustomText>56KES</CustomText>
                            </View>
                            <View style={tw`flex-row justify-between`}>
                                <CustomText style={tw`font-medium text-4`} >You pay</CustomText>
                                <CustomText style={tw`font-medium text-4`}>$3466</CustomText>
                            </View>
                        </View>
                    </Card>
                </View>

                <CustomText style={tw`text-[${primary_color}] font-semibold mx-auto mt-10`}>Add Promo Code</CustomText>

                <Link href="/PurposeOfTransfer" asChild>
                    <Pressable
                        style={tw`${CustomStyles.btn} py-3 mb-10 mt-13 mx-10`}
                    >
                        <CustomText style={tw`text-white font-bold text-lg `}>Continue to payment</CustomText>
                    </Pressable>
                </Link>
            </View>
        </ScrollView>
    )
}

// const styles = StyleSheet.create({
//     border: {
//         borderStyle: dotstwo
//     },
// })
export default Transfer;