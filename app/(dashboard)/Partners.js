import React from "react";
import { View, Image, Dimensions, ScrollView } from "react-native";
import arrowblack from '../../assets/images/arrowblack.png';
import building from '../../assets/images/building.png';
import comingsoon from '../../assets/images/comingsoon.png';
import car from '../../assets/images/car.png';
import tw from 'twrnc';
import CustomText from '../../components/CustomText';

const { width, height } = Dimensions.get('window');

const Partners = () => {
    return (
        <ScrollView>
            <View style={[tw`px-10`, { width, height, backgroundColor: 'white' }]}>
                <CustomText style={tw`text-9 font-bold mt-10`}>Do more with our partners</CustomText>

                <CustomText style={tw`text-5 mt-10`}>Exclusive deals for our community from hand picked partners</CustomText>

                <CustomText style={tw`text-11 font-semibold mt-3`}>Insurance</CustomText>

                <CustomText style={tw`text-5 `}>Exclusive deals for our community from hand picked partners</CustomText>

                <View style={tw`mt-8 flex-row justify-between border-b border-blue-700 pb-6`}>
                    <View style={tw`flex-row`}>

                        <Image style={tw`h-8 w-8 mr-7`} source={building} />
                        <CustomText style={tw`text-5 font-bold`}>Home Insurance</CustomText>
                    </View>
                    <Image style={tw`h-5 w-3`} source={arrowblack} />
                </View>

                <View style={tw`mt-6 flex-row justify-between `}>
                    <View style={tw`flex-row`}>
                        <Image style={tw`h-7 w-10 mr-5`} source={car} />
                        <CustomText style={tw`text-5  font-bold`}>Car Insurance</CustomText>
                    </View>
                    <Image style={tw`h-5 w-3`} source={arrowblack} />
                </View>

                <CustomText style={tw`text-11 font-semibold mt-9`}>Flights</CustomText>

                <CustomText style={tw`text-5 `}>Effortless flight booking for all. Coming soon.</CustomText>

                <View style={tw`mt-5 flex-row border-b border-blue-700 pb-5`}>
                    <Image style={tw`h-8 w-11 mr-6 border-b border-blue-700 pb-5`} source={comingsoon} />
                    <CustomText style={tw`text-5  font-bold `}>Coming Soon</CustomText>
                </View>

            </View>
        </ScrollView>
    )
}
export default Partners;
