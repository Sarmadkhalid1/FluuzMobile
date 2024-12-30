import React, { useState, useEffect } from "react";
import { View, TextInput, Pressable, ImageBackground, Image, Dimensions, Modal, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import previous from '../../assets/images/previous.png';
import plus from '../../assets/images/plusblue.png';
import wpf from '../../assets/images/wpf.png';
import arrow from '../../assets/images/arrowblue.png';
import tw from 'twrnc';
const { width, height } = Dimensions.get('screen');
import { Link, router, } from "expo-router";
import CustomText from "../../components/CustomText";
import { useTranslation } from 'react-i18next';
import { primary_color, secondary_color } from "../../constants/styles";
import { truncateText } from '../../services/Helper';
import { getAllRecipients } from "../../services/RecipientService";
import { setAddRecipientData, setCameFrom, setHowMuchSendingData, store } from "../../store";

const Donations = () => {

    const { t } = useTranslation();
    const [recipients, setRecipients] = useState([]);
    const [loading, setLoading] = useState(true);

    const getRecipients = async () => {
        try {
            const res = await getAllRecipients("");
            const data = res.data.filter(f => f.type === 'Organization');
            setRecipients(data);
            setLoading(false)
        }
        catch (error) {
            console.log(error);
        }
    }

    const donationToCharity = (organization) => {
        store.dispatch(setCameFrom(`/DonationToCharity?id=${organization.id}`));
        const theState = {
            senderAmount: null,
            senderCountry: null,
            receiverAmount: null,
            receiverCountry: organization.country,
            rate: null,
            payoutMethod: 'Bank',
        }
        store.dispatch(setHowMuchSendingData(theState));
        const addState = {
            id: organization.id,
            firstName: organization.firstName,
            lastName: null,
            email: organization.email,
            phone: organization.phone,
            userId: organization.userId,
            connectId: organization.connectId
        }
        store.dispatch(setAddRecipientData(addState));
        router.push('/AddRecipients');
    }

    useEffect(() => {
        getRecipients();
    }, []);

    if (loading)
        return (
            <View style={{ height, width }}>
                <ActivityIndicator style={tw`my-auto`} size={"large"}></ActivityIndicator>
            </View>
        );

    return (
        <ScrollView>
            <View style={tw`mb-15`}>
                <Link href="/Home" asChild>
                    <Pressable style={tw`mt-5`} >
                        <Image
                            source={previous} style={tw` w-20 h-20 `}
                        />
                    </Pressable>
                </Link>

                <View style={tw`mx-5`}>
                    <CustomText style={tw`text-xl font-bold`}>{t("Screens.Donations.text")}</CustomText>
                    <CustomText style={tw`mt-1 text-lg font-bold text-[${primary_color}]`}>Internationa Humanitarian Donations</CustomText>
                    <Link href="/PreAddRecipient?type=organization" asChild>
                        <Pressable style={tw`flex-row justify-between mt-3`}>
                            <CustomText style={tw`text-base font-semibold`}>{t("Screens.Donations.textSet")}</CustomText>
                            <Image style={tw`h-6 w-6`} source={plus} />
                        </Pressable>
                    </Link>

                    <View style={tw`flex-row mt-5`}>
                        <View style={tw`bg-[${primary_color}] h-[.3] grow`}></View>
                    </View>
                </View>

                {recipients.map((item, index) => (
                    <View key={index} style={tw`mx-5 mt-3`}>
                        <CustomText style={tw`text-lg font-bold text-center`}>
                            {item.firstName}
                        </CustomText>
                        <Pressable onPress={() => donationToCharity(item)}>
                            <View style={tw`flex-row mt-5 justify-between`}>
                                {/* <Image style={tw`w-20 h-22 my-auto`} source={item.image} /> */}
                                <View style={[tw` bg-[${secondary_color}] w-12 h-12 relative`, { borderRadius: 50 }]}>
                                    <CustomText style={tw`text-[${primary_color}] font-bold text-7 my-auto text-center`}>{item.firstName.charAt(0)}</CustomText>
                                </View>
                                <ScrollView>
                                    <CustomText style={tw`ml-5 w-55 text-xs font-semibold h-50`}>
                                        {truncateText(item.about, 350)}
                                    </CustomText>
                                </ScrollView>
                                <Image style={tw`h-3.2 w-3 my-auto`} source={arrow} />
                            </View>
                        </Pressable>
                        <View style={tw`flex-row mt-3`}>
                            <View style={tw`bg-[${primary_color}] h-[.3] grow `}></View>
                        </View>
                    </View>
                ))}

                {recipients.length === 0 &&
                    <CustomText style={tw`text-center mt-20 text-5`}>You do not have any charity organization added.</CustomText>
                }
            </View>
        </ScrollView>
    )
}

export default Donations;
