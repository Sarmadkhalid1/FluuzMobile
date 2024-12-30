import { Image, Platform, View, StyleSheet, Dimensions } from "react-native";
import home from '../assets/images/home.png';
import homeactive from '../assets/images/homeactive.png';
import send from '../assets/images/send.png';
import sendactive from '../assets/images/sendactive.png';
import recipients2 from '../assets/images/recipients2.png';
import recipients2active from '../assets/images/recipients2active.png';
import transaction from '../assets/images/transaction.png';
import transactionactive from '../assets/images/transactionactive.png';
import React, { } from "react";
import tw from 'twrnc';
import { Card } from "react-native-shadow-cards";
import { Link } from "expo-router";
import CustomText from './CustomText';
import { setSavedRecipientData, store } from '../store';
import { useTranslation } from 'react-i18next';


const { width, height } = Dimensions.get('screen');


const styles = StyleSheet.create({
    ...Platform.select({
        ios: {
            shadowColor: "#000000",
            shadowOffset: {
                width: 0,
                height: -5.5,
            },
            shadowOpacity: 0.1,
            shadowRadius: 15,
        },
        android: {
            elevation: 10,
            backgroundColor: 'white'
        }
    })
})

const AppBar = ({ selectedLink, setSelectedLink, show }) => {
    const { t } = useTranslation();


    const handleLinkClick = (link) => {
        if (link === 'Send') {
            store.dispatch(setSavedRecipientData({
                id: null,
                firstName: null,
                lastName: null,
                email: null,
                phone: null,
                userId: null,
                connectId: null
            }));
        }
        setSelectedLink(link);
    };

    if (!show)
        return <></>;

    return (
        <View style={[{ width, position: 'absolute', bottom: 0 }, styles]}>
            <Card style={[tw`flex-row justify-evenly py-4 rounded-t-2xl `, { width }]}>
                <Link href='Home' onPress={() => handleLinkClick("Home")}>
                    <View>
                        <Image style={tw`mx-auto h-7 w-7`} source={selectedLink === "Home" ? homeactive : home} />
                        <CustomText style={tw`text-sm`}>{t("Screens.AppBar.text")}</CustomText>
                    </View>
                </Link>

                <Link href='HowMuchSending' onPress={() => handleLinkClick("Send")}>
                    <View>
                        <Image style={tw`mx-auto h-7 w-7`} source={selectedLink === "Send" ? sendactive : send} />
                        <CustomText style={tw`text-sm`}>{t("Screens.AppBar.textSend")}</CustomText>
                    </View>
                </Link>

                <Link href='SavedRecipients' onPress={() => handleLinkClick("Recipients")}>
                    <View>
                        <Image style={tw`mx-auto h-7 w-7`} resizeMode="contain" source={selectedLink === "Recipients" ? recipients2active : recipients2} />
                        <CustomText style={tw`text-sm`}>{t("Screens.AppBar.textRecipients")}</CustomText>
                    </View>
                </Link>

                <Link href='TransactionHistory' onPress={() => handleLinkClick("Transactions")}>
                    <View>
                        <Image style={tw`mx-auto h-7 w-7`} resizeMode="contain" source={selectedLink === "Transactions" ? transactionactive : transaction} />
                        <CustomText style={tw`text-sm`}>{t("Screens.AppBar.textTransactions")}</CustomText>
                    </View>
                </Link>
            </Card>
        </View>
    )
}

export default AppBar;