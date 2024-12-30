import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import tw from 'twrnc';
import { getAddRecipientData, getHowMuchSendingData } from "../../store";
import { useSelector } from "react-redux";
import CustomText from "../../components/CustomText";
import { Link } from "expo-router";
import previous from '../../assets/images/previous.png';
import { getLabelByCountryCode } from "../../services/Countries-js";

const DonationSuccessful = () => {

  const [orgName, setOrgName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [orgCountry, setOrgCountry] = useState(null);

  const oldState = useSelector(getHowMuchSendingData);
  const orgState = useSelector(getAddRecipientData);

  useEffect(() => {
    if (oldState) {
      setAmount(oldState.senderAmount);
      setOrgCountry(oldState.receiverCountry);
    }
    if (orgState) {
      setOrgName(orgState.firstName);
    }
  }, [oldState], [orgState])


  return (
    <View style={tw`mb-15`}>
      <Link href="/Home" asChild>
        <Pressable style={tw`mt-5`} >
          <Image
            source={previous} style={tw` w-20 h-20 `}
          />
        </Pressable>
      </Link>
      <View style={[tw`justify-center items-center`, styles.container]}>
        <CustomText style={[tw`text-3xl font-bold`, styles.heading]}>
          Thank You
        </CustomText>
        <CustomText style={tw`text-2xl mt-4`}>for ${amount}</CustomText>
        <View style={[tw`mt-6 w-full`, styles.circle]}>
          <Image resizeMode="contain" source={require('../../assets/images/markblue.png')} style={styles.tick} />
        </View>
        <CustomText style={tw`text-lg mt-6 text-center`}>
          You've made a donation to {orgName} in {getLabelByCountryCode(orgCountry)}
        </CustomText>
        <Pressable style={[tw`mt-8`, styles.button]}>
          <CustomText style={tw`text-white text-lg font-bold`}>Learn More</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

export default DonationSuccessful;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    color: '#333',
  },
  circle: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tick: {
    width: 120,
    height: 120,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
