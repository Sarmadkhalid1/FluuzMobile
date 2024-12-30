import { View, Image, Dimensions, Pressable, TouchableOpacity } from "react-native";
import { Link, useRouter, } from "expo-router";
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import previous from '../../assets/images/previous.png';
import { CheckBox } from '@rneui/themed';
import CustomText from "../../components/CustomText";
import { getLanguage } from '../../store'
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

export default function Language() {
    const router = useRouter();
    const { i18n } = useTranslation();

    const { width, height } = Dimensions.get('window');
    // const [checked, setChecked] = React.useState(true);
    // const toggleCheckbox = () => setChecked(!checked);
    const [selectedLanguage, setLanguage] = useState('en');

    const currentLanguage = useSelector(getLanguage);

    useEffect(() => {
        setLanguage(currentLanguage);
    }, [currentLanguage]);

    function setLanguageAndNavigate(lng) {
        setLanguage(lng);
        i18n.changeLanguage(lng);
        router.replace('/');
    }

    return (
        <View style={{ height }}>
            <View>
                <View style={tw`flex-row items-center justify-between mt-5`} >
                    <Link href="../" asChild>
                        <Pressable >
                            <Image
                                source={previous} style={tw` w-20 h-20 ml-5 `} />
                        </Pressable>
                    </Link>
                </View>
            </View>
            <CustomText style={[tw`font-extrabold mt-2 mx-10 text-3xl`]}>Language</CustomText>
            <View style={tw`flex-row mt-4`}>
                <TouchableOpacity onPress={() => setLanguageAndNavigate('en')} >
                    <View>
                        <CustomText style={tw`font-semibold mx-10 mt-10 text-lg`}>English</CustomText>
                        <View style={tw`w-85 mt-3 mx-6 mr-3 h-0.4 bg-blue-400`} />
                        <View style={tw`ml-auto mt-[-55]`}>
                            <CheckBox
                                checked={selectedLanguage === 'en'}
                                onPress={() => setLanguageAndNavigate('en')}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="blue"
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={tw`flex-row `}>
                <TouchableOpacity onPress={() => setLanguageAndNavigate('sv')} >
                    <View>
                        <CustomText style={tw`font-semibold mx-10 mt-5 text-lg`}>Svenka</CustomText>
                        <View style={tw`w-85 mt-3 mx-6 mr-3 h-0.4 bg-blue-400`} />
                        <View style={tw`ml-auto mt-[-55]`}>
                            <CheckBox
                                checked={selectedLanguage === 'sv'}
                                onPress={() => setLanguageAndNavigate('sv')}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="blue"
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={tw`flex-row `}>
                <TouchableOpacity onPress={() => setLanguageAndNavigate('fr')} >
                    <View>
                        <CustomText style={tw`font-semibold mx-10 mt-5 text-lg`}>French</CustomText>
                        <View style={tw`w-85 mt-3 mx-6 mr-3 h-0.4 bg-blue-400`} />
                        <View style={tw`ml-auto mt-[-55]`}>
                            <CheckBox
                                checked={selectedLanguage === 'fr'}
                                onPress={() => setLanguageAndNavigate('fr')}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="blue"
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={tw`flex-row `}>
                <TouchableOpacity onPress={() => setLanguageAndNavigate('el')} >
                    <View>
                        <CustomText style={tw`font-semibold mx-10 mt-5 text-lg`}>Greek</CustomText>
                        <View style={tw`w-85 mt-3 mx-6 mr-3 h-0.4 bg-blue-400`} />
                        <View style={tw`ml-auto mt-[-55]`}>
                            <CheckBox
                                checked={selectedLanguage === 'el'}
                                onPress={() => setLanguageAndNavigate('el')}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="blue"
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}