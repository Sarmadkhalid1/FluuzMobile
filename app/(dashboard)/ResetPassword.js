import {
    StyleSheet, TextInput, View, Image, Dimensions, Pressable, ScrollView
} from "react-native";
import { Link, } from "expo-router";
import React, { useState } from 'react';
import tw from 'twrnc';
import CustomStyles from '../../constants/styles'
import CustomText from '../../components/CustomText';



const { width, height } = Dimensions.get('window');
export default function ResetPassword() {

    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (password === password1 && password.trim() !== '') {
            setError('');
        } else {
            if (password.trim() === '') {
                setError('Password is empty. Please enter a valid password.');
            } else {
                setError('Passwords do not match. Please make sure the passwords match.');
            }
        }
    };
    return (
        <View style={{ height }}>
            <ScrollView>
                <View style={tw`w-80 mx-auto`}>
                    <View style={tw`flex-row items-center justify-between mt-5`} >
                        <Link href="/SelectDetails" asChild>
                            <Pressable>
                                <View>
                                    <Image source={require('../../assets/images/previous.png')} style={tw`w-15 ml-[-14] h-15`} />
                                </View>
                            </Pressable>
                        </Link>
                    </View>

                    <CustomText style={[tw`text-3xl mt-4 font-extrabold`]} >Reset Your Password</CustomText>

                    <View style={tw``}>
                        <CustomText style={tw`text-lg mt-25 font-bold`}>New Password</CustomText>

                        <View style={[tw`w-80 h-11 mt-2`, tw`bg-white rounded-lg shadow-md`]}>
                            <TextInput
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter Password"
                                placeholderTextColor="blue"
                                style={[tw`p-2`, { fontSize: 15 }]}
                            />
                        </View>

                        <CustomText style={[tw`text-lg mt-5 font-bold`]}>Confirm Password</CustomText>

                        <View style={[tw`w-80 h-11 mt-2`, tw`bg-white rounded-lg shadow-md`]}>
                            <TextInput
                                secureTextEntry={true}
                                value={password1}
                                onChangeText={setPassword1}
                                placeholder="Enter Password"
                                placeholderTextColor="blue"
                                style={[tw`p-2`, { fontSize: 15 }]}
                            />
                        </View>

                        {error !== '' && <CustomText style={tw`mt-2 text-red-500`}>{error}</CustomText>}

                        <Pressable
                            style={[tw`${CustomStyles.btn} p-3 mt-20`, password && password1 ? tw`` : tw`bg-gray-300`]}
                            onPress={handleSave}
                            disabled={!password || !password1}>
                <Link href="/TransactionHistory" asChild>

                            <CustomText style={tw`text-white font-bold text-lg`}>Save</CustomText>
                        </Link>
                        </Pressable>
                    </View>

                </View>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
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
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 5,
    },
})