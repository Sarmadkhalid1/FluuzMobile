import React, { useState, useEffect } from 'react';
import { View, Pressable, Image, TextInput, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from "react-native";
import previous from '../../assets/images/previous.png';
import tw from 'twrnc';
import { Link, router } from "expo-router";
import CustomText from '../../components/CustomText';
import { getSenderRequiredFields } from "../../services/RaypdService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomStyles from '../../constants/styles'
import { timestampWithOffsetToDate } from '../../services/Helper';

const PayoutMethodReqFields = () => {
    const [list, setList] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getState();
    }, [])

    async function getState() {
        try {
            const PayoutMethodReqFields = JSON.parse(await AsyncStorage.getItem('PayoutMethodReqFields'));
            let res = await getSenderRequiredFields(data);
            console.log(res.data);
            setList(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    function extractNumber(string) {
        var pattern = /\b0*\d+(?:\.\d+)?\b/g;
        var matches = string.match(pattern)
        var extractedNumber = matches.join('');
        extractedNumber = parseFloat(extractedNumber);
        return extractedNumber;
    }

    function handleInputChange(value, field, index) {
        try {
            let rgx = new RegExp(field.regex);

            if (field.type == 'date') {
                let date = timestampWithOffsetToDate(value.nativeEvent.timestamp, value.nativeEvent.utcOffset)
                value = date;
                hideDate(index)
            }

            if (!rgx.test(value)) {
                showError(index);
                return;
            }
            hideError(index)

            let localList = [...data]
            let exist = localList.findIndex(f => f.name == field.name);

            if (exist >= 0) {
                localList[exist].value = value;
            } else {
                localList.push({
                    name: field.name,
                    value: value
                })
            }

            setData(localList);

        } catch (error) {
            console.log(error)
        }
    };

    const hideDate = (index) => {
        const localList = [...list];
        localList[index].show_date = false;
        setList(localList)
    }

    const showError = (index) => {
        const localList = [...list];
        localList[index].error = true;
        setList(localList)
    }

    const hideError = (index) => {
        const localList = [...list];
        localList[index].error = false;
        setList(localList)
    }

    function setShowDate(field, index) {
        const lst = [...list];
        field.show_date = true;
        lst[index] = field;
        setList(lst);
    }

    const getValueByFieldName = (name) => {
        const item = data.find(f => f.name == name);
        if (item) {
            return item.value
        }
        return ""
    }

    const verify = () => {
        const item = data.find(f => f.error)
        if (data.length != list.length || item) {
            return true
        }
        return false
    }

    const handleSubmit = () => {
        AsyncStorage.setItem('senderinfo', JSON.stringify(data), () => {
            router.push('/HowDoYouWantToPay');
        })
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={tw`flex-row items-center justify-between`}>
                            <Link href="/HowDoYouWantToPay" asChild>
                                <Pressable >
                                    <Image
                                        source={previous} style={tw`w-20 h-20 ml-5 `}
                                    />
                                </Pressable>
                            </Link>
                        </View>

                        <View style={tw`mx-10`}>
                            <CustomText style={tw`font-bold text-7 `}>Please provide more information about yourself.</CustomText>

                            <View style={tw`gap-3 mt-3`}>

                                {list.map((field, index) => (
                                    <View key={index} style={tw`gap-1`}>
                                        <CustomText style={tw`font-bold text-xs mt-1 capitalize`}>{field.name.replace(/_/g, " ")}</CustomText>
                                        {!field.type &&
                                            <>
                                                <TextInput onChangeText={(value) => handleInputChange(value, field, index)} style={tw`${CustomStyles.input_field}border-blue-500 text-black`} placeholderTextColor="#0058CA66" placeholder={field.name.toLowerCase().includes('country') ? "Enter ISO 3166 alpha-2 country code" : ""} />
                                                {field.error &&
                                                    <CustomText style={tw`text-red-500`}>Invalid value</CustomText>
                                                }
                                            </>}

                                        {field.type && field.type == "date" &&
                                            <>
                                                <TextInput onFocus={() => setShowDate(field, index)} showSoftInputOnFocus={false} value={getValueByFieldName(field.name)} style={tw`${CustomStyles.input_field}border-blue-500 text-black`} placeholder='DD/MM/YYYY*' placeholderTextColor="#0058CA66" />
                                                {/* {field.show_date && <DateTimePicker
                                                    style={tw`border-4`}
                                                    value={new Date()}
                                                    mode={'date'}
                                                    onD
                                                    onChange={(value) => handleInputChange(value, field, index)}
                                                />} */}

                                                {field.error &&
                                                    <CustomText style={tw`text-red-500`}>Invalid value</CustomText>
                                                }
                                            </>
                                        }
                                    </View>
                                ))}
                            </View>

                            <Pressable
                                disabled={verify()}
                                onPress={handleSubmit}
                                style={tw`${CustomStyles.btn} ${verify() ? ' opacity-60 ' : ""} mt-10 mb-5`}
                            >
                                <View style={tw`flex-row items-center gap-3`}>
                                    <CustomText style={tw`text-white font-bold text-lg py-3`}>Save</CustomText>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
export default PayoutMethodReqFields;