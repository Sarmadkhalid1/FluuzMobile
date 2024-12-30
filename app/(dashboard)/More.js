import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import CustomText from '../../components/CustomText';
import CustomStyles from '../../constants/styles';
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useTranslation } from 'react-i18next';


function More() {
    const { t } = useTranslation();


    async function handleLogout() {
        await SecureStore.deleteItemAsync('jwt_token');
        router.push('/Login');
    }

    return (
        <View style={tw`mt-10 mx-10`}>
            <TouchableOpacity onPress={() => handleLogout()} style={[tw`${CustomStyles.btn} p-3 mt-20`]}>
                <CustomText style={tw`text-white font-bold text-lg`}>
                    {t("Screens.More.text")}
                </CustomText>
            </TouchableOpacity>
        </View>
    )
}
export default More;