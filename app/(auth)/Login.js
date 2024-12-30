import React, { useState } from "react";
import { View, Pressable, ImageBackground, Image, Dimensions, TouchableOpacity, StyleSheet, Modal, ScrollView } from "react-native";
import background from '../../assets/images/background.png';
import Close from '../../assets/images/Close.png'
import tw from 'twrnc';
import { Link } from "expo-router";
import { CheckBox } from '@rneui/themed';
import CustomText from "../../components/CustomText";
import { useTranslation } from 'react-i18next';


const { width, height } = Dimensions.get('screen');

const Login = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [bankIds, setBankIds] = useState([]);
    const { t } = useTranslation();


    function changeUser(index) {
        setModalVisible(false)
    }

    return (
        <ImageBackground source={background} style={{ alignContent: 'center', alignItems: 'center', height, width, position: 'absolute' }} resizeMode="cover">
            <CustomText style={tw`w-70 mx-auto mt-30 text-center text-6xl font-bold`}>
                {t("Screens.Login.text")}
            </CustomText>

            <View style={tw`absolute bottom-20`}>
                <View style={tw`w-80 mx-auto gap-4`}>

                    {/* <Pressable
                        disabled={loading}
                        onPress={() => handleLogin()}
                        style={tw`bg-[${primary_color}] ${loading ? 'opacity-60' : ''} p-1 rounded-full items-center`}
                    >
                        <View style={tw`flex-row items-center gap-3`}>
                            {loading && <ActivityIndicator color="#fff" size="large"></ActivityIndicator>}
                            {!loading &&
                                <>
                                    <Image source={bankid} />
                                    <CustomText style={tw`text-white font-bold text-lg`}>Login test******* {getSelectedBankId()}</CustomText>
                                </>
                            }
                        </View>
                    </Pressable> */}

                    {/* {bankIds.length > 0 &&
                    <Pressable style={tw`${CustomStyles.btn_secondary} bg-blue-100`} onPress={() => setModalVisible(true)} >
                        <CustomText style={tw`${CustomStyles.text_primary} font-bold text-lg my-3`}>Change User</CustomText>
                    </Pressable>
                    } */}

                    <Link href="/loginuser" asChild>
                        <Pressable style={tw`${CustomStyles.btn_secondary} bg-blue-100`} >
                            <CustomText style={tw`${CustomStyles.text_primary} font-bold text-lg my-3`}>{t("Screens.Login.btnLogin")}</CustomText>
                        </Pressable>
                    </Link>

                    <Link href="/register" style={tw`text-center text-blue-700 font-bold mt-1`}>{t("Screens.Login.textDon't")}</Link>

                    <View style={styles.container}>
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(!modalVisible)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <CustomText style={tw`text-center font-bold text-3xl mt-10`}>Select User</CustomText>
                                    <ScrollView style={tw`mb-5`}>
                                        {bankIds.map((bank_id, index) => (
                                            <Pressable onPress={() => changeUser(index)} key={index} style={tw`flex-row justify-between ${index + 1 != bankIds.length ? 'border-b' : ''} border-gray-300`}>
                                                <CustomText style={tw`font-bold my-auto ml-4`}>{bank_id}</CustomText>
                                                <CheckBox
                                                    onPress={() => changeUser(index)}
                                                    checked={index == selectedPhoneNumber}
                                                    iconType="material-community"
                                                    checkedIcon="radiobox-marked"
                                                    uncheckedIcon="radiobox-blank"
                                                />
                                            </Pressable>
                                        ))}
                                    </ScrollView>

                                    <Link href="/loginuser" style={tw`mb-5`} asChild>
                                        <TouchableOpacity style={tw`${CustomStyles.btn_secondary} bg-blue-100`}>
                                            <CustomText style={tw`${CustomStyles.text_primary} font-bold text-lg my-3`}>New User</CustomText>
                                        </TouchableOpacity>
                                    </Link>

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
                </View>
            </View>
        </ImageBackground>
    );
};
export default Login;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#ffff',
        borderTopEndRadius: 25,
        borderTopLeftRadius: 25,
        padding: 20,
        width: '100%',
        height: '60%',
        bottom: 0,
        position: 'absolute',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});