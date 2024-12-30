import React, { useState } from 'react';
import { View, Pressable, Image, ScrollView, TextInput } from "react-native";
import previoustest from '../../assets/images/previous.png';
import padlock from '../../assets/images/padlock.png';
import tw from 'twrnc';
import { primary_color } from '../../constants/styles';
import { CheckBox } from '@rneui/themed';
import { Card } from 'react-native-shadow-cards';
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';

const PurposeOfTransfer = () => {

    const [selectedIndex, setIndex] = useState(4);

    return (
        <ScrollView>
            <View>
                <View style={tw`mx-auto w-82`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Link href="/Transfer" asChild>
                            <Pressable >
                                <Image
                                    source={previoustest} style={tw`w-15 h-15 `}
                                />
                            </Pressable>
                        </Link>
                    </View>

                    <View>
                        <CustomText style={tw`font-bold text-7`}>Choose the main purpose of this transfer</CustomText>
                        <CustomText style={tw`font-bold text-5 mt-1`}>What will the money you’re sending be used for?</CustomText>
                        <CustomText style={tw`text-[${primary_color}] mt-2`}>Learn more about why we ask this</CustomText>
                    </View>

                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>Household</CustomText>
                                <CustomText style={tw`font-medium text-sm w-65`}>Rents, food, clothing, groceries, bills, home repair</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 0}
                                onPress={() => setIndex(0)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>Healthcare</CustomText>
                                <CustomText style={tw`font-medium text-sm w-65`}>Doctors visit, medicine, surgery,{"\n"}treatment, medical bills</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 1}
                                onPress={() => setIndex(1)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>Education</CustomText>
                                <CustomText style={tw`font-medium text-sm w-65`}>Fees, Tuition, courses</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 2}
                                onPress={() => setIndex(2)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>Buying or investing</CustomText>
                                <CustomText style={tw`font-medium text-sm w-65`}>Buying a house, land, or a car, or {"\n"}investing in a company</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 3}
                                onPress={() => setIndex(3)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg`}>Holiday or ceremony</CustomText>
                                <CustomText style={tw`font-medium text-sm w-65`}>Eid, Ramadan, Easter</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 4}
                                onPress={() => setIndex(4)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                <View style={tw`gap-2 pt-4 mx-auto`}>
                    <Card style={tw`pl-4 py-1`}>
                        <View style={tw`flex-row justify-between`}>
                            <View>
                                <CustomText style={tw`font-semibold text-lg w-65`}>Other</CustomText>
                            </View>
                            <CheckBox
                                checked={selectedIndex === 5}
                                onPress={() => setIndex(5)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </Card>
                </View>

                {selectedIndex === 5 ? (
                    <View>
                        <CustomText style={tw`text-[${primary_color}] font-semibold mx-10 mt-7`}>Please describe</CustomText>
                        <Card style={tw`mx-auto mt-5`}>
                            <TextInput
                                multiline={true} s
                                numberOfLines={10}
                                style={[tw`p-5`, { height: 150, textAlignVertical: 'top', }]} />
                        </Card>
                    </View>
                ) : null}

                <Link href="/HowDoYouWantToPay" asChild>
                    <Pressable
                        style={tw`${CustomStyles.btn} mt-7 mx-10`}
                    >
                        <View style={tw`flex-row items-center gap-3 py-3`}>
                            <CustomText style={tw`text-white font-bold text-lg`}>Next</CustomText>
                        </View>
                    </Pressable>
                </Link>

                <View style={tw`flex-row mx-10 mt-4 pb-10`}>
                    <Image style={tw`h-4 w-4 mr-2`} source={padlock} />
                    <CustomText style={tw`font-semibold `}>Choose the option that best matches your relation</CustomText>
                </View>
            </View>
        </ScrollView>
    )
}
export default PurposeOfTransfer;