import { useEffect, useState } from "react";
import { View, Pressable, Image, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from "react-native";
import { getPaymentMethodsByCountry } from "../../services/RaypdService";
import CustomText from "../../components/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import previous from '../../assets/images/previous.png';
import tw from 'twrnc';
import { Link, useRouter } from "expo-router";
import dummycard from '../../assets/images/dummycard.png'
import { Blurred } from "../../components/Blurred";
import part1 from '../../assets/images/progress_1_a.png'
import part2 from '../../assets/images/progress_1_b.png'
import { useSelector } from "react-redux";
import { getHowMuchSendingData } from "../../store";

const { width, height } = Dimensions.get('screen');

const PaymentMethods = () => {

    const router = useRouter();
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const howMuchSendingData = useSelector(getHowMuchSendingData);

    useEffect(() => { onload() }, [])

    const onload = async () => {
        try {
            const res = await getPaymentMethodsByCountry();
            setList(res.data.filter(f => f.category == howMuchSendingData.paymentMethod))
            setLoading(false);
        } catch { }
    }

    const saveAndRoute = async (item) => {
        try {
            AsyncStorage.setItem('payment_method', JSON.stringify(item), () => {
                router.push('/AddCard')
            })
        } catch { }
    }

    if (loading)
        return (
            <View style={[{ height, width }, tw` `]}>
                <ActivityIndicator style={tw`my-auto`} size={"large"}></ActivityIndicator>
            </View>
        );

    return (
        <View style={tw`mx-10 mt-5`}>
            <View style={tw`flex-row items-center mb-10`}>
                <Link href="/CardList" asChild>
                    <Pressable >
                        <Image
                            source={previous} style={tw`w-20 h-20 -ml-5`}
                        />
                    </Pressable>
                </Link>
                <View style={tw`flex-row ml-10`}>
                    <Image source={part1} />
                    <Image source={part2} style={tw`-ml-2 -mt-1`} />
                </View>
            </View>

            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-15`}>
                <Image source={dummycard} />
                <Image source={dummycard} style={tw`mx-5`} />
                <Image source={dummycard} />
            </ScrollView> */}

            {list.map((m, index) => (
                <TouchableOpacity onPress={() => saveAndRoute(m)} key={index} style={tw`border-b flex-row justify-between pl-1 pb-2 mb-6 items-center`}>
                    <CustomText>{m.name}</CustomText>
                    <Image style={tw`h-8 w-13`} source={{
                        uri: m.image,
                    }} />
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default PaymentMethods;