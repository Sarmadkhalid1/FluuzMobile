import React, { useState } from "react";
import { View, Pressable, StyleSheet, TouchableOpacity, Image } from "react-native";
import { primary_color } from "../../constants/styles";
import tw from 'twrnc';
import previous from '../../assets/images/previous.png';
import { Card } from 'react-native-shadow-cards';
import { Dropdown } from 'react-native-element-dropdown';
import { Link, } from "expo-router";
import CustomText from "../../components/CustomText";







export default function Sent() {

    const data = [
        { label: 'France', value: '1' },
        { label: 'Spain', value: '1' },
        { label: 'United Kingdom', value: '1' },
        { label: 'United States', value: '1' },
        { label: 'Canada', value: '1' },
        { label: 'Australia', value: '1' },
        { label: 'Brazil', value: '1' },
        { label: 'Argentina', value: '1' },
        { label: 'Mexico', value: '1' },
        { label: 'Japan', value: '1' },
        { label: 'China', value: '1' },
        { label: 'India', value: '1' },
        { label: 'Russia', value: '1' },
        { label: 'South Korea', value: '1' },
        { label: 'South Africa', value: '1' },
        { label: 'New Zealand', value: '1' },
        { label: 'Netherlands', value: '1' },
        { label: 'Switzerland', value: '1' },
        { label: 'Sweden', value: '1' },
        { label: 'Norway', value: '1' },
        { label: 'Denmark', value: '1' },
        { label: 'Finland', value: '1' },
        { label: 'Belgium', value: '1' },
        { label: 'Austria', value: '1' },
        { label: 'Portugal', value: '1' },
        { label: 'Greece', value: '1' },
        { label: 'Turkey', value: '1' },
        { label: 'Poland', value: '1' },
        { label: 'Czech Republic', value: '1' },
        { label: 'Hungary', value: '1' },
        { label: 'Ireland', value: '1' },
        { label: 'Egypt', value: '1' },
        { label: 'Saudi Arabia', value: '1' },
        { label: 'United Arab Emirates', value: '1' },
        { label: 'Qatar', value: '1' },
        { label: 'Kuwait', value: '1' },
        { label: 'Oman', value: '1' },
        { label: 'Bahrain', value: '1' },
        { label: 'Jordan', value: '1' },
        { label: 'Lebanon', value: '1' },
        { label: 'Iraq', value: '1' },
        { label: 'Syria', value: '1' },
        { label: 'Iran', value: '1' },
        { label: 'Pakistan', value: '1' },
        { label: 'Bangladesh', value: '1' },
        { label: 'Thailand', value: '1' },
        { label: 'Vietnam', value: '1' },
        { label: 'Indonesia', value: '1' },
        { label: 'Malaysia', value: '1' }
    ];



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
        <View style={tw`h-full bg-[#F4F6FE]`}>
            <View style={tw`flex-row items-center justify-between mt-5 ml-7`} >
                <Link href="/MoneySent" asChild>
                    <Pressable>
                        <Image
                            source={previous}
                            style={
                                tw`w-15 ml-[-15] h-15`
                            }
                        />
                    </Pressable>
                </Link>

            </View>
            <View style={tw`ml-6`} >
                <CustomText style={tw`font-bold text-3xl`} > Sent</CustomText>

                <View style={tw`flex-row items-center justify-between mr-10`}>

                    <Image source={require('../../assets/images/clander1.png')}
                        style={tw`w-12 h-12  mt-7 mb-5`} />
                    <CustomText style={tw`font-bold text-base mt-2 mr-40`} > Select Date and time</CustomText>

                </View>

                <View style={tw`flex-row justify-between mb-10 mr-10`}>
                    <TouchableOpacity onPress={showDatepicker}>
                        <Card
                            style={tw`w-35 h-12 items-center justify-center `}>

                            <CustomText>
                                {date.toLocaleDateString()}
                            </CustomText>

                        </Card>

                    </TouchableOpacity>


                    <Image source={require('../../assets/images/Line.png')}
                        style={tw`w-4 h-1 mt-5`} />

                    <TouchableOpacity onPress={showDatepicker}>
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
                            style={tw`w-35 h-12 items-center justify-center `}>

                            <CustomText>
                                {date.toLocaleDateString()}
                            </CustomText>
                        </Card>
                    </TouchableOpacity>

                </View>



            </View>
            <View style={tw`ml-5 w-88`} >

                <CustomText style={tw`font-bold text-base mr-2`} > Select Country</CustomText>
                <Dropdown
                    style={[tw`ml-1 `, styles.dropdown]}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Sweden"
                    onChange={item => {
                    }}

                />


                <CustomText style={tw`font-bold text-base mr-2 `} > Select Recipient</CustomText>
                <Dropdown
                    style={[tw`ml-1 `, styles.dropdown]}
                    data={data}
                    maxHeight={300}
                    placeholder="Select item"
                    onChange={item => {
                    }}

                />

            </View>

            <View style={tw`bg-[${primary_color}] mt-10 pb-45 rounded-t-3xl`} >

                <CustomText style={tw`text-center mt-10 text-white `}>TOTAL BALANCE</CustomText>

                <CustomText style={tw`text-center mt-4 text-white font-bold text-3xl mb-8`}>1300,000</CustomText>


            </View>


        </View >

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

    elevation: 2,

    dropdown: {
        margin: 16,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
})
