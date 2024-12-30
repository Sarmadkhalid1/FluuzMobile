import { View, Image, TouchableOpacity, Dimensions, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { Link, router, } from "expo-router";
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles'
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from "../../components/CustomText";
import previous from '../../assets/images/previous.png'
import location from '../../assets/images/location.png';
import arrowblack from '../../assets/images/arrowblack.png';
import { getSymbolByCurrencyCode } from '../../services/Countries-js'
import { formatCurrency } from "../../services/Helper";

const { width, height } = Dimensions.get('screen');

const PayoutMethod = () => {
    const [payouts, setPayouts] = useState([]);
    const [payout, setPayout] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        const list = JSON.parse(await AsyncStorage.getItem('payout_methods_list'));
        const type = JSON.parse(await AsyncStorage.getItem('HowMuchSending'));
        if (list && type) {
            setPayouts(list);
            setPayout(type.payoutMethod);
        } else {
            router.push('/HowMuchSending');
        }

        setLoading(false);
    }

    const getTitle = (label) => {
        switch (label) {
            case 'cash':
                return "Cash Pickup";
            case 'card':
                return "Card Transfer";
            case 'ewallet':
                return "Mobile Transfer Money";
            case 'bank':
                return "Bank Transfer";
        }
    }

    const saveStateAndNavigate = async (item) => {
        AsyncStorage.setItem('payout_method', JSON.stringify(item), () => {
            router.push('/SendingTo');
        });
    }

    if (loading) {
        return (
            <View style={[{ height, width }, tw` `]}>
                <ActivityIndicator style={tw`my-auto`} size={"large"}></ActivityIndicator>
            </View>
        );
    }

    return (
        <View style={{ height }}>
            <ScrollView style={tw`mx-2`}>
                <Link href="/HowMuchSending" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw`w-20 h-20 my-5`}
                        />
                    </Pressable>
                </Link>

                <View style={tw`mx-5 mb-25`}>
                    <CustomText style={tw`text-4xl font-bold mb-10`}>{getTitle(payout)}</CustomText>
                    {payouts.map((e, index) => (
                        <View key={index}>
                            <TouchableOpacity key={index} onPress={() => saveStateAndNavigate(e)} style={tw`py-5 px-4 ${payouts.length - 1 != index ? 'border-b border-blue-500' : ''}`}>
                                <View style={tw`flex-row items-center justify-between`}>
                                    <View style={tw`flex-row items-center gap-2`}>
                                        {/* <Image style={tw`h-8 w-8 rounded-full`} source={{
                                                uri: e.image,
                                            }} /> */}
                                        <CustomText>{e.name}</CustomText>
                                    </View>
                                    <Image style={tw`h-3 w-3`} source={arrowblack} />
                                </View>
                                <View style={tw`flex-row items-center gap-1 flex-wrap`}>
                                    <CustomText>Currency options:</CustomText>
                                    {e.payout_currencies.map(m => (
                                        <CustomText key={m} style={tw`border py-0 px-2 border-blue-300`}>{formatCurrency(m, getSymbolByCurrencyCode(m))}</CustomText>
                                    ))}
                                </View>
                                {payout == "cash" &&
                                    <View style={tw`flex-row mt-2 ml-12 items-end`}>
                                        <Image style={tw`h-5 w-4`} source={location} />
                                        <CustomText style={tw`text-xs ml-1 text-[${primary_color}]`}>Pickup Points</CustomText>
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView >
        </View >
    )
}

export default PayoutMethod;

const styles = StyleSheet.create({
    dropdown: {
        width: 90,
        height: 40,
        marginStart: 150,
        backgroundColor: 'white',
        padding: 6,
    },
})