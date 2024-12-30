import React from 'react';
import { Dimensions, Image, View } from "react-native";
import tw from 'twrnc';
import Logo from '../assets/images/Logo.png';

export default function SplashScreen() {
    const { height } = Dimensions.get('window');
    return (
        <View style={{ height }}>
            <View style={tw`my-auto`}>
                <Image source={Logo} style={tw`mx-auto mt-[-100px] w-80`} resizeMode="contain" />
            </View>
        </View>
    )
}