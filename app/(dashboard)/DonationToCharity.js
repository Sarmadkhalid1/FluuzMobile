import React, { useState, useEffect } from "react";
import { View, Pressable, Image, Dimensions, Modal, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, ScrollView } from "react-native";
import previous from '../../assets/images/previous.png';
import unhcr from '../../assets/images/unhcr.png';
import tw from 'twrnc';
const { width, height } = Dimensions.get('screen');
import { Link, useRouter } from "expo-router";
import CustomText from "../../components/CustomText";
import Close from '../../assets/images/Close.png';
import { Card } from 'react-native-shadow-cards';
import { useLocalSearchParams } from 'expo-router';
import { getRecipientById } from "../../services/RecipientService";
import { getCardData, setHowMuchSendingData, store } from "../../store";
import { useSelector } from 'react-redux';
import { formatCurrency } from "../../services/Helper";
import { getLoginUserCountry } from "../../services/AuthService";
import { getCurrencyCodeByCountryCode, getSymbolByCountryCode } from "../../services/Countries-js";
import { getDailyRates } from "../../services/RaypdService";
import { sendTransaction } from "../../services/TransactionService";


const DonationToCharity = () => {
    const router = useRouter();

    const [id, setId] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [senderAmount, setSenderAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [isLoading, setLoading] = useState(true);

    const [receiverAmount, setReceiverAmount] = useState('');
    const [senderCountry, setSenderCountry] = useState('');
    const [receiverCountry, setReceiverCountry] = useState('AE');
    const [rate, setRate] = useState(null);
    const [selectedCard, setSelectedCard] = useState('');

    const params = useLocalSearchParams();
    const cardData = useSelector(getCardData);
    const [donating, setDonating] = useState(false);

    useEffect(() => {
        const { id } = params;
        if (id) {
            setId(id);
        }
    }, [params]);

    useEffect(() => {
        getUserCurrency();
    }, []);

    useEffect(() => {
        setSelectedCard(cardData);
    }, [cardData]);

    useEffect(() => {
        if (id) {
            getOrganizationData(id);
        }
    }, [id]);

    const getUserCurrency = async () => {
        try {
            setLoading(true);
            let response = await getLoginUserCountry();
            setSenderCountry(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const getOrganizationData = async (id) => {
        try {
            const res = await getRecipientById(id);
            setOrganization(res.data);
            setReceiverCountry(res.data.country);
        } catch (error) {
            console.log('Error fetching organization data:', error);
        }
    }

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const renderText = () => {
        if (isExpanded || !organization) {
            return organization?.about || '';
        }
        return `${organization.about.slice(0, 350)}...`;
    };

    const handlePredefinedAmount = (amount) => {
        setCustomAmount(null);
        if (amount === senderAmount) {
            setSenderAmount(null)
        }
        else {
            setSenderAmount(amount);
        }
    }

    const handleCustomAmount = (amount) => {
        setSenderAmount(0);
        setCustomAmount(amount);
    }

    const handleDonate = async () => {
        try {
            setDonating(true);
            if (customAmount) {
                setSenderAmount(parseInt(customAmount))
            }

            const res = await getDailyRates(getCurrencyCodeByCountryCode(senderCountry), getCurrencyCodeByCountryCode(receiverCountry));
            const r = parseFloat(res.data);
            setRate(r);
            let amount = parseFloat(senderAmount);
            let recAmount = (parseFloat(amount) * res.data).toString();
            recAmount = formatCurrency(recAmount)
            setReceiverAmount(recAmount);

            const theState = {
                senderAmount,
                senderCountry,
                receiverAmount,
                receiverCountry,
                rate,
                payoutMethod: 'Bank',
            }
            store.dispatch(setHowMuchSendingData(theState));
            const data = {
                recipientName: organization.firstName,
                recipientCurrencyCode: getCurrencyCodeByCountryCode(receiverCountry),
                amount: senderAmount,
                rate: r,
                deliveryMethod: 'Bank',
                selectedCard: selectedCard,
            }
            await sendTransaction(organization.connectId, data);
            router.push('/DonationSuccessful');
            setDonating(false);
        }
        catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <ScrollView>

            <View style={tw`flex-1 relative`}>
                <Link href="/Donations" asChild>
                    <Pressable>
                        <Image source={previous} style={tw`w-20 h-20`} />
                    </Pressable>
                </Link>

                {isLoading && <ActivityIndicator size="large" />}

                {!isLoading &&
                    <View style={tw`flex-1 relative`}>
                        <Image style={tw`w-40 h-40 mx-auto`} source={unhcr} />

                        <CustomText style={tw`mt-5 font-bold text-2xl text-center ${CustomStyles.text_primary}`}>
                            {organization?.firstName || 'Organization Name'}
                        </CustomText>
                        <View style={tw`mx-5 mt-10`}>
                            <CustomText style={tw`font-bold text-xl`}>About</CustomText>
                            <CustomText style={tw`font-semibold text-base`}>
                                {renderText()}
                            </CustomText>
                            {organization?.about && organization.about.length > 350 && (
                                <Pressable onPress={handleToggleExpand}>
                                    <CustomText style={tw`mt-3 text-base text-right ${CustomStyles.text_primary}`}>
                                        {isExpanded ? 'Read Less' : 'Read More'}
                                    </CustomText>
                                </Pressable>
                            )}
                        </View>

                        {/* <View style={tw`mx-5 rounded-lg border border-blue-500 p-5 bg-[#EBF4FF]`}>
                        <Progress.Bar progress={0.55} width={300} height={8} />
                        <View style={tw`mt-2 flex-row justify-between`}>
                            <CustomText style={tw`text-gray-500 font-bold`}>$25,000</CustomText>
                            <CustomText style={tw`text-gray-500 font-bold`}>861</CustomText>
                            <CustomText style={tw`text-gray-500 font-bold`}>$50,000</CustomText>
                        </View>

                        <View style={tw`flex-row justify-between`}>
                            <CustomText style={tw`text-gray-500 font-bold`}>Raised</CustomText>
                            <CustomText style={tw`text-gray-500 font-bold`}>Donations</CustomText>
                            <CustomText style={tw`text-gray-500 font-bold`}>Goal</CustomText>
                        </View>
                    </View> */}

                        {/* <View style={tw`flex-row justify-between mx-5 mt-10`}>
                        <CustomText style={tw`font-bold text-lg`}>Participant</CustomText>
                        <Pressable>
                            <CustomText style={tw`font-bold text-lg ${CustomStyles.text_primary}`}>See All</CustomText>
                        </Pressable>
                    </View> */}

                        {/* <View style={tw`flex-row mx-5 relative mb-18`}>
                        <Image style={tw`absolute border-[6px] border-white rounded-full`} source={person} />
                        <Image style={tw`absolute left-10 z-99 border-[6px] border-white rounded-full`} source={person2} />
                        <Image style={tw`absolute left-20 z-999  border-[6px] border-white rounded-full`} source={person} />
                        <Image style={tw`absolute left-30 z-9999 border-[6px] border-white rounded-full`} source={person2} />
                        <View style={tw`bg-[#0058CA] w-18 h-18 rounded-full absolute left-40 z-9999  border-[6px] border-white rounded-full`}>
                            <CustomText style={tw`font-bold  text-base text-white mx-auto my-auto`}>10+</CustomText>
                        </View>
                    </View> */}

                        <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`mx-10 mt-35 mb-5 px-25 py-3 ${CustomStyles.btn}`}>
                            <CustomText style={tw`text-white font-bold text-lg`}>Donate now</CustomText>
                        </TouchableOpacity>

                        <View style={styles.container}>
                            <Modal
                                animationType='slide'
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(!modalVisible)}
                            >
                                <View style={styles.modalBackground}>
                                    <View style={styles.modalContainer}>
                                        <View style={styles.modalContent}>
                                            <CustomText style={tw`text-white font-bold text-xl text-center mt-20 ${CustomStyles.text_primary}`}>
                                                How much do you want to donate?
                                            </CustomText>

                                            <View style={tw`mt-10 mx-5 gap-4`}>
                                                <Card style={[tw``, senderAmount === 50 && styles.selectedCard]}>
                                                    <Pressable onPress={() => handlePredefinedAmount(50)}>
                                                        <CustomText style={[tw`font-extrabold text-2xl text-center p-4`, senderAmount === 50 ? tw`text-white` : '']}>{getSymbolByCountryCode(senderCountry)} 50</CustomText>
                                                    </Pressable>
                                                </Card>

                                                <Card style={[tw``, senderAmount === 100 && styles.selectedCard]}>
                                                    <Pressable onPress={() => handlePredefinedAmount(100)}>
                                                        <CustomText style={[tw`font-extrabold text-2xl text-center p-4`, senderAmount === 100 ? tw`text-white` : '']}>{getSymbolByCountryCode(senderCountry)} 100</CustomText>
                                                    </Pressable>
                                                </Card>

                                                <Card style={[tw``, senderAmount === 200 && styles.selectedCard]}>
                                                    <Pressable onPress={() => handlePredefinedAmount(200)}>
                                                        <CustomText style={[tw`font-extrabold text-2xl text-center p-4`, senderAmount === 200 ? tw`text-white` : '']}>{getSymbolByCountryCode(senderCountry)} 200</CustomText>
                                                    </Pressable>
                                                </Card>
                                            </View>

                                            <View style={tw`flex-row my-5 items-center mx-10`}>
                                                <View style={tw`bg-black grow h-0.3`} />
                                                <CustomText style={tw`mx-3`}>OR</CustomText>
                                                <View style={tw`bg-black grow h-0.3`} />
                                            </View>

                                            <Card style={tw`mx-5`}>
                                                <TextInput
                                                    style={tw`font-extrabold text-2xl text-center p-4`}
                                                    placeholder="Enter custom amount"
                                                    keyboardType="numeric"
                                                    value={customAmount}
                                                    onChangeText={(text) => handleCustomAmount(text)}
                                                />
                                            </Card>

                                            <Pressable onPress={handleDonate} style={tw`${CustomStyles.btn} mx-10 px-30 py-4 mt-10`}>
                                                {donating ? (
                                                    <ActivityIndicator size="small" color="#ffffff" />
                                                ) : (
                                                    <CustomText style={tw`text-white font-bold text-lg`}>
                                                        Donate
                                                    </CustomText>
                                                )}
                                            </Pressable>

                                            {/* Close modal button */}
                                            <Pressable
                                                style={styles.closeButton}
                                                onPress={() => setModalVisible(false)}
                                            >
                                                <Image source={Close} style={tw`w-15 ml-[-5] h-15`} />
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                }
            </View>
        </ScrollView>

    );
};

export default DonationToCharity;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#ffff',
        borderRadius: 25,
        width: '100%',
        height: '90%',
        marginTop: 120
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    selectedCard: {
        backgroundColor: '#0039a6',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
