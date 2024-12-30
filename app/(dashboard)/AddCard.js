import React, { useState, useEffect } from 'react';
import { View, Pressable, Image, ScrollView, Appearance, ActivityIndicator, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Alert } from "react-native";
import previous from '../../assets/images/previous.png';
import tw from 'twrnc';
import { Link, router } from "expo-router";
import CustomText from '../../components/CustomText';
import CustomStyles from '../../constants/styles'
import part1 from '../../assets/images/progress_2.png'
import part2 from '../../assets/images/progress_1_b.png'
import { StripeProvider, CardForm, useConfirmSetupIntent } from "@stripe/stripe-react-native";
import { setupIntent } from '../../services/StripeService';
import { useSelector } from 'react-redux';
import { getHowMuchSendingData } from '../../store';
import { useTranslation } from 'react-i18next';


const AddCard = () => {
    const [saving, setSaving] = useState(false);
    const [ready, setReady] = useState(false);

    const { confirmSetupIntent, loading } = useConfirmSetupIntent();
    const [clientPaymentIntentRequest, setClientPaymentIntentRequest] = useState(false);

    const howMuchSendingData = useSelector(getHowMuchSendingData);
    const { t } = useTranslation();



    useEffect(() => {
        initSetupIntent();
    }, [])

    const initSetupIntent = async () => {
        try {
            const res = await setupIntent();
            setClientPaymentIntentRequest(res.data);
        }
        catch (error) {
            Alert.alert('Error', error.response.data.message)
        }
    }

    const saveCard = async () => {
        setSaving(true);

        const { setupIntent, error } = await confirmSetupIntent(clientPaymentIntentRequest, {
            paymentMethodType: 'Card',
        });

        if (error) {
            Alert.alert('Error', error.localizedMessage);
            setSaving(false);
            return;
        }

        //Refresh users card list
        router.back();
    }

    return (
        <StripeProvider
            publishableKey={process.env.EXPO_PUBLIC_STRIPE_PK}
        >
            <ScrollView>
                <KeyboardAvoidingView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <View style={tw`flex-row items-center`}>
                                <Link href="/CardList" asChild>
                                    <Pressable >
                                        <Image
                                            source={previous} style={tw`w-20 h-20`}
                                        />
                                    </Pressable>
                                </Link>

                                <View style={tw`flex-row ml-10`}>
                                    <Image source={part1} />
                                    <Image source={part2} style={tw`-ml-2 -mt-1`} />
                                </View>
                            </View>

                            <View style={tw`mx-5 mt-10 mb-5`}>
                                <CustomText style={tw`font-bold text-7`}>{t("Screens.AddCard.text")}</CustomText>
                                <CardForm
                                    disabled={saving}
                                    defaultValues={{ countryCode: howMuchSendingData.senderCountry }}
                                    onFormComplete={(cardDetails) => {
                                        if (!cardDetails.complete) {
                                            setReady(false);
                                            return;
                                        }
                                        setReady(true);
                                    }}
                                    cardStyle={{
                                        backgroundColor: Appearance.getColorScheme() == 'dark' ? '#000000' : '#ffffff',
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 270,
                                        marginVertical: 15
                                    }}
                                />
                                <Pressable
                                    disabled={!ready || loading || saving}
                                    onPress={() => saveCard()}
                                    style={tw`${CustomStyles.btn} mx-auto w-44 ${!ready || loading || saving ? ' opacity-60' : ""}`}
                                >
                                    <View style={tw`flex-row items-center gap-3`}>
                                        {saving && <ActivityIndicator color="#fff" size={"large"}></ActivityIndicator>}
                                        <CustomText style={tw`text-white font-bold text-lg py-3`}>
                                            {t("Screens.AddCard.textAdd")}
                                        </CustomText>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </StripeProvider>
    )
}
export default AddCard;