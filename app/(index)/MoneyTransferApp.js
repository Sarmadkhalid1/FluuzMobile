import { View, Image, Dimensions, ScrollView } from "react-native";
import { Link } from "expo-router";
import React, { useState } from 'react';
import tw from 'twrnc';
import { StyleSheet } from 'react-native';
import previous from '../../assets/images/previous.png';
import SearchBar from "react-native-dynamic-search-bar";
import { Dropdown } from 'react-native-element-dropdown';
import CustomText from "../../components/CustomText";

export default function MoneyTransferApp() {
    const { width, height } = Dimensions.get('window');

    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };

    const data = [
        { label: 'English', value: '1' },
        { label: 'Svenka', value: '2' },
        { label: 'French', value: '3' },
        { label: 'Greek', value: '4' }

    ];

    return (
        <View style={{ width, height }}>
            <ScrollView>
                <View style={tw`mx-9`}>
                    <View style={tw`flex-row items-center justify-between mt-5`} >
                        <Image source={previous} style={tw`w-15 h-15`} />
                        <Image source={require('../../assets/images/MenuLine.png')} style={tw`w-7 h-5 `} />
                    </View>
                </View>
                <View style={[tw`mx-12`]} >
                    <View style={[tw`flex-row items-center justify-between mx-5 `]} >
                        <CustomText style={[tw`font-extrabold mt-2 mx-[-20] text-3xl`]}>Fluuz</CustomText>
                        <Dropdown
                            style={[tw`mx-[-40] `, styles.dropdown]}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="English"
                            onChange={item => {
                            }}

                        />
                    </View>

                    <View style={[tw`items-start `]} >
                        <View style={[tw`w-85`]} >

                            <SearchBar style={[tw`border border-blue-700  mr-10 mt-4 `]}
                                placeholder="Search"
                            />
                        </View>

                        <View style={[tw`flex-row ml-[-10]`]} >
                            <Image source={require('../../assets/images/transfers.png')}
                                style={tw`w-40 h-40  mt-3 `} />
                            <Image source={require('../../assets/images/transfer1.png')}
                                style={tw`w-40 h-40 mt-3 `} />
                        </View>
                        <View style={[tw`flex-row ml-[-10]`]} >
                            <Image source={require('../../assets/images/mytransfer.png')}
                                style={tw`w-40 h-40 mt-[-15] `} />
                            <Image source={require('../../assets/images/countriess.png')}
                                style={tw`w-40 h-40 mt-[-15] `} />
                        </View>
                        <View style={[tw`flex-row ml-[-10]`]} >
                            <Image source={require('../../assets/images/homee.png')}
                                style={tw`w-40 h-40 mt-[-15] `} />
                            <Image source={require('../../assets/images/case.png')}
                                style={tw`w-40 h-40 mt-[-15] `} />
                        </View>
                    </View>

                    <View style={[tw`mx-3`]}>
                        <CustomText style={[tw`font-bold  mb-3 mt-3 text-xl`]}>Most Popular Questions</CustomText>

                        <View style={tw`items-start  border-b  pb-3 mt-2`}>
                            <Link href="/MoneyTransfer1" style={tw`font-medium text-base mt-1`}>What is Fluuz app?</Link>
                        </View>
                        <View style={tw`items-start border-b  pb-3 mt-2`}>
                            <Link href="/MoneyTransfer3" style={tw`font-medium text-base mt-1`}>How to send money with us?</Link>
                        </View>
                        <View style={tw`items-start border-b  pb-3 mt-2`}>
                            <Link href="/MoneyTransfer1" style={tw`font-medium text-base mt-1`}>How do I create a Fluuz account?</Link>
                        </View>
                        <View style={tw`items-start border-b  pb-3 mt-2`}>
                            <Link href="/UploadMyId" style={tw`font-medium text-base mt-1`}>How do I upload my ID?</Link>
                        </View>
                        <View style={tw`items-start border-b  pb-3 mt-2`}>
                            <Link href="/MoneyTransfer4" style={tw`font-medium text-base mt-1`}>How can I change my password?</Link>
                        </View>
                        <View style={tw`items-start border-b  pb-3 mt-2`}>
                            <Link href="/CountriesSendMoneyto" style={tw`font-medium text-base mt-1`}>Which country can I send to?</Link>
                        </View>
                        <View style={tw`items-start border-b  pb-3 mt-2`}>
                            <Link href="/PromoCodeNotWorking" style={tw`font-medium text-base mt-1`}>What should I do if I enter a promo code but it’s not working?</Link>
                        </View>
                        <View style={tw`items-start border-b  pb-3 mt-2`}>
                            <Link href="/UsePromoCode" style={tw`font-medium text-base mt-1`}>How do I use my promo code?</Link>
                        </View>
                        <View>
                            <CustomText style={tw`font-medium text-sm mb-20 mt-5 text-blue-700`}> Got an invite code?</CustomText>
                        </View>
                    </View>


                </View>
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    dropdown: {
        width: 90,
        height: 40,
        marginStart: 150,
        backgroundColor: 'white',
        padding: 6,
    },
})