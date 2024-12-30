import React, { useEffect, useState } from "react";
import { View, Pressable, Image, Dimensions, ActivityIndicator } from "react-native";
import previoustest from '../../assets/images/previous.png';
import setting from '../../assets/images/setting.png';
import { primary_color } from '../../constants/styles';
import tw from 'twrnc';
import { Card } from "react-native-shadow-cards";
import { Link, useLocalSearchParams, usePathname, useRouter } from "expo-router";
import CustomText from "../../components/CustomText";
import { getGroupedCountriesList } from "../../services/Countries-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { useSelector } from "react-redux";
import { getHowMuchSendingData, setHowMuchSendingData, store } from "../../store";
import { useTranslation } from 'react-i18next';


const { width, height } = Dimensions.get('screen');

const ViewTypes = {
    HEADER: 'HEADER',
    ITEM: 'ITEM'
};
const generateDataProvider = (groupedCountries) => {
    let countryList = [];
    Object.keys(groupedCountries).forEach(letter => {
        countryList.push({ type: ViewTypes.HEADER, label: letter });
        groupedCountries[letter].forEach(country => {
            countryList.push({ type: ViewTypes.ITEM, data: country });
        });
    });
    return new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(countryList);
};

const rowRenderer = (selectCountry) => (type, data) => {
    switch (type) {
        case ViewTypes.HEADER:
            return (
                <View style={tw`p-2`}>
                    <CustomText style={tw`font-bold text-5 text-[${primary_color}]`}>{data.label}</CustomText>
                </View>
            );
        case ViewTypes.ITEM:
            return (
                <Pressable onPress={() => selectCountry(data.data.countryCode)} key={data.data.currencyCode}>
                    <Card style={tw`flex-row p-2 shadow-blue-500 m-2`}>
                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={data.data.flag} />
                        <CustomText style={tw`font-semibold capitalize`}>{data.data.label}</CustomText>
                    </Card>
                </Pressable>
            );
        default:
            return null;
    }
};

const SendTo = () => {
    const params = useLocalSearchParams();
    const router = useRouter();

    const [comingFrom, setComingFrom] = useState('');
    const [dataProvider, setDataProvider] = useState(null);
    const [loading, setLoading] = useState(true);

    const oldStateData = useSelector(getHowMuchSendingData);
    const { t } = useTranslation();


    useEffect(() => {
        if (params.comingFrom) {
            setComingFrom(params.comingFrom);
        }
    }, [usePathname()]);

    useEffect(() => {
        const groupedData = getGroupedCountriesList();
        setDataProvider(generateDataProvider(groupedData));
        setLoading(false);
    }, [usePathname()]);

    function selectCurrency(countryCode) {
        store.dispatch(setHowMuchSendingData({ ...oldStateData, receiverCountry: countryCode, rate: null, receiverAmount: null }));
        router.push(comingFrom);
    }

    if (loading) {
        return (
            <View style={[{ height, width }, tw` `]}>
                <ActivityIndicator style={tw`my-auto`} size={"large"} />
            </View>
        );
    }

    return (
        <View style={[{ height, width }, tw`flex-1`]}>
            <View style={tw`mx-auto w-full flex-1`}>
                <View style={tw`flex-row items-center justify-between mx-5`}>
                    <Link href={`/${comingFrom}`} asChild>
                        <Pressable>
                            <Image source={previoustest} style={tw`w-15 h-15 `} />
                        </Pressable>
                    </Link>

                    {/* <Link href="/Account" asChild>
                        <Pressable>
                            <Image source={setting} style={tw`w-7 h-7 `} />
                        </Pressable>
                    </Link> */}
                </View>

                <View style={tw`mb-4 mx-5`}>
                    <CustomText style={tw`font-bold text-7`}>{t("Screens.SendTo.text")}</CustomText>
                </View>

                {dataProvider && (
                    <RecyclerListView
                        style={tw`flex-1 mx-5`}
                        layoutProvider={new LayoutProvider(
                            index => dataProvider.getDataForIndex(index).type,
                            (type, dim) => {
                                switch (type) {
                                    case ViewTypes.HEADER:
                                        dim.width = width;
                                        dim.height = 40;
                                        break;
                                    case ViewTypes.ITEM:
                                        dim.width = width;
                                        dim.height = 57;
                                        break;
                                    default:
                                        dim.width = 0;
                                        dim.height = 0;
                                }
                            }
                        )}
                        dataProvider={dataProvider}
                        rowRenderer={rowRenderer(selectCurrency)}
                        extendedState={{ selectCurrency }}
                    />
                )}
            </View>
        </View>
    );
};

export default SendTo;

