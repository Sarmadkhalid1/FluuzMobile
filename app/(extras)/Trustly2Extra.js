import React, { useState } from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import previous from '../../assets/images/previous.png';
import swipedown from '../../assets/images/swipedown.png';
import tw from 'twrnc';
import { primary_color } from "../../constants/styles";
import { Card } from 'react-native-shadow-cards';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';

const Trustly2 = () => {

    const [selectedIndex, setIndex] = useState(0);
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '1' }

    ];
    return (
        <View>
            <View style={tw`mx-10`}>

                <Link href="/HowDoYouWantToPay" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw` w-20 h-20 ml-[-15] `}
                        />
                    </Pressable>
                </Link>

                <CustomText style={tw`font-bold text-6 mx-auto`}>Lorem Ipsum</CustomText>
                <CustomText style={tw`font-medium text-base mt-3 `}>We partner with secure payment providers to make it easy.
                    <Link style={tw`font-medium text-base mt-3 text-[${primary_color}]`} href="../">
                        Learn more
                    </Link>
                </CustomText>
            </View>

            <View style={tw`gap-2 pt-4 mx-auto`}>
                <Card style={tw`pl-4 py-3`}>
                    <View style={tw`flex-row justify-between`}>
                        <View>
                            <CustomText>Lorem Ipsum</CustomText>
                            <CustomText style={tw`font-semibold text-lg `}>Mobile BankID</CustomText>
                        </View>
                        <Image style={tw`h-3 w-5 my-auto mr-4`} source={swipedown} />

                    </View>
                </Card>
            </View>

            <View style={tw`gap-2 pt-4 mx-auto`}>
                <Card style={tw`pl-4 py-3`}>
                    <View style={tw`flex-row justify-between`}>
                        <View>
                            <CustomText>Mobile number</CustomText>
                            <CustomText style={tw`font-semibold text-lg `}>5467648789</CustomText>
                        </View>
                    </View>
                </Card>
            </View>

            {/* 
            <Dropdown
                style={[tw`ml-1 `, styles.dropdown]}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Lorem Ipsum"
                onChange={item => {
                }}

            /> */}
            <Link href="/Trustly" asChild>
                <Pressable
                    style={tw`${CustomStyles.btn} mt-63 py-3 mx-10`}
                >
                    <View style={tw`flex-row items-center gap-3`}>
                        <CustomText style={tw`text-white font-semibold text-lg `}>Next</CustomText>
                    </View>
                </Pressable>
            </Link>
        </View>

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

    elevation: 2,

    dropdown: {
        margin: 16,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
})
export default Trustly2;