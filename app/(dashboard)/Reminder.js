import { View, Image, TouchableOpacity, Pressable, ScrollView } from "react-native";
import { Link, } from "expo-router";
import React, { useState } from 'react';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles'
import { StyleSheet } from 'react-native';
import previous from '../../assets/images/previous.png';
import { Card } from 'react-native-shadow-cards';
import { CheckBox } from '@rneui/themed';
import CustomText from '../../components/CustomText';

export default function Reminder() {

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selectedIndex, setIndex] = useState(0);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <ScrollView>
            <View style={tw`w-80 mx-auto`}>
                <View style={tw`flex-row items-center justify-between mt-5`} >
                    <Link href="/MoneySent" asChild>
                        <Pressable>
                            <Image
                                source={previous}
                                style={tw`w-15 ml-[-10] h-15`} />
                        </Pressable>
                    </Link>


                    <Image
                        source={require('../../assets/images/delete.png')}
                        style={
                            tw`w-5 h-5 `
                        }
                    />
                </View>
                <CustomText style={tw`font-extrabold text-4xl mt-2`}>Schedule transfer reminder for Abdi</CustomText>
                <CustomText style={tw`mt-5 w-70 font-semibold text-base `} >Select Date and time</CustomText>

                <View >
                    {/* {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )} */}
                </View>
                <Card
                    style={{ width: '100%', height: '8%', alignItems: 'start', justifyContent: 'center', marginTop: 20, }}>
                    <TouchableOpacity style={[tw`flex-row p-4 gap-4  `, styles]} onPress={showDatepicker}>
                        <Image source={require('../../assets/images/clander1.png')}
                            style={tw`w-10 h-10 `} />

                        <CustomText style={tw` mt-3 `} >
                            {date.toLocaleTimeString()} {date.toLocaleDateString()}
                        </CustomText>
                    </TouchableOpacity>
                </Card>
                <CustomText style={tw` mt-5 w-70 font-semibold text-base `} >Select schedule frequency</CustomText>

                <View style={tw`gap-4 mt-2`}>
                    <View style={tw`flex-row items-start border-b pb-5 border-blue-700 mt-2`}>
                        <Image style={tw`h-5 w-5 mr-3 mt-1`} source={require('../../assets/images/clock.png')} />
                        <View>
                            <CustomText style={tw`font-semibold text-lg`}>Every month</CustomText>
                            <CustomText style={tw`font-medium text-sm mt-1`}>Transfer will be scheduled monthly</CustomText>
                        </View>
                        <View style={tw`mt-[-12]`} >

                            <View style={tw`ml-5`}>
                                <CheckBox
                                    checked={selectedIndex === 0}
                                    onPress={() => setIndex(0)}
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                />

                            </View>

                        </View>
                    </View>

                    <View style={tw`flex-row items-start border-b pb-5 border-blue-700 mt-2`}>
                        <Image style={tw`h-5 w-5 mr-3 mt-1`} source={require('../../assets/images/clock.png')} />
                        <View>
                            <CustomText style={tw`font-semibold text-lg`}>Every week</CustomText>
                            <CustomText style={tw`font-medium text-sm mt-1`}>Transfer will be scheduled weekly</CustomText>
                        </View>
                        <View style={tw`ml-7 mt-[-12] `}>

                            <CheckBox
                                checked={selectedIndex === 1}
                                onPress={() => setIndex(1)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>

                    </View>
                    <View style={tw`flex-row items-start  pb-5  mt-2`}>
                        <Image style={tw`h-5 w-5 mr-3 mt-1`} source={require('../../assets/images/clock.png')} />
                        <View>
                            <CustomText style={tw`font-semibold text-lg`}>One time</CustomText>
                            <CustomText style={tw`font-medium text-sm mt-1`}>Transfer will be scheduled one time </CustomText>
                        </View>

                        <View style={tw`ml-3 mt-[-12]`}>
                            <CheckBox
                                checked={selectedIndex === 2}
                                onPress={() => setIndex(2)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />

                        </View>


                    </View>
                </View>

                <TouchableOpacity
                    style={tw`bg-blue-500 rounded-full  p-3 mt-6 w-80 items-center justify-center bg-[${primary_color}]`}>
                    <Link href="/dashboard/TransactionsScheduled" style={tw`text-white font-bold text-lg`}>Schedule Transfer</Link>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    shadowColor: "blue",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
})