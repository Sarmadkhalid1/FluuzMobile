import { TextInput } from "react-native";
import tw from 'twrnc';
import CustomStyles from '../constants/styles'
import { useState } from "react";
import { useFonts } from 'expo-font';

export default function Input({ placeholder, bg_color, CustomTextChange, multiline, numberOfLines, keyboardType }) {
    const [writing, setWriting] = useState(false);

    const [fontsLoaded] = useFonts({
        'Poppins Regular': require('../assets/fonts/poppins/Poppins Regular.ttf'),
    });

    let fontStyle = fontsLoaded ? { fontFamily: 'Poppins Regular' } : "";

    return (
        <TextInput keyboardType={keyboardType} multiline={multiline} numberOfLines={numberOfLines} onChangeText={CustomTextChange} style={[tw`${CustomStyles.input_field} ${writing ? 'border-blue-500' : ''} ${bg_color ? bg_color : ''} text-black`, fontStyle]} onFocus={() => setWriting(true)} onBlur={() => setWriting(false)} placeholderTextColor="#0058CA66" placeholder={placeholder} />
    )
}