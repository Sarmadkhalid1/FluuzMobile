import React from "react";
import { View, Pressable, Image, Dimensions, ScrollView } from "react-native";
import previoustest from '../../assets/images/previous.png';
import somalia from '../../assets/countries/so.png';
import sweden from '../../assets/countries/se.png';
import somaliland from '../../assets/countries/somaliland.png';
import thailand from '../../assets/countries/th.png';
import turkey from '../../assets/countries/tr.png';
import bosina from '../../assets/countries/ba.png';
import djbouti from '../../assets/countries/dj.png';
import et from '../../assets/countries/et.png';
import gh from '../../assets/countries/gh.png';
import iq from '../../assets/countries/iq.png';
import jo from '../../assets/countries/jo.png';
import ke from '../../assets/countries/ke.png';
import mg from '../../assets/countries/mg.png';
import ma from '../../assets/countries/ma.png';
import pk from '../../assets/countries/pk.png';
import rw from '../../assets/countries/rw.png';
import sn from '../../assets/countries/sn.png';
import rs from '../../assets/countries/rs.png';
import so from '../../assets/countries/so.png';
import tz from '../../assets/countries/tz.png';
import ug from '../../assets/countries/ug.png';
import ae from '../../assets/countries/ae.png';
import ye from '../../assets/countries/ye.png';
import iraq from '../../assets/countries/iq.png';
import er from '../../assets/countries/er.png';
import kurdistan from '../../assets/countries/kurdistan.png';
import lb from '../../assets/countries/lb.png';
import ps from '../../assets/countries/ps.png';
import th from '../../assets/countries/th.png';
import tr from '../../assets/countries/tr.png';
import { primary_color } from '../../constants/styles';
import tw from 'twrnc';
import { Card } from "react-native-shadow-cards";
import { Link, } from "expo-router";
import CustomText from '../../components/CustomText';


const { width, height } = Dimensions.get('screen');
const countries = [
    { name: 'afghanistan', code: 'af' },
    { name: 'albania', code: 'al' },
    { name: 'algeria', code: 'dz' },
    { name: 'andorra', code: 'ad' },
    { name: 'angola', code: 'ao' },
    { name: 'antigua and barbuda', code: 'ag' },
    { name: 'argentina', code: 'ar' },
    { name: 'armenia', code: 'am' },
    { name: 'australia', code: 'au' },
    { name: 'austria', code: 'at' },
    { name: 'azerbaijan', code: 'az' },
    { name: 'bahamas', code: 'bs' },
    { name: 'bahrain', code: 'bh' },
    { name: 'bangladesh', code: 'bd' },
    { name: 'barbados', code: 'bb' },
    { name: 'belarus', code: 'by' },
    { name: 'belgium', code: 'be' },
    { name: 'belize', code: 'bz' },
    { name: 'benin', code: 'bj' },
    { name: 'bhutan', code: 'bt' },
    { name: 'bolivia', code: 'bo' },
    { name: 'bosnia and herzegovina', code: 'ba' },
    { name: 'botswana', code: 'bw' },
    { name: 'brazil', code: 'br' },
    { name: 'brunei', code: 'bn' },
    { name: 'bulgaria', code: 'bg' },
    { name: 'burkina faso', code: 'bf' },
    { name: 'burundi', code: 'bi' },
    { name: 'cabo verde', code: 'cv' },
    { name: 'cambodia', code: 'kh' },
    { name: 'cameroon', code: 'cm' },
    { name: 'canada', code: 'ca' },
    { name: 'central african republic', code: 'cf' },
    { name: 'chad', code: 'td' },
    { name: 'chile', code: 'cl' },
    { name: 'china', code: 'cn' },
    { name: 'colombia', code: 'co' },
    { name: 'comoros', code: 'km' },
    { name: 'congo', code: 'cg' },
    { name: 'costa rica', code: 'cr' },
    { name: 'croatia', code: 'hr' },
    { name: 'cuba', code: 'cu' },
    { name: 'cyprus', code: 'cy' },
    { name: 'czechia', code: 'cz' },
    { name: 'denmark', code: 'dk' },
    { name: 'djibouti', code: 'dj' },
    { name: 'dominica', code: 'dm' },
    { name: 'dominican republic', code: 'do' },
    { name: 'east timor (timor-leste)', code: 'tl' },
    { name: 'ecuador', code: 'ec' },
    { name: 'egypt', code: 'eg' },
    { name: 'el salvador', code: 'sv' },
    { name: 'equatorial guinea', code: 'gq' },
    { name: 'eritrea', code: 'er' },
    { name: 'estonia', code: 'ee' },
    { name: 'eswatini', code: 'sz' },
    { name: 'ethiopia', code: 'et' },
    { name: 'fiji', code: 'fj' },
    { name: 'finland', code: 'fi' },
    { name: 'france', code: 'fr' },
    { name: 'gabon', code: 'ga' },
    { name: 'gambia', code: 'gm' },
    { name: 'georgia', code: 'ge' },
    { name: 'germany', code: 'de' },
    { name: 'ghana', code: 'gh' },
    { name: 'greece', code: 'gr' },
    { name: 'grenada', code: 'gd' },
    { name: 'guatemala', code: 'gt' },
    { name: 'guinea', code: 'gn' },
    { name: 'guinea-bissau', code: 'gw' },
    { name: 'guyana', code: 'gy' },
    { name: 'haiti', code: 'ht' },
    { name: 'honduras', code: 'hn' },
    { name: 'hungary', code: 'hu' },
    { name: 'iceland', code: 'is' },
    { name: 'india', code: 'in' },
    { name: 'indonesia', code: 'id' },
    { name: 'iran', code: 'ir' },
    { name: 'iraq', code: 'iq' },
    { name: 'ireland', code: 'ie' },
    { name: 'israel', code: 'il' },
    { name: 'italy', code: 'it' },
    { name: 'ivory coast', code: 'ci' },
    { name: 'jamaica', code: 'jm' },
    { name: 'japan', code: 'jp' },
    { name: 'jordan', code: 'jo' },
    { name: 'kazakhstan', code: 'kz' },
    { name: 'kenya', code: 'ke' },
    { name: 'kiribati', code: 'ki' },
    { name: 'korea, north', code: 'kp' },
    { name: 'korea, south', code: 'kr' },
    { name: 'kosovo', code: 'xk' },
    { name: 'kuwait', code: 'kw' },
    { name: 'kyrgyzstan', code: 'kg' },
    { name: 'laos', code: 'la' },
    { name: 'latvia', code: 'lv' },
    { name: 'lebanon', code: 'lb' },
    { name: 'lesotho', code: 'ls' },
    { name: 'liberia', code: 'lr' },
    { name: 'libya', code: 'ly' },
    { name: 'liechtenstein', code: 'li' },
    { name: 'lithuania', code: 'lt' },
    { name: 'luxembourg', code: 'lu' },
    { name: 'madagascar', code: 'mg' },
    { name: 'malawi', code: 'mw' },
    { name: 'malaysia', code: 'my' },
    { name: 'maldives', code: 'mv' },
    { name: 'mali', code: 'ml' },
    { name: 'malta', code: 'mt' },
    { name: 'marshall islands', code: 'mh' },
    { name: 'mauritania', code: 'mr' },
    { name: 'mauritius', code: 'mu' },
    { name: 'mexico', code: 'mx' },
    { name: 'micronesia', code: 'fm' },
    { name: 'moldova', code: 'md' },
    { name: 'monaco', code: 'mc' },
    { name: 'mongolia', code: 'mn' },
    { name: 'montenegro', code: 'me' },
    { name: 'morocco', code: 'ma' },
    { name: 'mozambique', code: 'mz' },
    { name: 'myanmar (burma)', code: 'mm' },
    { name: 'namibia', code: 'na' },
    { name: 'nauru', code: 'nr' },
    { name: 'nepal', code: 'np' },
    { name: 'netherlands', code: 'nl' },
    { name: 'new zealand', code: 'nz' },
    { name: 'nicaragua', code: 'ni' },
    { name: 'niger', code: 'ne' },
    { name: 'nigeria', code: 'ng' },
    { name: 'north macedonia', code: 'mk' },
    { name: 'norway', code: 'no' },
    { name: 'oman', code: 'om' },
    { name: 'pakistan', code: 'pk' },
    { name: 'palau', code: 'pw' },
    { name: 'panama', code: 'pa' },
    { name: 'papua new guinea', code: 'pg' },
    { name: 'paraguay', code: 'py' },
    { name: 'peru', code: 'pe' },
    { name: 'philippines', code: 'ph' },
    { name: 'poland', code: 'pl' },
    { name: 'portugal', code: 'pt' },
    { name: 'qatar', code: 'qa' },
    { name: 'romania', code: 'ro' },
    { name: 'russia', code: 'ru' },
    { name: 'rwanda', code: 'rw' },
    { name: 'saint kitts and nevis', code: 'kn' },
    { name: 'saint lucia', code: 'lc' },
    { name: 'saint vincent and the grenadines', code: 'vc' },
    { name: 'samoa', code: 'ws' },
    { name: 'san marino', code: 'sm' },
    { name: 'sao tome and principe', code: 'st' },
    { name: 'saudi arabia', code: 'sa' },
    { name: 'senegal', code: 'sn' },
    { name: 'serbia', code: 'rs' },
    { name: 'seychelles', code: 'sc' },
    { name: 'sierra leone', code: 'sl' },
    { name: 'singapore', code: 'sg' },
    { name: 'slovakia', code: 'sk' },
    { name: 'slovenia', code: 'si' },
    { name: 'solomon islands', code: 'sb' },
    { name: 'somalia', code: 'so' },
    { name: 'south africa', code: 'za' },
    { name: 'south sudan', code: 'ss' },
    { name: 'spain', code: 'es' },
    { name: 'sri lanka', code: 'lk' },
    { name: 'sudan', code: 'sd' },
    { name: 'suriname', code: 'sr' },
    { name: 'sweden', code: 'se' },
    { name: 'switzerland', code: 'ch' },
    { name: 'syria', code: 'sy' },
    { name: 'taiwan', code: 'tw' },
    { name: 'tajikistan', code: 'tj' },
    { name: 'tanzania', code: 'tz' },
    { name: 'thailand', code: 'th' },
    { name: 'togo', code: 'tg' },
    { name: 'tonga', code: 'to' },
    { name: 'trinidad and tobago', code: 'tt' },
    { name: 'tunisia', code: 'tn' },
    { name: 'turkey', code: 'tr' },
    { name: 'turkmenistan', code: 'tm' },
    { name: 'tuvalu', code: 'tv' },
    { name: 'uganda', code: 'ug' },
    { name: 'ukraine', code: 'ua' },
    { name: 'united arab emirates', code: 'ae' },
    { name: 'united kingdom', code: 'gb' },
    { name: 'united states', code: 'us' },
    { name: 'uruguay', code: 'uy' },
    { name: 'uzbekistan', code: 'uz' },
    { name: 'vanuatu', code: 'vu' },
    { name: 'vatican city', code: 'va' },
    { name: 'venezuela', code: 've' },
    { name: 'vietnam', code: 'vn' },
    { name: 'yemen', code: 'ye' },
    { name: 'zambia', code: 'zm' },
    { name: 'zimbabwe', code: 'zw' }
];

const groupCountriesByLetter = () => {
    const groupedCountries = {};
    countries.forEach(country => {
        const firstLetter = country.name.charAt(0).toUpperCase();
        if (!groupedCountries[firstLetter]) {
            groupedCountries[firstLetter] = [];
        }
        groupedCountries[firstLetter].push(country);
    });
    return groupedCountries;
};

// const getListCountries = () => {
//     const countries = [];
//     countryData.forEach(f => {
//         const path = '../assets/countries/' + f.code + '.png';
//         const image = require(path);
//         countries.push(
//             <Card style={tw`flex-row mx-auto mt-3`}>
//                 <Image style={tw`h-6 w-10`} source={image} />
//                 <CustomText style={tw`font-semibold ml-5`}>{f.name}</CustomText>
//             </Card>
//         );
//     });
//     return countries;
// }

const SendTo = () => {

    const groupedCountries = groupCountriesByLetter();

    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <Icon name={item.code} size={30} style={{ marginRight: 10 }} />
            <CustomText>{item.name}</CustomText>
        </View>
    );
    return (
        <View style={[{ height, width }, tw` `]}>
            <View style={tw`mx-auto `}>
                <View style={tw`flex-row items-center justify-between`}>
                    <Link href="" asChild>
                        <Pressable >
                            <Image
                                source={previoustest} style={tw`w-15 h-15 `}
                            />
                        </Pressable>
                    </Link>
                    {/* <Link href="/Account" asChild>
                        <Pressable >
                            <Image
                                source={setting} style={tw`w-7 h-7 `}
                            />
                        </Pressable>
                    </Link> */}
                </View>

                <View>
                    <CustomText style={tw`font-bold text-7 ml-3`}>Send To</CustomText>
                    {/* <CustomText style={tw`font-bold text-5 mt-5 mb-2`}>All Counties</CustomText> */}
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={tw`gap-3 mx-1 mt-5 mb-60`}>
                        {/* {Object.keys(groupedCountries).map((letter, index) => (
                            <View key={index}>
                                <CustomText style={tw`font-bold text-5 mt-3 mb-3 text-[${primary_color}]`}>{letter}</CustomText>
                                {groupedCountries[letter].map((country, countryIndex) => (
                                    <Card key={countryIndex} style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={{ uri: `https://flagcdn.com/w2560/${country.code}.png` }} />
                                        <CustomText style={tw`font-semibold capitalize`}>{country.name}</CustomText>
                                    </Card>
                                ))}
                            </View>
                        ))} */}


                        <View>
                            <CustomText style={tw`font-bold text-4 ml-3 mt-3 mb-3 text-[${primary_color}]`}>Common Countries</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={sweden} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Sweden</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={somalia} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Somalia</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={somaliland} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Somaliland</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={thailand} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Thailand</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={turkey} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Turkey</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={iraq} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Iraq</CustomText>
                                    </Card>
                                </View>
                            </Link>
                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 mt-3 mb-3 ml-3 text-[${primary_color}]`}>All Countries</CustomText>
                            <CustomText style={tw`font-bold text-4 mt-3 mb-3 ml-3 text-[${primary_color}]`}>B</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={bosina} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Bosnia and Herzegovina</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 mb-3 ml-3 text-[${primary_color}]`}>D</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={djbouti} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Djbouti</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 mb-3 ml-3 text-[${primary_color}]`}>E</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={er} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Eritrea</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={et} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Ethiopia</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 mb-3 ml-3 text-[${primary_color}]`}>G</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={gh} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Ghana</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 ml-3 mb-3 text-[${primary_color}]`}>I</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={iq} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Iraq</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 ml-3 mb-3 text-[${primary_color}]`}>J</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={jo} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Jordan</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 ml-3 mb-3 text-[${primary_color}]`}>K</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={ke} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Kenya</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={kurdistan} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Kurdistan</CustomText>
                                    </Card>
                                </View>
                            </Link>
                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 ml-3 mb-3 text-[${primary_color}]`}>L</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={lb} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Leabanon</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                        <View>
                            <CustomText style={tw`font-bold ml-3 text-4 mb-3 text-[${primary_color}]`}>M</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={mg} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Madagascar</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={ma} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Morocco</CustomText>
                                    </Card>
                                </View>
                            </Link>
                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 ml-3 mb-3 text-[${primary_color}]`}>P</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={pk} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Pakistan</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={ps} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Palestine</CustomText>
                                    </Card>
                                </View>
                            </Link>
                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 ml-3 mb-3 text-[${primary_color}]`}>R</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={rw} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Rwanda</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 ml-3 mb-3 text-[${primary_color}]`}>S</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={sweden} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Sweden</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={sn} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Senegal</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={rs} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Serbia</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={so} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Somalia</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={somaliland} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Somaliland</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 ml-3 mb-3 text-[${primary_color}]`}>T</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={tz} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Tanzania</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={th} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Thailand</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={tr} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Turkey</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 ml-3 mb-3 text-[${primary_color}]`}>U</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={ug} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Uganda</CustomText>
                                    </Card>
                                </View>
                            </Link>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={ae} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>United Arab Emirates</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                        <View>
                            <CustomText style={tw`font-bold text-4 ml-3 mb-3 text-[${primary_color}]`}>Y</CustomText>

                            <Link href="/HowMuchSendingExtra">
                                <View>
                                    <Card style={tw`flex-row p-2 mb-2 shadow-blue-500`}>
                                        <Image style={tw`h-7 w-10 ml-2 mr-4`} source={ye} />
                                        <CustomText style={tw`font-semibold capitalize my-auto`}>Yemen</CustomText>
                                    </Card>
                                </View>
                            </Link>

                        </View>

                    </View>
                </ScrollView>
            </View>
        </View>
    )

}
export default SendTo;