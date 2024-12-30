import React, { useState } from "react";
import { View, Pressable, Image, ScrollView } from "react-native";
import previous from '../../assets/images/previous.png';
import recipientsactive from '../../assets/images/recipientsactive.png';
import arrowblack from '../../assets/images/arrowblack.png';
import tw from 'twrnc';
import { primary_color, secondary_color } from '../../constants/styles';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';


const SendingTo = () => {
    const names = ['Abdi Ahmed', 'Domino Omtel', 'Domino Omtel'];
    const [disbaled, setDisabled] = useState(true);

    return (
        <ScrollView>
            <View>
                <Link href="" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw` w-20 h-20 ml-5 `}
                        />
                    </Pressable>
                </Link>
                <View style={tw`mx-10 mb-5`}>
                    <CustomText style={tw` font-bold text-7`}>Who are you sending to?</CustomText>
                    <CustomText style={tw`text-5`}>Your recipient in Kenya</CustomText>
                </View>
                {names.map((name, index) => (
                    <View
                        key={index}
                        style={[
                            tw`flex-row justify-between mt-4 pb-2 mx-10`,
                            {
                                borderBottomWidth: index !== names.length - 1 ? 1 : 0,
                                borderBottomColor: index !== names.length - 1 ? '#0058CA' : 'transparent',
                            },
                        ]}
                    >
                        <View style={tw`flex-row gap-4 items-center`}>

                            <View style={[tw`bg-[${secondary_color}] w-10 h-10]`, { borderRadius: 50 }]}>
                                <CustomText style={tw`text-[${primary_color}] font-bold text-7 my-auto text-center`}>{name.charAt(0)}</CustomText>
                            </View>
                            <CustomText style={tw`font-bold text-4`}>{name}</CustomText>
                        </View>
                        <View style={tw`flex-row items-center`}>
                            <Image style={tw`h-3 w-3`} source={arrowblack} />
                        </View>
                    </View>
                ))}

                <View style={tw` flex-row justify-between mt-15  mx-10`}>
                    <View style={tw`flex-row gap-4 items-center`}>
                        <Image style={tw`h-9 w-9`} source={recipientsactive} />
                        <CustomText style={tw`text-[${primary_color}] font-semibold text-4`}>Add new recipient</CustomText>
                    </View>
                    <Link href="/RelatedRecipients" style={tw`my-auto`}>
                        <View style={tw`flex-row gap-4 items-center`}>
                            <Image style={tw`h-3 w-3`} source={arrowblack} />
                        </View>
                    </Link>
                </View>

                <View style={tw`mt-10 mx-auto`}>
                    <CustomText style={tw`font-bold text-6`}>$44254 in total</CustomText>
                    <CustomText style={tw`text-[${primary_color}] text-5`}>See pricing details</CustomText>
                </View>
                <Pressable

                    style={tw`${CustomStyles.btn} mt-13 py-3 mx-10 ${disbaled ? 'bg-[#0058CA99]' : ''}`}
                    disabled={disbaled}
                >
                    <CustomText style={tw`text-white font-bold text-lg `}>Next</CustomText>

                </Pressable>
            </View>
        </ScrollView>
    )
}
export default SendingTo;