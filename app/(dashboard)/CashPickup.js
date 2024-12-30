import React, { useState } from "react";
import { View, Pressable, Image } from "react-native";
import previous from '../../assets/images/previous.png';
import jubaexpress from '../../assets/images/jubaexpress.png';
import bakaal from '../../assets/images/bakaal.png';
import location from '../../assets/images/location.png';
import tw from 'twrnc';
import { primary_color } from "../../constants/styles";
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';
import { useTranslation } from 'react-i18next';



const CashPickup = () => {
    const [disbaled, setDisabled] = useState(true);
    const { t } = useTranslation();


    return (
        <View style={tw`mx-10`}>
            <Link href="/HowToDeliverMoney" asChild>
                <Pressable style={tw`ml-[-20]`}>
                    <Image
                        source={previous} style={tw` w-20 h-20`}
                    />
                </Pressable>
            </Link>
            <CustomText style={tw`font-bold text-6 items-center`}>{t("Screens.CashPickup.textCash")}</CustomText>
            <CustomText style={tw`font-medium text-base mt-3`}>{t("Screens.CashPickup.textPickup")}</CustomText>
            {/* 
            <View style={tw`flex-row justify-between mt-2 border-b pb-3 border-blue-700`}>
                <View>
                    <CustomText style={tw`font-semibold text-lg`}>Bakaal</CustomText>
                    <View style={tw`flex-row  mt-2`}>
                        <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                        <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                    </View>
                    <View style={tw`flex-row mt-2`}>
                        <Image style={tw`h-5 w-4`} source={location} />
                        <CustomText style={tw`text-xs ml-3 text-[${primary_color}]`}>Pickup Points</CustomText>
                    </View>
                </View>

                <View style={tw`my-auto`}>
                    <Image style={tw`h-3 w-3`} source={arrowblack} />
                </View>

            </View> */}

            {/* <View style={tw`flex-row justify-between  mt-2`}>
                <View>
                    <CustomText style={tw`font-semibold text-lg`}>Juba Express</CustomText>
                    <View style={tw`flex-row  mt-2`}>
                        <CustomText style={tw`font-semibold mr-4`}>Currency options:</CustomText>
                        <CustomText style={tw`border py-0 px-2 border-blue-300`}>KES</CustomText>
                    </View>
                    <View style={tw`flex-row mt-2`}>
                        <Image style={tw`h-5 w-4`} source={location} />
                        <CustomText style={tw`text-xs ml-3 text-[${primary_color}]`}>Pickup Points</CustomText>
                    </View>
                </View>
                <View style={tw`my-auto`}>

                    <Image style={tw`h-3 w-3`} source={arrowblack} />
                </View>

            </View> */}

            <View style={tw`flex-row justify-between mt-10 border-b pb-5 border-blue-700`}>
                <View style={tw`flex-row`}>
                    <Image style={tw`h-7 w-10 mt-1`} source={bakaal} />
                    <View style={tw`ml-5`}>
                        <CustomText style={tw`font-semibold text-lg`}>{t("Screens.CashPickup.textBakaal")}</CustomText>
                        <View style={tw`flex-row  mt-2`}>
                            <CustomText style={tw`font-semibold mr-4`}>{t("Screens.CashPickup.textCurrency")}</CustomText>
                            <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                        </View>
                        {/* <CustomText style={tw`text-xs mt-1 w-50`}>To a cash pickup point</CustomText> */}
                        <View style={tw`flex-row mt-2`}>
                            <Image style={tw`h-5 w-4.3`} source={location} />
                            <CustomText style={tw`text-xs ml-3 text-[${primary_color}]`}>{t("Screens.CashPickup.textPoint")}</CustomText>
                        </View>
                    </View>
                </View>
                {/* <Link href="/CashPickup" style={tw`my-auto`}>
                    <View >
                        <Image style={tw`h-3 w-3`} source={arrowblack} />
                    </View>
                </Link> */}
            </View>

            <View style={tw`flex-row justify-between mt-5`}>
                <View style={tw`flex-row`}>
                    <Image style={tw`h-5 w-10 mt-1`} source={jubaexpress} />
                    <View style={tw`ml-5`}>
                        <CustomText style={tw`font-semibold text-lg`}>Juba Express</CustomText>
                        <View style={tw`flex-row  mt-2`}>
                            <CustomText style={tw`font-semibold mr-4`}>{t("Screens.CashPickup.textCurrency")}</CustomText>
                            <CustomText style={tw`border py-0 px-2 border-blue-300`}>$USD</CustomText>
                        </View>
                        {/* <CustomText style={tw`text-xs mt-1 w-50`}>To a cash pickup point</CustomText> */}
                        <View style={tw`flex-row mt-2`}>
                            <Image style={tw`h-5 w-4.3`} source={location} />
                            <CustomText style={tw`text-xs ml-3 text-[${primary_color}]`}>{t("Screens.CashPickup.textPoint")}</CustomText>
                        </View>
                    </View>
                </View>
                {/* <Link href="/CashPickup" style={tw`my-auto`}>
                    <View >
                        <Image style={tw`h-3 w-3`} source={arrowblack} />
                    </View>
                </Link> */}
            </View>


            <View style={tw`mx-10 mt-15`}>
                <CustomText style={tw`font-bold text-7`}>$44254 {t("Screens.CashPickup.textIn")}</CustomText>
                <CustomText style={tw`text-[${primary_color}] text-2xl`}>{t("Screens.CashPickup.textSee")}</CustomText>
            </View>
            <Pressable
                style={tw` py-3 ${CustomStyles.btn} ${disbaled ? 'bg-[#0058CA99]' : ''} mt-10`}
                disabled={disbaled}
            >
                <View style={tw`flex-row items-center`}>
                    <CustomText style={tw`text-white font-bold text-lg `}>{t("Screens.CashPickup.textNext")}</CustomText>
                </View>
            </Pressable>
        </View>
    )
}
export default CashPickup;