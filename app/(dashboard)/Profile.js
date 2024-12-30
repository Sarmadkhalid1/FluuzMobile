import React, { useState } from 'react';
import { View, Pressable, Image, ScrollView, Switch, TouchableOpacity } from "react-native";
import previous from '../../assets/images/previous.png';
import person from '../../assets/images/person.png';
import information from '../../assets/images/information.png';
import arrowblue from '../../assets/images/arrowblue.png';
import id from '../../assets/images/id.png';
import phone from '../../assets/images/phone.png';
import notification from '../../assets/images/notification.png';
import language from '../../assets/images/language.png';
import transaction from '../../assets/images/transactionactive.png';
import faceid from '../../assets/images/faceid.png';
import password from '../../assets/images/password.png';
import document from '../../assets/images/document.png';
import help from '../../assets/images/help.png';
import logout from '../../assets/images/logout.png';
import tw from 'twrnc';
import { Link, router } from "expo-router";
import CustomText from '../../components/CustomText';
import * as SecureStore from 'expo-secure-store';
import { useTranslation } from 'react-i18next';



const Profile = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const { t } = useTranslation();


    async function handleLogout() {
        await SecureStore.deleteItemAsync('jwt_token');
        router.push('/Login');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={tw`mx-5`}>
                <Link style={tw`w-15`} href="../" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw`w-20 h-20 ml-[-15] mt-5`} />
                    </Pressable>
                </Link>

                <View style={tw`flex-row justify-between`}>
                    <CustomText style={tw`font-bold text-lg my-auto`}>{t("Screens.Profile.text")}</CustomText>
                    <Pressable>
                        <Image source={person} style={tw`w-10 h-10  rounded-full`} />
                    </Pressable>
                </View>

                <View style={tw`flex-row justify-between mt-5 border-b border-blue-700 pb-2`}>
                    <View style={tw`flex-row`}>
                        <View style={tw`h-8 w-8 items-center`} >
                            <Image style={tw`h-6 w-5`} source={information} />
                        </View>
                        <CustomText style={tw`font-semibold ml-5 my-auto my-auto`}>{t("Screens.Profile.textContact")}</CustomText>
                    </View>
                    <Image style={tw`w-2.7 h-4.5 my-auto`} source={arrowblue} />
                </View>

                <View style={tw`flex-row justify-between mt-5 border-b border-blue-700 pb-2`}>
                    <View style={tw`flex-row`}>
                        <View style={tw`h-8 w-8 items-center`} >
                            <Image style={tw`w-6.5 h-5`} source={id} />
                        </View>
                        <CustomText style={tw`font-semibold ml-5 my-auto`}>{t("Screens.Profile.textId")}</CustomText>
                    </View>
                    <Image style={tw`w-2.7 h-4.5 my-auto`} source={arrowblue} />
                </View>

                <View style={tw`flex-row justify-between mt-5 border-b border-blue-700 pb-2`}>
                    <View style={tw`flex-row`}>
                        <View style={tw`h-8 w-8 items-center`} >
                            <Image style={tw`h-7 w-8`} source={phone} />
                        </View>
                        <CustomText style={tw`font-semibold ml-5 my-auto`}>{t("Screens.Profile.textPhone")}</CustomText>
                    </View>
                    <Image style={tw`w-2.7 h-4.5 my-auto`} source={arrowblue} />
                </View>

                <View style={tw`flex-row justify-between mt-5 border-b border-blue-700 pb-2`}>
                    <View style={tw`flex-row`}>
                        <View style={tw`h-8 w-8 items-center`} >
                            <Image style={tw`h-8 w-6`} source={notification} />
                        </View>
                        <CustomText style={tw`font-semibold ml-5 my-auto`}>{t("Screens.Profile.textManage")}</CustomText>
                    </View>
                    <Image style={tw`w-2.7 h-4.5 my-auto`} source={arrowblue} />
                </View>

                <Link href="/Language" asChild>
                    <Pressable>
                        <View style={tw`flex-row justify-between mt-5 border-b border-blue-700 pb-2`}>
                            <View style={tw`flex-row`}>
                                <View style={tw`h-8 w-8 items-center`} >
                                    <Image style={tw`w-6 h-6 `} source={language} />
                                </View>
                                <CustomText style={tw`font-semibold ml-5 my-auto`}>{t("Screens.Profile.textLanguage")}</CustomText>
                            </View>
                            <Image style={tw`w-2.7 h-4.5 my-auto`} source={arrowblue} />
                        </View>
                    </Pressable>
                </Link>

                <View style={tw`flex-row justify-between mt-5 border-b border-blue-700 pb-2`}>
                    <View style={tw`flex-row`}>
                        <View style={tw`h-8 w-8 items-center`} >
                            <Image style={tw`w-6 h-6`} source={transaction} />
                        </View>
                        <CustomText style={tw`font-semibold ml-5 my-auto`}>{t("Screens.Profile.textTransaction")}</CustomText>
                    </View>
                    <Image style={tw`w-2.7 h-4.5 my-auto`} source={arrowblue} />
                </View>

                <CustomText style={tw`text-gray-500 font-semibold text-lg mt-10`}>{t("Screens.Profile.textSecurity")}</CustomText>

                <View style={tw`flex-row justify-between mt-5`}>
                    <View style={tw`flex-row`}>
                        <View style={tw`h-8 w-8 items-center`} >
                            <Image style={tw`w-8 h-8`} source={faceid} />
                        </View>
                        <CustomText style={tw`font-semibold ml-5 my-auto`}>{t("Screens.Profile.textFace")}</CustomText>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#0BDA51' }}
                        thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    // style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                    />
                </View>

                <View style={tw`flex-row justify-between mt-5`}>
                    <View style={tw`flex-row `}>
                        <View style={tw`h-8 w-8 items-center`} >
                            <Image style={tw`w-5 h-6.2`} source={password} />
                        </View>
                        <CustomText style={tw`font-semibold ml-5 my-auto`}>{t("Screens.Profile.textChnage")}</CustomText>
                    </View>
                    <Image style={tw`w-2.7 h-4.5 my-auto`} source={arrowblue} />
                </View>

                <CustomText style={tw`text-gray-500 font-semibold text-lg mt-10`}>{t("Screens.Profile.textHelp")}</CustomText>

                <View style={tw`flex-row justify-between mt-5`}>
                    <View style={tw`flex-row `}>
                        <View style={tw`h-8 w-8 items-center`} >
                            <Image style={tw`w-5 h-6.2`} source={document} />
                        </View>
                        <CustomText style={tw`font-semibold ml-5 my-auto`}>{t("Screens.Profile.textLegal")}</CustomText>
                    </View>
                    <Image style={tw`w-2.7 h-4.5 my-auto`} source={arrowblue} />
                </View>

                <View style={tw`flex-row justify-between mt-5`}>
                    <View style={tw`flex-row `}>
                        <View style={tw`h-8 w-8 items-center`} >
                            <Image style={tw`w-5.5 h-6.2`} source={help} />
                        </View>
                        <CustomText style={tw`font-semibold ml-5 my-auto`}>{t("Screens.Profile.textGet")}</CustomText>
                    </View>
                    <Image style={tw`w-2.7 h-4.5 my-auto`} source={arrowblue} />
                </View>

                <TouchableOpacity onPress={() => handleLogout()} style={tw`flex-row justify-between mt-5 mb-15`}>
                    <View style={tw`flex-row `}>
                        <View style={tw`h-8 w-8 items-center`} >
                            <Image style={tw`w-6 h-6`} source={logout} />
                        </View>
                        <CustomText style={tw`font-semibold ml-5 my-auto`}>{t("Screens.Profile.textLog")}</CustomText>
                    </View>
                    <Image style={tw`w-2.7 h-4.5 my-auto`} source={arrowblue} />
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}
export default Profile;