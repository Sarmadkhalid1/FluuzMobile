import React, { useState, useEffect } from "react";
import { View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { primary_color, secondary_color } from '../../constants/styles';
import tw from 'twrnc';
import { useRouter } from "expo-router";
import CustomText from '../../components/CustomText';
import { getFlagByCountryCode, getLabelByCountryCode } from '../../services/Countries-js';
import blueArrow from '../../assets/images/arrowblue.png'
import { store, setSavedRecipientData, setHowMuchSendingData } from '../../store';
const { width, height } = Dimensions.get('window');
import { useTranslation } from 'react-i18next';
import { getAllRecipients } from "../../services/RecipientService";


const SavedRecipients = () => {
    const router = useRouter();

    const { t } = useTranslation();
    const [recipients, setRecipients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecipients();
    }, []);

    const getRecipients = async () => {
        try {
            const res = await getAllRecipients("");
            const data = res.data.filter(f => f.type !== 'Organization');
            setRecipients(data);
            setLoading(false)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleClick = async (recipient) => {
        try {
            store.dispatch(setHowMuchSendingData({ receiverCountry: recipient.country }));
            store.dispatch(setSavedRecipientData(recipient));
            router.push('/HowMuchSending')
        } catch (error) {
            console.log(error)
        }
    }

    if (loading)
        return (
            <View style={{ height, width }}>
                <ActivityIndicator style={tw`my-auto`} size={"large"}></ActivityIndicator>
            </View>
        );

    return (
        <View style={[tw`px-10`, { width, height, backgroundColor: 'white' }]}>
            <CustomText style={tw`text-8 font-bold mt-10 mb-10`}>{t("Screens.SavedRecipients.text")}</CustomText>

            {/* <Pressable onPress={() => addRecipient()}>
                <View>
                    <CustomText style={tw`text-[${primary_color}] mt-5 `}>+Add new</CustomText>
                    <CustomText style={tw`bg-blue-500 h-0.3 w-18`}></CustomText>
                </View>
            </Pressable> */}

            {recipients.map((recipient, index) => (
                <TouchableOpacity onPress={() => handleClick(recipient)} key={index} style={tw` flex-row justify-between mt-5 border-b border-blue-700 pb-3 pr-1`}>
                    <View style={tw`flex-row gap-4 items-center`}>
                        <View style={[tw` bg-[${secondary_color}] w-12 h-12 relative`, { borderRadius: 50 }]}>
                            <CustomText style={tw`text-[${primary_color}] font-bold text-7 my-auto text-center`}>{recipient.firstName.charAt(0)}</CustomText>
                        </View>

                        <View>
                            <View style={tw`gap-1`}>
                                <CustomText style={tw`font-bold`}>{recipient.firstName} {recipient.lastName}</CustomText>
                                {/* <CustomText >{recipient.category}</CustomText> */}
                            </View>

                            <View style={tw`flex-row gap-1 items-center`}>
                                <Image style={tw`h-4 w-6`} source={getFlagByCountryCode(recipient.country)} />
                                <CustomText style={tw`mt-1`}>{getLabelByCountryCode(recipient.country)}</CustomText>
                            </View>
                        </View>

                    </View>

                    <View style={[tw`bg-blue-100 h-11 w-11 mt-1`, { borderRadius: 50 }]}>
                        <Image style={tw`h-5 w-3 my-auto mx-auto`} source={blueArrow} />
                    </View>

                </TouchableOpacity>
            ))}

            {recipients.length === 0 &&
                <CustomText style={tw``}>{t("Screens.SavedRecipients.textYou")}</CustomText>
            }
        </View>
    )
}

export default SavedRecipients;