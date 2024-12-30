import { Image, View } from 'react-native';
import person3 from '../assets/images/person3.png';
import CustomText from './CustomText';
import { Card } from 'react-native-shadow-cards';
import { Blurred } from './Blurred';
import tw from 'twrnc'

export const BlurTransaction = ({ name }) => {
    return (
        <Blurred>
            <Card style={tw`p-4 mt-5 flex-row justify-between bg-[#EBF4FF] border border-blue-500`}>
                <View style={tw`flex-row gap-3 items-center`}>
                    <Image style={tw`w-15 h-15 rounded-lg`} source={person3} />
                    <View>
                        <CustomText style={tw`font-bold`}>{name}</CustomText>
                        <CustomText style={tw`text-gray-500`}>Sent 00.00.000</CustomText>
                        <CustomText style={tw`text-gray-500`}>00:00:00</CustomText>
                    </View>
                </View>
                <CustomText style={tw`${CustomStyles.text_primary} my-auto text-lg mr-2`}>0.00</CustomText>
            </Card>
        </Blurred>
    )
}