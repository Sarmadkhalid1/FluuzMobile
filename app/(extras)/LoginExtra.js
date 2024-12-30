import React from "react";
import { View, Pressable, ImageBackground, Image, Dimensions } from "react-native";
import background from '../../assets/images/background.png';
import bankid from '../../assets/images/bankid.png';
import { primary_color } from "../../constants/styles";
import tw from 'twrnc';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';

const { width, height } = Dimensions.get('screen');


const Login = () => {
    return (
        <ImageBackground source={background} style={{ alignContent: 'center', alignItems: 'center', height, width, position: 'absolute' }} resizeMode="cover">

            {/* <Link style={[tw`mt-5`, { alignSelf: 'flex-start' }]} href="/HowMuchSendingExtra" asChild >
                <Pressable >
                    <Image
                        source={previous}
                        style={[tw` w-20 h-20 ml-4 mt-5`]}
                    />
                </Pressable>
            </Link> */}

            <CustomText style={tw`w-70 mx-auto mt-30 text-center text-6xl font-bold`}>
                Welcome Back
            </CustomText>


            <View style={tw`absolute  bottom-20`}>
                <View style={tw`w-80 mx-auto gap-4`}>
                    <Pressable
                        style={tw`bg-[${primary_color}] p-1 rounded-full items-center`}
                    >
                        <View style={tw`flex-row items-center gap-3`}>
                            <Image source={bankid} />
                            <Link href="/" style={tw`text-white font-bold text-lg`}>Login with 324705****</Link>
                        </View>
                    </Pressable>

                    <Pressable
                        style={tw`${CustomStyles.btn_secondary} bg-blue-100`}
                        onPress={() => Alert.alert('Simple Button pressed')}
                    >
                        <CustomText style={tw`${CustomStyles.text_primary} font-bold text-lg my-3`}>Change user</CustomText>
                    </Pressable>
                </View>
            </View>

        </ImageBackground>
    );
};
export default Login;