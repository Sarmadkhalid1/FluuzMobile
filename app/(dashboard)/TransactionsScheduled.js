import React from "react";
import { View, Pressable, Image } from "react-native";
import plus from '../../assets/images/plus.png';
import arrowright from '../../assets/images/arrowright.png';
import arrowdown from '../../assets/images/arrowdown.png';
import arrowred from '../../assets/images/arrowred.png';
import arrowgreen from '../../assets/images/arrowgreen.png';
import vector from '../../assets/images/Vector.png';
import { primary_color } from "../../constants/styles";
import tw from 'twrnc';
import CustomText from '../../components/CustomText';


const TransactionsScheduled = () => {
    return (
        <View style={tw`bg-[${primary_color}] h-full `}>
            <CustomText style={tw`text-center mt-10 text-white `}>TOTAL BALANCE</CustomText>

            <CustomText style={tw`text-center mt-4 text-white font-bold text-3xl mb-8`}>1300,000</CustomText>

            <View style={tw`flex-row  mb-5 justify-evenly`}>

                <View>
                    <Pressable style={tw`mx-auto mb-2`}>
                        <Image style={tw`h-7 w-7`} source={plus} />
                    </Pressable>
                    <CustomText style={tw`text-white`}>Topup</CustomText>
                </View>

                <View>
                    <Pressable style={tw`mx-auto mb-2`}>
                        <Image style={tw`h-7 w-7`} source={arrowright} />
                    </Pressable>
                    <CustomText style={tw`text-white`}>Send</CustomText>
                </View>

                <View>
                    <Pressable style={tw`mx-auto mb-2`}>
                        <Image style={tw`h-7 w-7`} source={arrowdown} />
                    </Pressable>
                    <CustomText style={tw`text-white`}>Withdraw</CustomText>
                </View>

            </View>

            <View style={tw`h-full bg-[#F4F6FE] rounded-t-3xl`}>

                <View style={tw`mx-5 gap-3 py-5`}>
                    <CustomText style={tw`text-xl font-bold`}>Transactions</CustomText>
                    <CustomText style={tw`text-[${primary_color}] font-extrabold`}>Scheduled</CustomText>


                    <View style={tw`bg-white rounded-2xl flex-row justify-between px-5  py-3`}>
                        <View style={tw`flex-row gap-4 items-center`}>

                            <Image style={tw`h-7 w-7`} source={arrowred} />

                            <View style={tw`gap-1`}>
                                <CustomText style={tw`text-black font-bold text-xs`}>Sent to Abdi</CustomText>
                                <CustomText style={tw`text-[${primary_color}] text-xs`}>2nd/06/2023</CustomText>
                                <CustomText style={tw`text-gray-900 text-xs`}>12:00pm</CustomText>
                            </View>
                        </View>

                        <View style={tw`flex-row gap-4 items-center`}>
                            <CustomText style={tw`${CustomStyles.text_primary} `}>+ 370,000</CustomText>
                            <Image source={vector} />
                        </View>

                    </View>

                    <CustomText style={tw`text-[${primary_color}] font-extrabold mt-4`}>Recent</CustomText>

                    <View style={tw`bg-white rounded-2xl flex-row justify-between px-5 py-3`}>
                        <View style={tw`flex-row gap-4 items-center `}>

                            <Image style={tw`h-7 w-7`} source={arrowgreen} />

                            <View style={tw`gap-1`}>
                                <CustomText style={tw`text-[#1F1F1F] font-bold text-xs`}>Received by MM</CustomText>
                                <CustomText style={tw`text-[#0058CA] text-xs`}>2nd/06/2023</CustomText>
                                <CustomText style={tw`text-[#1E1E1E] text-xs`}>12:00pm</CustomText>
                            </View>
                        </View>

                        <View style={tw`flex-row gap-4 items-center `}>
                            <CustomText style={tw`text-[#0058CA] font-bold `}>+ 370,000</CustomText>
                            <Image source={vector} />
                        </View>

                    </View>

                    <View style={tw`bg-white rounded-2xl flex-row justify-between px-5 py-3`}>
                        <View style={tw`flex-row gap-4 items-center`}>

                            <Image style={tw`h-7 w-7`} source={arrowgreen} />

                            <View style={tw`gap-1`}>
                                <CustomText style={tw`text-[#1F1F1F] font-bold text-xs`}>Received by Martha kawesa</CustomText>
                                <CustomText style={tw`text-[#0058CA] text-xs`}>2nd/06/2023</CustomText>
                                <CustomText style={tw`text-[#1E1E1E] text-xs`}>12:00pm</CustomText>
                            </View>
                        </View>

                        <View style={tw`flex-row gap-4 items-center`}>
                            <CustomText style={tw`text-[#0058CA] font-bold `}>- 120,000</CustomText>
                            <Image source={vector} />
                        </View>

                    </View>

                    <View style={tw`bg-white rounded-2xl flex-row justify-between px-5 py-3`}>
                        <View style={tw`flex-row gap-4 items-center`}>

                            <Image style={tw`h-7 w-7`} source={arrowred} />

                            <View style={tw`gap-1`}>
                                <CustomText style={tw`text-[#1F1F1F] font-bold text-xs`}>Sent to MM</CustomText>
                                <CustomText style={tw`text-[#0058CA] text-xs`}>2nd/06/2023</CustomText>
                                <CustomText style={tw`text-[#1E1E1E] text-xs`}>12:00pm</CustomText>
                            </View>
                        </View>

                        <View style={tw`flex-row gap-4 items-center`}>
                            <CustomText style={tw`text-[#0058CA] font-bold`}>+ 180,000</CustomText>
                            <Image source={vector} />
                        </View>

                    </View>


                    <CustomText style={tw`text-[#0058CA] text-center`}>See all activity</CustomText>

                </View>
            </View>

        </View>

    )
};
export default TransactionsScheduled;

