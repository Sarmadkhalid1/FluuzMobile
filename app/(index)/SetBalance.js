import React from 'react';
import { View, Pressable, Dimensions, Image } from "react-native";
import cross from '../../assets/images/cross.png';
import card from '../../assets/images/card.png';
import swipedownwhite from '../../assets/images/swipedownwhite.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import { Card } from 'react-native-shadow-cards';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';

const { width, height } = Dimensions.get('window');

const SetBalance = () => {
    return (
        <View style={[tw`bg-[#0058CA] `, { alignContent: 'center', alignItems: 'center', height, width, position: 'absolute' }]} resizeMode="cover" >
            <Link style={[tw`pt-15 pl-5 `, { alignSelf: 'flex-start' }]} href="/TransactionHistory" asChild>
                <Pressable >
                    <Image
                        source={cross}
                        style={[
                            tw` w-20 h-20 `,
                        ]}
                    />
                </Pressable>
            </Link>
            <View style={tw`px-10`}>
                <CustomText style={tw`text-white font-bold text-9`}>Do more with Us</CustomText>
                <CustomText style={tw`font-medium text-sm text-white`}>Now you can send money to your account and get a debit card for your every day use.</CustomText>
            </View>

            <Card style={tw`gap-2 w-80 p-8 mt-4`}>
                <CustomText>Account Balance</CustomText>
                <CustomText style={tw`text-[${primary_color}] font-bold text-9`}>1300,000 £</CustomText>
                <View style={tw`flex-row`}>
                    <Image style={tw`h-5 w-7`} source={card} />
                    <CustomText style={tw`ml-3`}>Card</CustomText>
                </View>
            </Card>

            <View style={tw`absolute w-100 bottom-30 items-center`}>
                <CustomText style={tw`text-white`}>Swipe for more</CustomText>
                <Image style={tw`h-3 w-3 mt-3`} source={swipedownwhite} />
                <Pressable
                    style={tw`${CustomStyles.btn_secondary} px-25 mt-10 `}
                >
                    <CustomText style={tw`text-white font-semibold py-3  text-lg text-[${primary_color}]`}>Set up balance</CustomText>
                </Pressable>
            </View>

        </View>
    )
}
export default SetBalance;