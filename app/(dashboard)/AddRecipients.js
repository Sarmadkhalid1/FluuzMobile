import React, { useEffect, useState } from 'react';
import { View, Pressable, Image, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, ActivityIndicator } from "react-native";
import previous from '../../assets/images/previous.png';
import tw from 'twrnc';
import { Link, router } from "expo-router";
import CustomText from '../../components/CustomText';
import { StripeOnboarding } from '../../components/StripeOnboarding';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { getCameFrom } from '../../store';
import { useSelector } from 'react-redux';

const AddRecipients = () => {
    const route = useRoute();
    const { type } = route.params;
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const cameFrom = useSelector(getCameFrom);


    const routeBack = () => {
        if(cameFrom){
            router.push(cameFrom);
        } else {
            router.push('/SendingTo');
        }
    }


    return (
        <ScrollView>
            <KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={tw`my-5`}>
                        {!loading && <View style={tw`flex-row items-center justify-between`}>
                            <Pressable onPress={routeBack} >
                                <Image
                                    source={previous} style={tw`w-20 h-20 ml-5 `}
                                />
                            </Pressable>
                        </View>}

                        <View style={tw`${loading ? '' : 'mx-10'}`}>
                            {!loading && <CustomText style={tw`font-bold text-7 `}>{t("Screens.AddRecipients.text")}</CustomText>}
                            <StripeOnboarding type={type === 'recipient' ? 'individual' : 'non_profit'} pageLoading={loading} setPageLoading={setLoading} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default AddRecipients;

