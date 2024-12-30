import React, { useState } from "react";
import { View, Pressable, Image } from "react-native";
import previous from '../../assets/images/previous.png';
import card from '../../assets/images/card.png';
import tw from 'twrnc';
import { CheckBox } from '@rneui/themed';
import { Link, useRouter } from "expo-router";
import CustomText from '../../components/CustomText';



const HowDoYouWantToPay = () => {
    const router = useRouter();

    const [selectedIndex, setIndex] = useState(0);

    const goToPaymentPage = () => {
        if(selectedIndex === 0){
            router.push('CardList');
        }
    }

    return (
        <View style={tw`mx-10`}>
            <Link href="/SendingTo" asChild>
                <Pressable >
                    <Image
                        source={previous} style={tw` w-20 h-20 ml-[-15] `}
                    />
                </Pressable>
            </Link>

            <CustomText style={tw`font-bold text-6 mt-5 items-center`}>How do you want to pay?</CustomText>
            <CustomText style={tw`font-medium text-base mt-3 `}>We partner with secure payment{"\n"}providers to make it easy. Learn more</CustomText>


            <View style={tw`flex-row mt-10`}>
                <View style={tw`flex-row`}>
                    <Image style={tw`h-5 w-7 mr-3 mt-1`} source={card} />
                    <View>
                        <CustomText style={tw`font-semibold text-lg`}>Debit / Credit Card</CustomText>
                        <CustomText style={tw`font-medium text-xs mt-1`}>We accept visa, maestro and master card</CustomText>
                    </View>
                </View>
                <View>
                    <CheckBox
                        checked={selectedIndex === 0}
                        onPress={() => setIndex(0)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                </View>

            </View>

            <Pressable
                onPress={() => goToPaymentPage()}
                style={tw`${CustomStyles.btn} mt-73 py-3`}
            >
                <View style={tw`flex-row items-center gap-3`}>
                    <CustomText style={tw`text-white font-bold text-lg `}>Next</CustomText>
                </View>
            </Pressable>
        </View>
    )
}
export default HowDoYouWantToPay;