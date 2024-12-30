import React, { useEffect, useState } from "react";
import { View, Pressable, Image, Alert, ActivityIndicator, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import previous from '../../assets/images/previous.png';
import visa from '../../assets/images/visa.png';
import mastercard from '../../assets/images/mastercard.png';
import cardIcon from '../../assets/images/card-icon.png';
import chip from '../../assets/images/chip.png';
import dele from '../../assets/images/dele.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import { Link, useRouter } from "expo-router";
import CustomText from "../../components/CustomText";
import { CheckBox } from '@rneui/themed';
import arrowblack from '../../assets/images/arrowblack.png';
import { getCardList, deleteCard } from '../../services/StripeService';
import { StripeProvider } from "@stripe/stripe-react-native";
import LinearGradient from 'react-native-linear-gradient';
import { getCameFrom, getCardData, setCardData, store } from "../../store";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('screen');

export default CardList = () => {
    const router = useRouter();
    const [selected, setSelected] = useState(null);
    const [cardList, setCardList] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);
    const { t } = useTranslation();

    const oldState = useSelector(getCardData);

    const cameFrom = useSelector(getCameFrom);

    useEffect(() => {
        setOldState();
        listPayment();
    }, [])

    const listPayment = async () => {
        try {
            let res = await getCardList();
            setCardList(res.data);
            setLoadingPage(false)
        } catch (error) {
            Alert.alert('Error', error.response.data.message);
        }
    }

    const goToConfirm = async () => {
        if (selected) {
            store.dispatch(setCardData(selected));
            if(cameFrom){
                router.push(cameFrom);
            } else {
                router.push('/SendConfirmation');
            }
        }
    }

    const setOldState = async () => {
        try {
            if (oldState) {
                setSelected(oldState);
            }
        }
        catch { }
    }

    if (loadingPage) {
        return (
            <View style={[{ height, width }, tw` `]}>
                <ActivityIndicator style={tw`my-auto`} size={"large"}></ActivityIndicator>
            </View>
        );
    }

    const blendColors = (color1, color2, ratio) => {
        const hex = (color) => parseInt(color.slice(1, 7), 16);
        const alpha = parseInt(color2.slice(7, 9), 16) / 255;

        const r1 = (hex(color1) >> 16) & 0xff;
        const g1 = (hex(color1) >> 8) & 0xff;
        const b1 = hex(color1) & 0xff;

        const r2 = (hex(color2) >> 16) & 0xff;
        const g2 = (hex(color2) >> 8) & 0xff;
        const b2 = hex(color2) & 0xff;

        const r = Math.ceil((1 - ratio) * r1 + ratio * r2 * alpha);
        const g = Math.ceil((1 - ratio) * g1 + ratio * g2 * alpha);
        const b = Math.ceil((1 - ratio) * b1 + ratio * b2 * alpha);

        const toHex = (n) => n.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const getRandomBlendedColor = () => {
        const colors = [
            ['#0058CA', '#002C64CC'],
            ['#1E1E1E', '#0058CA']
        ]
        const selection = Math.random() > 0.5 ? 1 : 0;
        return colors[selection];
    };

    function getLastTwoDigits(year) {
        let yearString = year.toString();
        return yearString.slice(-2);
    }

    const cardListDummy = [
        {
            id: 1,
            card: {
                brand: 'Visa',
                last4: '1234',
                expMonth: '08',
                expYear: '2025',
                name: 'Alex'
            },
            color: getRandomBlendedColor()
        },
        {
            id: 2,
            card: {
                brand: 'MasterCard',
                last4: '5678',
                expMonth: '11',
                expYear: '2024',
                name: 'Top'
            },
            color: getRandomBlendedColor()
        },
        {
            id: 3,
            card: {
                brand: 'Amex',
                last4: '9101',
                expMonth: '02',
                expYear: '2026',
                name: 'Grizzly'
            },
            color: getRandomBlendedColor()
        },
    ];

    const handleDeleteCard = async (cardId) => {
        try {
            const response = await deleteCard(cardId);
            setCardList(prevCardList => prevCardList.filter(card => card.id !== cardId));
            setSelected(null);
        } catch (error) {
            Alert.alert('Error', 'An error occurred while deleting the card.');
        }
    };

    const showDeleteDialog = (cardId) => {
        Alert.alert(
            "Delete Card",
            "Are you sure you want to delete this card?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => handleDeleteCard(cardId)
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <StripeProvider
            publishableKey={process.env.EXPO_PUBLIC_STRIPE_PK}
        >
            <ScrollView>
                <View style={tw`flex-row items-center justify-between`}>
                    <Link href="/SendingTo" asChild>
                        <Pressable >
                            <Image
                                source={previous} style={tw`w-20 h-20 ml-5 `}
                            />
                        </Pressable>
                    </Link>
                </View>

                <View style={tw` mb-10`}>
                    <CustomText style={tw`font-bold text-4xl mx-10 `}>{t("Screens.CardList.text")}</CustomText>

                    {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-5 mx-2 `}>
                        {cardList.map((paymentMethod, index) => {

                            const backgroundColor = getRandomBlendedColor();
                            return (
                                <LinearGradient
                                    onTouchEnd={() => setSelected(paymentMethod.id)}
                                    key={index}
                                    style={[tw`px-8 py-2 rounded-2xl mx-2`, { borderRadius: 16 }]}
                                    colors={backgroundColor}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                >
                                    <CustomText style={tw`font-bold text-lg text-right text-[#DDD9D6]`}>{paymentMethod.card.brand}</CustomText>
                                    <Image style={tw`h-10 w-13 rounded-lg`} source={chip} />
                                    <CustomText style={tw`font-semibold text-2xl mt-5 text-[#DDD9D6]`}>**** **** **** {paymentMethod.card.last4}</CustomText>
                                    <View style={tw`flex-row justify-end mr-2 mt-1`}>
                                        <CustomText style={tw`w-8 font-semibold text-xs text-[#DDD9D6]`}>Valid Thru</CustomText>
                                        <CustomText style={tw`font-semibold text-xl my-auto text-[#DDD9D6]`}>{paymentMethod.card.expMonth + "/" + getLastTwoDigits(paymentMethod.card.expYear)}</CustomText>
                                    </View>
                                    <CustomText style={tw`font-semibold text-base text-[#DDD9D6]`}>Name</CustomText>
                                </LinearGradient>
                            );
                        })}
                    </ScrollView> */}

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-5 mx-2`}>
                        {cardListDummy.map((paymentMethod, index) => {
                            return (
                                <LinearGradient
                                    // onTouchEnd={() => setSelected(paymentMethod.id)}
                                    key={index}
                                    style={[tw`px-8 py-2 rounded-2xl mx-2`, { borderRadius: 16 }]}
                                    colors={paymentMethod.color}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                >
                                    <CustomText style={tw`font-bold text-lg text-right text-[#DDD9D6]`}>
                                        {paymentMethod.card.brand}
                                    </CustomText>
                                    <Image style={tw`h-10 w-13 rounded-lg`} source={chip} />
                                    <CustomText style={tw`font-semibold text-2xl mt-5 text-[#DDD9D6]`}>
                                        **** **** **** {paymentMethod.card.last4}
                                    </CustomText>
                                    <View style={tw`flex-row justify-end mr-2 mt-1`}>
                                        <CustomText style={tw`w-8 font-semibold text-xs text-[#DDD9D6]`}>Valid Thru</CustomText>
                                        <CustomText style={tw`font-semibold text-xl my-auto text-[#DDD9D6]`}>
                                            {paymentMethod.card.expMonth}/{getLastTwoDigits(paymentMethod.card.expYear)}
                                        </CustomText>
                                    </View>
                                    <CustomText style={tw`font-semibold text-base text-[#DDD9D6]`}>{paymentMethod.card.name}</CustomText>
                                </LinearGradient>
                            );
                        })}
                    </ScrollView>

                    <View style={tw`mx-10 mt-5`}>
                        {cardList.map((paymentMethod, index) => (

                            <View
                                onTouchEnd={() => setSelected(paymentMethod.id)}
                                key={index}
                                style={[
                                    tw`flex-row justify-between py-5 `,
                                    {
                                        borderBottomWidth: index !== cardList.length - 1 ? 1 : 0,
                                        borderBottomColor: index !== cardList.length - 1 ? '#0058CA' : 'transparent',
                                    },
                                ]}
                            >
                                {/* <View style={tw`flex-row gap-4 items-center`}>
                                    <Image
                                        style={tw`w-10.5 h-3`}
                                        source={paymentMethod.card.brand === 'visa' ? visa : mastercard}
                                    />
                                    <CustomText style={tw`font-bold text-4`}>{paymentMethod.card.brand + " " + paymentMethod.card.last4}</CustomText>
                                </View>

                                <View style={tw`flex-row items-center`}>
                                    <CheckBox
                                        checked={selected === paymentMethod.id}
                                        onPress={() => setSelected(paymentMethod.id)}
                                        iconType="material-community"
                                        checkedIcon="radiobox-marked"
                                        uncheckedIcon="radiobox-blank"
                                    />
                                </View> */}

                                {paymentMethod.card ? (
                                    // <View style={tw`flex-row gap-4 items-center`}>
                                    //     <Image style={tw`w-5 h-5`} source={del}
                                    //         onPress={() => deleteCard(paymentMethod.id)} />
                                    //     <Image
                                    //         resizeMode="contain"
                                    //         style={tw`w-10.5 h-6`}
                                    //         source={paymentMethod.card.brand === 'visa' ? visa : (paymentMethod.card.brand === 'mastercard' ? mastercard : mastercard)}
                                    //     />
                                    //     <CustomText style={tw`font-bold text-4`}>{paymentMethod.card.brand + " " + paymentMethod.card.last4}</CustomText>
                                    // </View>

                                    <View style={tw`flex-row gap-4 items-center`}>
                                        <TouchableOpacity onPress={() => showDeleteDialog(paymentMethod.id)}>
                                            <Image style={tw`w-6 h-6`} source={dele} />
                                        </TouchableOpacity>
                                        <Image
                                            resizeMode="contain"
                                            style={tw`w-10.5 h-6`}
                                            source={paymentMethod.card.brand === 'visa' ? visa : (paymentMethod.card.brand === 'mastercard' ? mastercard : cardIcon)}
                                        />
                                        <CustomText style={tw`font-bold text-4`}>{'**** **** **** ' + paymentMethod.card.last4}</CustomText>
                                    </View>
                                ) : (
                                    <CustomText>{t("Screens.CardList.textNo")}</CustomText>
                                )}

                                <CheckBox
                                    containerStyle={tw`p-0 m-0`}
                                    checked={selected === paymentMethod.id}
                                    onPress={() => setSelected(paymentMethod.id)}
                                    iconType="material-community"
                                    checkedIcon="radiobox-marked"
                                    uncheckedIcon="radiobox-blank"
                                />
                            </View>
                        ))}

                        <Link asChild href="/AddCard">
                            <Pressable style={tw`flex-row justify-between ml-3.5 mr-8 mt-5`}>
                                <View style={tw`flex-row gap-3 items-center`}>
                                    <Image style={tw`h-9 w-9`} source={cardIcon} />
                                    <CustomText style={tw`text-[${primary_color}] font-semibold text-4`}>{t("Screens.CardList.textAdd")}</CustomText>
                                </View>
                                <Image style={tw`h-5 w-3 my-auto`} source={arrowblack} />
                            </Pressable>
                        </Link>

                        {/* {!reloadForm &&
                            <CardForm
                                disabled={saving}
                                onFormComplete={(cardDetails) => {
                                    if (!cardDetails.complete) return;
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
                        } */}

                        {/* {reloadForm &&
                            <ActivityIndicator style={tw`my-10`} size={"large"}></ActivityIndicator>
                        } */}

                        {/* <Pressable
                            disabled={!ready || loading || saving}
                            onPress={() => saveCard()}
                            style={tw`${CustomStyles.btn} mx-auto w-44 ${!ready || loading || saving ? ' opacity-60' : ""}`}
                        >
                            <View style={tw`flex-row items-center gap-3`}>
                                {saving && <ActivityIndicator color="#fff" size={"large"}></ActivityIndicator>}
                                <CustomText style={tw`text-white font-bold text-lg py-3`}>
                                    Add Card
                                </CustomText>
                            </View>
                        </Pressable> */}
                    </View>

                    {/* <Link asChild href="/PaymentMethods">
                        <Pressable>
                            <View style={tw` flex-row justify-between items-center mt-10`}>
                                <View style={tw`flex-row gap-4 items-center`}>
                                    <Image style={tw`h-6 w-6`} source={card} />
                                    <CustomText style={tw`text-[${primary_color}] font-semibold text-4`}>Add new Card</CustomText>
                                </View>
                                <Link href="/RelatedRecipients" style={tw`my-auto`}>
                                    <View style={tw`flex-row gap-4 items-center`}>
                                        <Image style={tw`h-3 w-3`} source={arrowblack} />
                                    </View>
                                </Link>
                            </View>
                        </Pressable>
                    </Link> */}

                    <Pressable
                        onPress={goToConfirm}
                        disabled={!selected}
                        style={tw`${CustomStyles.btn} mt-15 py-3 mx-10 ${!selected ? 'bg-[#0058CA99]' : ''}`}
                    >
                        <View style={tw`flex-row items-center gap-3`}>
                            <CustomText style={tw`text-white font-bold text-lg `}>
                                {t("Screens.CardList.textChoose")}
                            </CustomText>
                        </View>
                    </Pressable>
                </View>

            </ScrollView>
        </StripeProvider>
    )
}
