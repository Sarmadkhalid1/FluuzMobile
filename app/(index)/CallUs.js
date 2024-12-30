import React, { useState, useRef } from "react";
import { View, TextInput, Pressable, ImageBackground, Image, Dimensions, Modal, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import previoustest from '../../assets/images/previous.png';
import swipedownblack from '../../assets/images/swipedownblack.png';
import Close from '../../assets/images/Close.png'
import { CheckBox } from '@rneui/themed';
import { primary_color } from '../../constants/styles';
import tw from 'twrnc';
import { Card } from "react-native-shadow-cards";
const { width, height } = Dimensions.get('screen');
import { Link, } from "expo-router";
import background from '../../assets/images/callus.png';
import Input from '../../components/TextInput'
import PhoneInput from "react-native-phone-number-input";
import CustomText from "../../components/CustomText";

const countries = [
    { name: 'albania', code: 'al' },
    { name: 'argentina', code: 'ar' },
    { name: 'austria', code: 'at' },
    { name: 'canada', code: 'ca' },
    { name: 'china', code: 'cn' },
    { name: 'denmark', code: 'dk' },
    { name: 'egypt', code: 'eg' },
    { name: 'pakistan', code: 'pk' },
];

const groupCountriesByLetter = () => {
    const groupedCountries = {};
    countries.forEach(country => {
        const firstLetter = country.name.charAt(0).toUpperCase();
        if (!groupedCountries[firstLetter]) {
            groupedCountries[firstLetter] = [];
        }
        groupedCountries[firstLetter].push(country);
    });
    return groupedCountries;
};

const CallUs = () => {
    const [modalVisible, setModalVisible] = useState(false)

    const groupedCountries = groupCountriesByLetter();
    const phoneInput = useRef(null);
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);

    const handlePhoneInputChange = (text) => {
        setValue(text);
        const isValid = phoneInput.current?.isValidNumber(text);
        setValid(isValid);
    };

    const [valid1, setValid1] = useState(false)

    function handleEmail(text) {
        setValid1(validator.isEmail(text));
    }

    const [selectedIndex, setIndex] = React.useState(0);
    return (

        <View style={[{ height, width }, tw` `]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={tw`flex-row items-center justify-between`}>
                    <Link href="/RelatedRecipients" asChild>
                        <Pressable >
                            <Image
                                source={previoustest} style={tw`w-15 h-15 `}
                            />
                        </Pressable>
                    </Link>

                </View>

                <ImageBackground source={background} style={{ alignContent: 'center', alignItems: 'center', height: '5', width, marginTop: 90, position: 'absolute' }} resizeMode="cover">
                    <CustomText style={tw`mx-10 mt-30 text-center text-white text-4xl mb-20 font-bold`}>
                        Need help? We’re there for you
                    </CustomText>
                </ImageBackground>

                <View>
                    <CustomText style={tw`font-bold text-7 mx-35 mt-90 items-center`}>Call Us</CustomText>
                </View>

                <View style={tw`gap-3 mx-1 mt-5 `}>
                    {Object.keys(groupedCountries).map((letter, index) => (
                        <View key={index}>
                            {groupedCountries[letter].map((country, countryIndex) => (
                                <Card key={countryIndex} style={tw`flex-row p-2 mb-2 shadow-blue-500 mx-auto`}>
                                    <Image style={tw`h-7 w-10 ml-2 mr-4`} source={{ uri: `https://flagcdn.com/w2560/${country.code}.png` }} />
                                    <CustomText style={tw`font-semibold capitalize`}>{country.name}</CustomText>
                                </Card>
                            ))}
                        </View>
                    ))}
                </View>

                <CustomText style={tw`font-bold text-7 mt-10 mx-auto  items-center`}>Email Us</CustomText>
                <CustomText style={tw`font-bold text-4 ml-5 mt-5  items-center`}>Your Personal Information</CustomText>

                <View style={tw`mt-5 gap-1 mx-auto mb-20`}>

                    <View style={tw`gap-1  `}>
                        <CustomText style={tw`font-medium text-sm mt-1`}>Your Name</CustomText>
                        <Input placeholder={"Lorem Ipsum"}></Input>
                    </View>

                    <View style={tw`gap-1`}>

                        <CustomText style={tw`font-medium text-sm mt-1`}>Email Address</CustomText>

                        <View>
                            <TextInput style={tw`bg-[#EBF4FF] rounded-md border border-[#0058CA4D] p-3.5 `} placeholderTextColor="#0058CA66" onChangeText={handleEmail} placeholder="Enter your email"></TextInput>
                        </View>

                        {!valid1 && <CustomText style={tw`mt-2 text-red-500`}   >Please enter a valid Email Address</CustomText>}
                    </View>

                    <View style={tw`gap-1`} >
                        <CustomText style={tw`font-medium text-sm mt-1`}>Phone Number</CustomText>

                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="SE"
                            layout="first"
                            onChangeText={handlePhoneInputChange}
                            textContainerStyle={{
                                backgroundColor: '#EBF4FF'
                            }}
                            containerStyle={{
                                backgroundColor: '#EBF4FF',
                                borderWidth: 1,
                                borderColor: '#0058CA4D',
                                borderRadius: 4,
                                height: 58,
                            }}
                        />
                        {!valid && <CustomText style={tw`mt-2 text-red-500`}>Please enter a valid phone number.</CustomText>}
                    </View>

                    <View style={tw`mt-8 mb-15`}>
                        <CustomText style={tw`font-bold text-lg`}>Support Type</CustomText>
                        <TouchableOpacity style={tw`flex-row justify-between mt-5`}
                            onPress={() => setModalVisible(true)}>
                            <CustomText style={tw`font-bold text-base `}>Select Support Type</CustomText>
                            <Image style={tw`h-2.3 w-3.5 mr-2 my-auto`} source={swipedownblack} />
                        </TouchableOpacity>
                        <CustomText style={tw`bg-blue-500 h-0.3 mt-2 `}></CustomText>

                        <CustomText style={tw`font-bold text-lg  mt-5`}>Subject</CustomText>
                        <TouchableOpacity style={tw`flex-row justify-between`}>
                            <CustomText style={tw`font-bold text-base mt-5 `}>Subject</CustomText>
                            <Image style={tw`h-2.3 w-3.5 mr-2 my-auto`} source={swipedownblack} />
                        </TouchableOpacity>
                        <CustomText style={tw`bg-blue-500 h-0.3 mt-2 `}></CustomText>

                        <CustomText style={tw`font-bold text-lg mt-5`}>Description</CustomText>
                        <TextInput style={tw`text-base font-semibold mt-5`} placeholder="Please write your message here" placeholderTextColor="#000000"></TextInput>
                        <CustomText style={tw`bg-blue-500 h-0.3 mt-2 `}></CustomText>
                    </View>

                    <Pressable style={tw`bg-[${primary_color}] w-45 rounded-full items-center mx-auto mt-5 py-3 `}>
                        <CustomText style={tw`text-white font-bold text-lg`}>Send message</CustomText>
                    </Pressable>

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
                                        <View style={tw`flex-row justify-between`} >
                                            <CustomText style={tw`font-bold my-auto ml-3`}>Select Support Type</CustomText>
                                            <CheckBox
                                                checked={selectedIndex === 0}
                                                onPress={() => setIndex(0)}
                                                iconType="material-community"
                                                checkedIcon="radiobox-marked"
                                                uncheckedIcon="radiobox-blank"
                                            />
                                        </View>
                                        <View style={{ borderWidth: 0.5, borderColor: 'blue' }} />

                                        <View style={tw`flex-row justify-between `} >
                                            <CustomText style={tw`font-bold my-auto ml-3`}>Services</CustomText>
                                            <CheckBox
                                                checked={selectedIndex === 1}
                                                onPress={() => setIndex(1)}
                                                iconType="material-community"
                                                checkedIcon="radiobox-marked"
                                                uncheckedIcon="radiobox-blank"
                                            />
                                        </View>
                                        <View style={{ borderWidth: 0.5, borderColor: 'blue' }} />

                                        <View style={tw`flex-row justify-between `} >
                                            <CustomText style={tw`font-bold my-auto ml-3`}>Account</CustomText>
                                            <CheckBox
                                                checked={selectedIndex === 2}
                                                onPress={() => setIndex(2)}
                                                iconType="material-community"
                                                checkedIcon="radiobox-marked"
                                                uncheckedIcon="radiobox-blank"
                                            />
                                        </View>
                                        <View style={{ borderWidth: 0.5, borderColor: 'blue' }} />

                                        <View style={tw`flex-row justify-between `} >
                                            <CustomText style={tw`font-bold my-auto ml-3`}>Payment</CustomText>
                                            <CheckBox
                                                checked={selectedIndex === 3}
                                                onPress={() => setIndex(3)}
                                                iconType="material-community"
                                                checkedIcon="radiobox-marked"
                                                uncheckedIcon="radiobox-blank"
                                            />
                                        </View>
                                        <View style={{ borderWidth: 0.5, borderColor: 'blue' }} />

                                        <View style={tw`flex-row justify-between `} >
                                            <CustomText style={tw`font-bold my-auto ml-3`}>Others</CustomText>
                                            <CheckBox
                                                checked={selectedIndex === 4}
                                                onPress={() => setIndex(4)}
                                                iconType="material-community"
                                                checkedIcon="radiobox-marked"
                                                uncheckedIcon="radiobox-blank"
                                            />
                                        </View>

                                        <Pressable
                                            style={styles.closeButton}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Image
                                                source={Close} style={tw`w-15 h-15s`}
                                            />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                        </Modal>
                    </View>
                </View>
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 100
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        // padding: 10,
        width: '90%',
        height: '38%',
        // marginVertical: 40
    },
    closeButton: {
        position: 'absolute',
        right: -10,
        top: -60
    },
});
export default CallUs;