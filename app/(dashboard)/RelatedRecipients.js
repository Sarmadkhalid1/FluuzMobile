import React, { useState } from 'react';
import { View, Pressable, Modal, Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import previoustest from '../../assets/images/previous.png';
import Close from '../../assets/images/Close.png'
import setting from '../../assets/images/setting.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import padlock from '../../assets/images/padlock.png';
import { CheckBox } from '@rneui/themed';
import { Card } from 'react-native-shadow-cards';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';
import { useTranslation } from 'react-i18next';


const { height } = Dimensions.get('window');

const RelatedRecipients = () => {
    const [disbaled, setDisabled] = useState(true);
    const [selectedIndex, setIndex] = useState();
    const { t } = useTranslation();

    const handleCheckboxPress = (index) => {
        setIndex(index);

        // Update disabled state based on the selected index
        setDisabled(index === -1);
    };
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <View>
            <ScrollView>
                <View style={tw`mx-10`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Link href="/SavedRecipients" asChild>
                            <Pressable >
                                <Image
                                    source={previoustest} style={tw`w-15 ml-[-5] h-15 `}
                                />
                            </Pressable>
                        </Link>

                        <Link href="/Account" asChild>
                            <Pressable >
                                <Image
                                    source={setting} style={tw`w-7 h-7 `}
                                />
                            </Pressable>
                        </Link>
                    </View>

                    <View>
                        <CustomText style={tw`font-bold text-7`}>{t("Screens.RelatedRecipients.text")}</CustomText>
                        <CustomText style={tw`font-semibold text-5 mt-1`}>{t("Screens.RelatedRecipients.textChoose")}</CustomText>
                        <CustomText style={tw`text-[${primary_color}] font-semibold text-xs mt-2`}>{t("Screens.RelatedRecipients.textLearn")}</CustomText>
                    </View>

                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>{t("Screens.RelatedRecipients.textPartner")}</CustomText>
                                <CustomText style={tw`font-medium text-sm `}>{t("Screens.RelatedRecipients.textMother")}</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 0}
                                onPress={() => handleCheckboxPress(0)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>{t("Screens.RelatedRecipients.textSpouse")}</CustomText>
                                <CustomText style={tw`font-medium text-sm `}>{t("Screens.RelatedRecipients.textWife")}</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 1}
                                onPress={() => handleCheckboxPress(1)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>{t("Screens.RelatedRecipients.textSibling")}</CustomText>
                                <CustomText style={tw`font-medium text-sm `}>{t("Screens.RelatedRecipients.textSister")}</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 2}
                                onPress={() => handleCheckboxPress(2)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>{t("Screens.RelatedRecipients.textChild")}</CustomText>
                                <CustomText style={tw`font-medium text-sm `}>{t("Screens.RelatedRecipients.textDaughter")}</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 3}
                                onPress={() => handleCheckboxPress(3)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>{t("Screens.RelatedRecipients.textFamily")}</CustomText>
                                <CustomText style={tw`font-medium text-sm `}>{t("Screens.RelatedRecipients.textAunt")}</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 4}
                                onPress={() => handleCheckboxPress(4)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>{t("Screens.RelatedRecipients.textFriend")}</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 5}
                                onPress={() => handleCheckboxPress(5)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>{t("Screens.RelatedRecipients.textI")}</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 6}
                                onPress={() => handleCheckboxPress(6)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>{t("Screens.RelatedRecipients.textOther")}</CustomText>
                                <CustomText style={tw`font-medium text-sm `}>{t("Screens.RelatedRecipients.textPlease")}</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 7}
                                onPress={() => handleCheckboxPress(7)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <TouchableOpacity
                    onPress={() => setModalVisible(true)}>
                    <CustomText style={tw`mt-7 text-[${primary_color}] font-normal mx-10`}>{t("Screens.RelatedRecipients.textIs")}</CustomText>
                </TouchableOpacity>
                <View style={styles.container}>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(!modalVisible)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <CustomText style={tw`text-white font-bold text-2xl mt-5`}>{t("Screens.RelatedRecipients.textIs")}</CustomText>
                                <CustomText style={tw`text-white text-base mt-8`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CustomText>
                                <CustomText style={tw`text-white text-base mt-8`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</CustomText>
                                <CustomText style={tw`text-yellow-300 text-base mt-8`}>{t("Screens.RelatedRecipients.textAny")}</CustomText>

                                <Pressable
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Image
                                        source={Close} style={tw`w-15 ml-[-5] h-15 `}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>



                <Pressable
                    style={tw`${CustomStyles.btn} ${disbaled ? 'bg-[#0058CA99]' : ''} mx-10 mt-13`}
                    disabled={disbaled}
                >
                    <View style={tw`flex-row items-center gap-3`}>
                        <Link href="/register" style={tw`text-white font-bold text-lg py-3 `}>{t("Screens.RelatedRecipients.textNext")}</Link>
                    </View>
                </Pressable>

                <View style={tw`flex-row mx-10 mt-18 mb-10`}>
                    <Image style={tw`h-5 w-5 mr-3`} source={padlock} />
                    <CustomText style={tw`font-semibold `}>{t("Screens.RelatedRecipients.textOption")}</CustomText>
                </View>

            </ScrollView >
        </View >
    )
}
export default RelatedRecipients;

const styles = StyleSheet.create({


    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#0058CA',
        borderRadius: 25,
        padding: 50,
        width: '100%',
        height: '90%',
        marginTop: 120
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});