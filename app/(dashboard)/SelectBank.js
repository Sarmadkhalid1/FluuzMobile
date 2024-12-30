import React, { useState } from "react";
import { View, Pressable, Image, TextInput } from "react-native";
import previous from '../../assets/images/previous.png';
import setting from '../../assets/images/setting.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';


const SelectBank = () => {
    const banks = ['Bank of new york', 'City Bank', 'Bank of UK', 'Bank of new york']
    const [writing, setWriting] = useState(false);
    const [bankscopy, setbanks] = useState(banks);

    function search(text) {
        if (text == "") {
            setbanks(banks);
        } else {
            setbanks(banks.filter(f => {
                f.toLowerCase().includes(text)
            }))
        }
    }

    return (
        <View>
            <View style={tw`flex-row items-center justify-between`}>
                <Link href="/RecipientBankDetails" asChild>
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

            <CustomText style={tw`font-bold text-7 mx-10`}>Select bank</CustomText>

            <View style={tw`mx-10 `}>
                <View style={tw`divide-y divide-blue-200`}>
                    <View style={tw`border border-[${primary_color}] rounded-lg`}>
                        <TextInput onChangeText={newText => search(newText)} style={tw`border-[${primary_color}] text-[#0058CA66] text-sm rounded-md border-b w-full p-2.5 ${writing ? 'border-blue-500' : ''}`} onFocus={() => setWriting(true)} onBlur={() => setWriting(false)} placeholderTextColor="black" placeholder="search"
                        />
                        {bankscopy.map((b, index) => (
                            <CustomText style={tw`${index == 0 ? '' : 'border-t'} border-blue-500 p-3`} key={index}>{b}</CustomText>
                        ))}
                    </View>
                </View>
            </View>
        </View>

    )
}
export default SelectBank;