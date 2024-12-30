import React, { useState } from 'react';
import { View, Pressable, TouchableOpacity, StyleSheet, Modal, Dimensions, Image, ScrollView } from "react-native";
import previous from '../../assets/images/previous.png';
import arrowblack from '../../assets/images/arrowblack.png';
import activities from '../../assets/images/activities.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import outlook from '../../assets/images/Outlook.png'
import Gmail from '../../assets/images/Gmail.png'
import Paypal from '../../assets/images/Paypal (1).png'
import { Card } from 'react-native-shadow-cards';
import Close from '../../assets/images/Close.png'
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';

const { width, height } = Dimensions.get('window');

const Account = () => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View style={{ height }}>

        <ScrollView>

            <Link href="/SetBalance">
                <Pressable >
                    <Image
                        source={previous} style={tw` w-20 h-20 ml-5 `}
                    />
                </Pressable>
            </Link>

            <View style={tw`mx-10`}>
                <CustomText style={tw`font-bold text-9`}>Abdi Ahmed</CustomText>
                <CustomText style={tw`font-medium text-sm `}>You have sent $6869 this month. Your monthly limit will reset in 15 days.
                    <Link style={tw`text-[${primary_color}] border-b border-blue-700 pb-2`} href="../">
                        what’s this?
                    </Link> </CustomText>
            </View>



            <View style={tw`gap-2 pt-4 mx-auto`}>
                <Card style={tw`pl-4 py-3 pr-4`}>
                    <View style={tw`flex-row`}>
                        <Image style={tw`h-4 w-6`} source={activities} />
                        <CustomText style={tw`font-semibold text-lg ml-8`}>All Activities</CustomText>
                    </View>
                </Card>

                <Card style={tw`pl-4 py-3 pr-4`}>
                    <View >
                        <CustomText style={tw`font-semibold text-sm`}>Settings</CustomText>

                        <View style={tw`flex-row justify-between border-b border-blue-700 pb-2 ${CustomStyles.border_primrary}`}>
                            <Link href="/PersonaLInformation" style={tw`font-bold text-sm mt-2`}>Personal Informations</Link>

                            <Link href="/PersonaLInformation" asChild>
                                <Pressable>
                                    <View>
                                        <Image style={tw`h-3 w-2 mt-3 `} source={arrowblack} />
                                    </View>
                                </Pressable>
                            </Link>
                        </View>

                        <View style={tw`flex-row justify-between pt-3 `}>
                            <Link href="/Language" style={tw`font-bold text-sm `}>Language</Link>
                            <View style={tw`flex-row `}>
                                <CustomText style={tw`mr-8 text-xs`}>English</CustomText>
                                <Link href="/Language" asChild>
                                    <Pressable>
                                        <View>
                                            <Image style={tw`h-3 w-2 mt-3 my-auto `} source={arrowblack} />
                                        </View>
                                    </Pressable>
                                </Link>
                            </View>
                        </View>
                    </View>
                </Card>

                <Card style={tw`pl-4 py-3 pr-4`}>
                    <View >
                        <CustomText style={tw`font-semibold text-sm`}>Support</CustomText>

                        <View style={tw`flex-row justify-between border-b border-blue-700 pb-2 ${CustomStyles.border_primrary}`}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}>
                                <CustomText style={tw`font-bold text-sm `}>Email Us</CustomText>
                            </TouchableOpacity>
                            <Image style={tw`h-3 w-2`} source={arrowblack} />
                        </View>


                        <View style={styles.container}>
                            <Modal
                                animationType='slide'
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(!modalVisible)}
                            >

                                <View style={styles.modalBackground} >
                                    <View style={styles.modalContainer}>
                                        <View style={styles.modalContent}>
                                            <CustomText style={tw`text-black font-bold text-2xl `}>Email Us</CustomText>
                                            <View style={tw`flex-row`} >
                                                <Image source={outlook} style={tw` w-15 h-15 mt-5 `} />
                                                <Image source={Gmail} style={tw` w-15 h-15 ml-8 mt-5 `} />
                                                <Image source={Paypal} style={tw` w-15 h-15 ml-8 mt-5 `} />

                                            </View>

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
                                </View>

                            </Modal>
                        </View>

                        <View style={tw`flex-row justify-between pt-3 `}>
                            <CustomText style={tw`font-bold text-sm `}>Help Center</CustomText>
                            <View style={tw`flex-row `}>
                                <Image style={tw`h-3 w-2`} source={arrowblack} />
                            </View>
                        </View>

                    </View>
                </Card>

                <Card style={tw`pl-4 py-3 pr-4`}>
                    <View >
                        <CustomText style={tw`font-semibold text-sm`}>Get to Know us</CustomText>

                        <View style={tw`flex-row justify-between border-b border-blue-700 pb-2 ${CustomStyles.border_primrary}`}>
                            <Link href="/AboutMoneyTransfer" style={tw`font-bold text-sm `}>About Us</Link>
                            <Link href="/AboutMoneyTransfer" asChild>
                                <Pressable>
                                    <View>
                                        <Image style={tw`h-3 w-2 mt-3 `} source={arrowblack} />
                                    </View>
                                </Pressable>
                            </Link>
                        </View>

                        <View style={tw`flex-row justify-between pt-3 `}>
                            <CustomText style={tw`font-bold text-sm `}>Connect with us</CustomText>
                            <View style={tw`flex-row `}>
                                <Image style={tw`h-3 w-2  `} source={arrowblack} />
                            </View>
                        </View>

                    </View>
                </Card>

                <Card style={tw`pl-4 py-3 pr-4`}>
                    <View >
                        <CustomText style={tw`font-semibold text-sm`}>Legal</CustomText>

                        <View style={tw`flex-row justify-between border-b border-blue-700 pb-2 ${CustomStyles.border_primrary}`}>
                            <Link href="/TermsAndConditions" style={tw`font-bold text-sm `}>Terms and Conditions</Link>
                            <Link href="/TermsAndConditions" asChild>
                                <Pressable>
                                    <View>
                                        <Image style={tw`h-3 w-2  mt-3 `} source={arrowblack} />
                                    </View>
                                </Pressable>
                            </Link>
                        </View>

                        <View style={tw`flex-row justify-between pt-3 border-b border-blue-700 pb-2 ${CustomStyles.border_primrary} `}>
                            <CustomText style={tw`font-bold text-sm `}>Privacy Policy</CustomText>
                            <View style={tw`flex-row `}>
                                <Image style={tw`h-3 w-2  `} source={arrowblack} />
                            </View>
                        </View>

                        <View style={tw`flex-row justify-between pt-3 border-b border-blue-700 pb-2 ${CustomStyles.border_primrary} `}>
                            <CustomText style={tw`font-bold text-sm `}>Intergiro Term and Conditions</CustomText>
                            <View style={tw`flex-row `}>
                                <Image style={tw`h-3 w-2  `} source={arrowblack} />
                            </View>
                        </View>

                        <View style={tw`flex-row justify-between pt-3 `}>
                            <CustomText style={tw`font-bold text-sm `}>IntergiroPrivacy Policy</CustomText>
                            <View style={tw`flex-row `}>
                                <Image style={tw`h-3 w-2  `} source={arrowblack} />
                            </View>
                        </View>

                    </View>
                </Card>

                <Link href="/Onboarding" asChild style={[tw`${CustomStyles.btnlight} p-3 mt-7 mb-30`]} >
                <Pressable  >

                    <CustomText style={tw`text-[${primary_color}] font-bold text-lg`}>Log Out</CustomText>
                </Pressable>
            </Link>

            </View>
        </ScrollView>
        </View>

    )

}
export default Account;


const styles = StyleSheet.create({


    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 40,
        width: '100%',
        height: '35%',
        marginVertical: -20

    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});