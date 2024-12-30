import { Animated, FlatList, View, Pressable, Dimensions, Image } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from "expo-router";
import CustomStyles from '../../constants/styles';
import onboarding1 from '../../assets/images/onboarding1.png';
import onboarding2 from '../../assets/images/onboarding2.png';
import onboarding3 from '../../assets/images/onboarding3.png';
import onboarding4 from '../../assets/images/onboarding4.png';
import ke from '../../assets/countries/ke.png';
import gr from '../../assets/countries/gr.png';
import fr from '../../assets/countries/fr.png';
import se from '../../assets/countries/se.png';
import tw from 'twrnc';
import SlideItem from '../../components/SlideItem';
import Pagination from '../../components/Pagination';
import CustomText from '../../components/CustomText';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getLanguage } from '../../store';

const { width, height } = Dimensions.get('window');

const Onboarding = () => {

    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const currentLanguage = useSelector(getLanguage);

    const handleOnScroll = event => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
    };

    const Slides = [
        {
            url: onboarding1,
            text: t("Screens.Onboarding.text")
        },
        {
            url: onboarding2,
            text: t("Screens.Onboarding.text")
        },
        {
            url: onboarding3,
            text: t("Screens.Onboarding.text")
        },
        {
            url: onboarding4,
            text: t("Screens.Onboarding.text")
        }]

    const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
        setIndex(viewableItems[0].index);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const getLanguageByShort = () => {
        if (currentLanguage === 'en') {
            return 'English';
        }
        else if (currentLanguage === 'sv') {
            return 'Svenka';
        }
        else if (currentLanguage === 'fr') {
            return 'French';
        }
        else if (currentLanguage === 'el') {
            return 'Greek';
        }
        return 'English';
    }
    const getFlags = () => {
        if (currentLanguage === 'en') {
            return ke;
        } else if (currentLanguage === 'sv') {
            return se;
        } else if (currentLanguage === 'fr') {
            return fr;
        } else if (currentLanguage === 'el') {
            return gr;
        }
        return ke;
    };

    return (
        <View style={{ alignContent: 'center', alignItems: 'center', width, height, position: 'absolute' }}>

            <FlatList
                data={Slides}
                renderItem={({ item }) => <SlideItem item={item} />}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
            <Link href="/Language" style={tw`absolute top-15 left-5 `}>
                <View style={tw`bg-white flex-row p-2`}>
                    <CustomText>{getLanguageByShort()}</CustomText>
                    <Image style={tw`h-3 w-5 mt-1 ml-2`} source={getFlags()} />
                </View>
            </Link>

            <View style={tw`absolute bottom-10`}>
                <Pagination data={Slides} scrollX={scrollX} index={index} />

                <Link asChild href="/createaccount" style={tw`text-white font-bold`}>
                    <Pressable
                        style={tw`${CustomStyles.btn} mt-5 py-3`}
                    >
                        <CustomText style={tw`text-white font-semibold`}>
                            {t("Screens.Onboarding.btnCreate")}
                        </CustomText>
                    </Pressable>
                </Link>

                <Link asChild href="/SendToExtra">
                    <Pressable
                        style={tw`${CustomStyles.btn_secondary} mt-3 py-3`}
                    >
                        <CustomText style={tw`${CustomStyles.text_primary}`}>{t("Screens.Onboarding.btnTry")}</CustomText>
                    </Pressable>
                </Link>
                <Link href="/Login" style={tw`text-center text-base text-white font-bold mt-8 w-30 mx-auto`}>{t("Screens.Onboarding.btnAlready")}</Link>
            </View>

        </View>
    );
};
export default Onboarding;