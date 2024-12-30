import { Text } from "react-native";
import { useFonts } from 'expo-font';

export default function CustomText({ children, style, ...props }) {
    const [fontsLoaded] = useFonts({
        'Poppins Regular': require('../assets/fonts/poppins/Poppins Regular.ttf'),
    });

    let fontStyle = fontsLoaded ? { fontFamily: 'Poppins Regular' } : "";

    return (
        <Text style={[style, fontStyle]} {...props}>{children}</Text>
    )
}