import {
    StyleSheet,
    View,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import CustomText from './CustomText';
import { useTranslation } from 'react-i18next';


const { width, height } = Dimensions.get('window');
const SlideItem = ({ item }) => {

    const translateYImage = new Animated.Value(40);
    const { t } = useTranslation();


    Animated.timing(translateYImage, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
    }).start();

    return (
        <View style={styles.container}>
            <Animated.Image
                source={item.url}
                resizeMode="contain"
                style={
                    styles.image
                }
            />
            <View style={tw`w-90 absolute top-60`}>
                <CustomText style={tw`text-center text-white font-bold text-5xl`}>{item.text}</CustomText>
                <View style={tw`mt-10`}>
                    <CustomText style={tw`text-center text-white`}>{t("Screens.slideItem.text")}</CustomText>
                    <CustomText style={tw`text-center text-white`}>{t("Screens.slideItem.textMoney")}</CustomText>
                </View>
            </View>
        </View>
    );
};

export default SlideItem;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        width,
        height,
        resizeMode: 'cover'
    },
    content: {
        flex: 0.4,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 18,
        marginVertical: 12,
        color: '#333',
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});