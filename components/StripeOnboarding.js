import React, { useState, useEffect, useRef, memo } from 'react';
import { View, Pressable, Image, TextInput, ActivityIndicator, Dimensions, Alert, StyleSheet, FlatList, Text } from "react-native";
import tw from 'twrnc';
import { CheckBox } from '@rneui/themed';
import { router } from "expo-router";
import CustomText from './CustomText';
import { createBankAccount, createConnectAccount, retrieveAccount, updateAccount, uploadFilesToStripe, getAllExecutives, getAllOwners, getUnResolvedExecutive, getUnResolvedOwner, deletePerson, updatePerson, createPerson, getRepresentative, WhoIsThisPerson, getLegalGuardian, getDirector, getExecutive, getOwner, getAllDirectors, getUnResolvedDirector } from "../services/StripeService";
import { getCountryList, getCurrencyCodeByCountryCode } from '../services/Countries-js';
import { useSelector } from "react-redux";
import { getAddRecipientData, getCameFrom, getHowMuchSendingData, setAddRecipientData, store } from "../store";
import _, { set } from 'lodash';
import document from '../assets/images/document.png';
import DocumentPicker from "react-native-document-picker";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import PhoneInput from 'react-native-phone-number-input';
import { merchantCategoryCodes } from '../services/MerchantCodeService';
import { primary_color, secondary_color } from '../constants/styles';

const { width, height } = Dimensions.get('screen');


export const StripeOnboarding = ({ type, pageLoading, setPageLoading }) => {
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [connectId, setConnectId] = useState(undefined);
    const [currentlyDue, setCurrentlyDue] = useState([]);
    const [requirements, setRequirements] = useState({});
    const [structure, setStructure] = useState([
        {
            name: 'Multi Member LLC',
            value: 'multi_member_llc'
        },
        {
            name: 'Private Corporation',
            value: 'private_corporation'
        },
        {
            name: 'Private Partnership',
            value: 'private_partnership'
        },
        {
            name: 'Public Corporation',
            value: 'public_corporation'
        },
        {
            name: 'Public Partnership',
            value: 'public_partnership'
        },
        {
            name: 'Single Member LLC',
            value: 'single_member_llc'
        },
        {
            name: 'Sole Proprietorship',
            value: 'sole_proprietorship'
        },
        {
            name: 'Unicorporated Association',
            value: 'unincorporated_association'
        },
        {
            name: 'Registered Charity',
            value: 'registered_charity'
        },
        {
            name: 'Incorporated Partnership',
            value: 'incorporated_partnership'
        },
        {
            name: 'Unincorporated Partnership',
            value: 'unincorporated_partnership'
        },
        {
            name: 'Incorporated Non Profit',
            value: 'incorporated_non_profit'
        },
        {
            name: 'Unincorporated Non Profit',
            value: 'unincorporated_non_profit'
        },
        {
            name: 'Private Company',
            value: 'private_company'
        },
        {
            name: 'Public Company',
            value: 'public_company'
        },
        {
            name: 'LLC',
            value: 'llc'
        },
        {
            name: 'Sole Establishment',
            value: 'sole_establishment'
        },
        {
            name: 'Free Zone LLC',
            value: 'free_zone_llc'
        },
        {
            name: 'Free Zone Establishment',
            value: 'free_zone_establishment'
        },
        {
            name: 'Nil',
            value: 'nil'
        }
    ]);
    const [filesUploaded, setFilesUploaded] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [bankDetails, setBankDetails] = useState({ accountTitle: "", accountNo: "", routingNo: "", country: "", currency: "", key: "", accOrIban: "iban" });
    const [errorBankDetails, setErrorBankDetails] = useState({ accountTitle: "", accountNo: "", routingNo: "" });

    //Owner States
    const [resolvedOwners, setResolvedOwners] = useState([]);
    const [unresolvedOwner, setUnresolvedOwner] = useState({});
    const [unresolvedOwnerId, setUnresolvedOwnerId] = useState({});
    const [savingOwner, setSavingOwner] = useState(false);
    const [ownerForm, setOwnerForm] = useState(false);
    //Owner States

    //Executive States
    const [resolvedExecutives, setResolvedExecutives] = useState([]);
    const [unresolvedExecutive, setUnresolvedExecutive] = useState({});
    const [unresolvedExecutiveId, setUnresolvedExecutiveId] = useState({});
    const [savingExecutive, setSavingExecutive] = useState(false);
    const [executiveForm, setExecutiveForm] = useState(false);
    //Executive States

    //Director States
    const [resolvedDirectors, setResolvedDirectors] = useState([]);
    const [unresolvedDirector, setUnresolvedDirector] = useState({});
    const [unresolvedDirectorId, setUnresolvedDirectorId] = useState({});
    const [savingDirector, setSavingDirector] = useState(false);
    const [directorForm, setDirectorForm] = useState(false);
    //Director States

    const [personId, setPersonId] = useState(null);


    const [loadOwnersExectivesAndDirectors, setLoadOwnersExectivesAndDirectors] = useState(false);

    const refs = useRef({});

    const countryList = getCountryList();

    const preRecipient = useSelector(getAddRecipientData);

    const howMuchSending = useSelector(getHowMuchSendingData);

    const cameFrom = useSelector(getCameFrom);

    const routeBack = () => {
        if (cameFrom) {
            router.push(cameFrom);
        } else {
            router.push('/SendingTo');
        }
    }

    useEffect(() => {
        onLoad();
    }, [])

    useEffect(() => {
        setDefaultCountry('country', howMuchSending.receiverCountry);
    }, [howMuchSending]);

    useEffect(() => {
        async function loadOwnersAndExecs() {
            if (currentlyDue.length > 0 && Object.keys(requirements).length > 0 && loadOwnersExectivesAndDirectors) {
                setLoadOwnersExectivesAndDirectors(false);
                if (currentlyDue.find(f => f.includes('OwnersProvided'))) {
                    await getOwners(connectId);
                }
                if (currentlyDue.find(f => f.includes('ExecutivesProvided'))) {
                    await getExecutives(connectId);
                }
                if (currentlyDue.find(f => f.includes('DirectorsProvided'))) {
                    await getDirectors(connectId);
                }
            }
        }
        loadOwnersAndExecs();
    }, [loadOwnersExectivesAndDirectors, currentlyDue, requirements]);

    function checkFormValidation(requirements) {
        const validation = validateRecursive(requirements, requirements);
        return !validation.includes(false);
    }

    function checkUploading(requirements) {
        const uploadings = checkUploadingRecursive(requirements, requirements);
        return uploadings.includes(true);
    }

    function checkUploadingRecursive(data, requirements, path = '') {
        return Object.keys(data).map((key, i) => {
            const newPath = path ? `${path}.${key}` : key;
            if (data[key].hasOwnProperty('touched')) {
                return getUploading(newPath, requirements);
            }
            else {
                return checkUploadingRecursive(data[key], requirements, newPath);
            }
        }).flat();
    }

    function validateRecursive(data, requirements, path = '') {
        return Object.keys(data).filter(key => !key.includes('ExternalAccount')).map((key, i) => {
            const newPath = path ? `${path}.${key}` : key;
            if (data[key].hasOwnProperty('touched')) {
                return getValidation(newPath, requirements);
            }
            else {
                return validateRecursive(data[key], requirements, newPath);
            }
        }).flat();
    }

    function handleBankErrors() {
        const localErrorBank = _.cloneDeep(errorBankDetails);
        if (bankDetails.accountTitle === '') {
            localErrorBank.accountTitle = 'Account Title is required';
        }
        else {
            localErrorBank.accountTitle = '';
        }
        if (bankDetails.accountNo === '') {
            localErrorBank.accountNo = bankDetails.accOrIban === 'acc' ? 'Account No is required' : 'IBAN is required';
        }
        else {
            localErrorBank.accountNo = '';
        }
        if (bankDetails.accOrIban === 'acc' && bankDetails.routingNo === '') {
            localErrorBank.routingNo = 'Routing No is required';
        }
        else {
            localErrorBank.routingNo = '';
        }
        setErrorBankDetails(localErrorBank);
        if (bankDetails.accountTitle === '' || bankDetails.accountNo === '' || (bankDetails.accOrIban === 'acc' && bankDetails.routingNo === '')) {
            return true;
        }
        return false;
    }

    function existsInArray(arr, str) {
        const index = arr.findIndex(f => f.includes(str));
        return index >= 0;
    }

    function existsInArrayMulti(arr, str) {
        arr = arr.filter(f => f.includes(str));
        return arr.length > 1;
    }

    async function saveAndNavigate() {
        try {
            if (!checkFormValidation(requirements)) { return; }
            if (currentlyDue && currentlyDue.length > 0 && currentlyDue.includes('ExternalAccount')) {
                if (handleBankErrors()) { return; }
                setSubmitting(true);
                const localbankDetails = _.cloneDeep(bankDetails);
                localbankDetails.currency = getCurrencyCodeByCountryCode(howMuchSending.receiverCountry);
                const res = await createBankAccount(connectId, localbankDetails);
                handleInput(res.data, bankDetails.key, setRequirements);
                setLoading(true);
                setSubmitting(false);
                retrieveAccountForRequiredFields(connectId);
            }
            else if (currentlyDue && currentlyDue.length > 0 && existsInArray(currentlyDue, 'Owner') && !existsInArray(currentlyDue, 'Ownership') && !existsInArray(currentlyDue, 'Representative') && !existsInArray(currentlyDue, 'OwnersProvided')) {
                setSubmitting(true);
                let pId = personId;
                if (!pId) {
                    let resp = await getOwner(connectId);
                    if (!resp.data) {
                        resp = await createPerson(connectId, 'owner');
                        pId = resp.data.id;
                    }
                }
                await updatePerson(connectId, pId, transformObject(requirements['Owner']));
                setLoading(true);
                setCurrentlyDue([]);
                setRequirements({});
                setSubmitting(false);
                retrieveAccountForRequiredFields(connectId);
            }
            else if (currentlyDue && currentlyDue.length > 0 && existsInArray(currentlyDue, 'Executive') && !existsInArray(currentlyDue, 'Representative') && !existsInArray(currentlyDue, 'ExecutivesProvided')) {
                setSubmitting(true);
                let pId = personId;
                if (!pId) {
                    let resp = await getExecutive(connectId);
                    if (!resp.data) {
                        resp = await createPerson(connectId, 'executive');
                    }
                    pId = resp.data.id;
                }
                await updatePerson(connectId, pId, transformObject(requirements['Executive']));
                setLoading(true);
                setCurrentlyDue([]);
                setRequirements({});
                setSubmitting(false);
                retrieveAccountForRequiredFields(connectId);
            }
            else if (currentlyDue && currentlyDue.length > 0 && existsInArray(currentlyDue, 'Representative')) {
                setSubmitting(true);
                let pId = personId;
                if (!pId) {
                    let resp = await getRepresentative(connectId);
                    if (!resp.data) {
                        resp = await createPerson(connectId, 'representative');
                    }
                    pId = resp.data.id;
                }
                await updatePerson(connectId, pId, transformObject(requirements['Representative']));
                setLoading(true);
                setCurrentlyDue([]);
                setRequirements({});
                setSubmitting(false);
                retrieveAccountForRequiredFields(connectId);
            }
            else if (currentlyDue && currentlyDue.length > 0 && existsInArray(currentlyDue, 'Director') && !existsInArray(currentlyDue, 'Representative') && !existsInArray(currentlyDue, 'DirectorsProvided')) {
                setSubmitting(true);
                let pId = personId;
                if (!pId) {
                    let resp = await getDirector(connectId);
                    if (!resp.data) {
                        resp = await createPerson(connectId, 'director');
                    }
                    pId = resp.data.id;
                }
                await updatePerson(connectId, pId, transformObject(requirements['Director']));
                setLoading(true);
                setCurrentlyDue([]);
                setRequirements({});
                setSubmitting(false);
                retrieveAccountForRequiredFields(connectId);
            }
            else if (currentlyDue && currentlyDue.length > 0 && existsInArrayMulti(currentlyDue, 'LegalGuardian')) {
                setSubmitting(true);
                let pId = personId;
                if (!pId) {
                    let resp = await getLegalGuardian(connectId);
                    if (!resp.data) {
                        resp = await createPerson(connectId, 'legalGuardian');
                    }
                    pId = resp.data.id;
                }

                await updatePerson(connectId, pId, transformObject(requirements['LegalGuardian']));
                setLoading(true);
                setCurrentlyDue([]);
                setRequirements({});
                setSubmitting(false);
                retrieveAccountForRequiredFields(connectId);
            }
            else {
                setSubmitting(true);
                saveRequirements(requirements);
            }
        }
        catch (error) {
            console.log(error);
            setSubmitting(false);
            Alert.alert('Error', error.response.data.message, [
                { 'text': 'Ok', onPress: () => routeBack }
            ]);
        }
    }

    async function saveOwner() {
        try {
            if (!checkFormValidation(unresolvedOwner)) { return; }
            setSavingOwner(true);
            let localRequirements = _.cloneDeep(unresolvedOwner);
            localRequirements = transformObject(localRequirements);
            const res1 = await updatePerson(connectId, unresolvedOwnerId, localRequirements);
            await getOwners(connectId);
            setSavingOwner(false);
        }
        catch (error) {
            setSavingOwner(false);
            console.log(error);
            Alert.alert('Error', error.response.data.message, [
                { 'text': 'Ok', onPress: () => routeBack }
            ]);
        }
    }

    async function saveExecutive() {
        try {
            if (!checkFormValidation(unresolvedExecutive)) { return; }
            setSavingExecutive(true);
            let localRequirements = _.cloneDeep(unresolvedExecutive);
            localRequirements = transformObject(localRequirements);
            const res1 = await updatePerson(connectId, unresolvedExecutiveId, localRequirements);
            await getExecutives(connectId);
            setSavingExecutive(false);
        }
        catch (error) {
            setSavingExecutive(false);
            console.log(error);
            Alert.alert('Error', error.response.data.message, [
                { 'text': 'Ok', onPress: () => routeBack }
            ]);
        }
    }

    async function saveDirector() {
        try {
            if (!checkFormValidation(unresolvedDirector)) { return; }
            setSavingDirector(true);
            let localRequirements = _.cloneDeep(unresolvedDirector);
            localRequirements = transformObject(localRequirements);
            const res1 = await updatePerson(connectId, unresolvedDirectorId, localRequirements);
            await getDirectors(connectId);
            setSavingDirector(false);
        }
        catch (error) {
            setSavingDirector(false);
            console.log(error);
            Alert.alert('Error', error.response.data.message, [
                { 'text': 'Ok', onPress: () => routeBack }
            ]);
        }
    }

    async function saveRequirements(requirements) {
        try {
            let localRequirements = _.cloneDeep(requirements);
            localRequirements = transformObject(localRequirements);
            const res1 = await updateAccount(connectId, localRequirements);
            setLoading(true);
            setCurrentlyDue([]);
            setRequirements({});
            setSubmitting(false);
            retrieveAccountForRequiredFields(connectId);
        }
        catch (error) {
            setSubmitting(false);
            console.log(error);
            Alert.alert('Error', error.response.data.message);
        }
    }

    async function onLoad() {
        try {
            if (howMuchSending.receiverCountry && preRecipient.id && !preRecipient.connectId) {
                createConnectAcountAndGetRequiredFields(howMuchSending.receiverCountry, preRecipient.id);
            }
            else if (preRecipient.connectId) {
                setConnectId(preRecipient.connectId);
                retrieveAccountForRequiredFields(preRecipient.connectId);
            }
            else {
                Alert.alert('Error', 'There are some missing information.', [
                    { 'text': 'Ok', onPress: () => routeBack }
                ]);
            }
        } catch (error) {
            console.log(error)
            Alert.alert('Error', error.response.data.message, [
                { 'text': 'Ok', onPress: () => routeBack }
            ]);
        }
    }

    async function createConnectAcountAndGetRequiredFields(countryCode, recipientId) {
        try {
            let res = await createConnectAccount(countryCode, recipientId, type);
            if (res.status === 200) {
                setConnectId(res.data);
                retrieveAccountForRequiredFields(res.data);
            }
        }
        catch (error) {
            console.log(error);
            Alert.alert('Error', error.response.data.message, [
                { 'text': 'Ok', onPress: () => routeBack }
            ])
        }
    }

    function setConnectIdInRecipient(connectId) {
        const state = store.getState();
        const recipient = _.cloneDeep(state.addRecipient);
        recipient.connectId = connectId;
        store.dispatch(setAddRecipientData(recipient));
    }

    async function retrieveAccountForRequiredFields(connectId) {
        try {
            setConnectIdInRecipient(connectId);
            let res = await retrieveAccount(connectId);
            if (res.status === 200) {
                const { requirements } = res.data;
                let { currentlyDue } = requirements;
                if (currentlyDue && currentlyDue.length > 0) {
                    const heading = currentlyDue[0].split('.')[0];
                    currentlyDue = currentlyDue.filter(f => f.startsWith(heading));
                    if (currentlyDue.length === 0) {
                        currentlyDue = requirements.currentlyDue;
                    }
                    const livenessIndex = currentlyDue.findIndex(f => f.includes('verification.proof_of_liveness'));
                    if (livenessIndex >= 0) {
                        currentlyDue[livenessIndex] = currentlyDue[livenessIndex].replace('proof_of_liveness', 'additional_document');
                        const resIndex = currentlyDue.findIndex(f => f.includes('person'));
                        if (resIndex >= 0) {
                            const personId = currentlyDue[resIndex].split('.')[0];
                            currentlyDue.push(personId + '.verification.document')
                        }
                    }
                    const index = currentlyDue.findIndex(f => f.includes('verification.document'));
                    if (index >= 0) {
                        const front = currentlyDue[index] + '.front';
                        const back = currentlyDue[index] + '.back';
                        currentlyDue.splice(index, 1);
                        currentlyDue.push(front);
                        currentlyDue.push(back);
                    }
                    const aIndex = currentlyDue.findIndex(f => f.includes('verification.additional_document'));
                    if (aIndex >= 0) {
                        const front = currentlyDue[aIndex] + '.front';
                        const back = currentlyDue[aIndex] + '.back';
                        currentlyDue.splice(aIndex, 1);
                        currentlyDue.push(front);
                        currentlyDue.push(back);
                    }
                    if (currentlyDue.includes('company.business_vat_id_number')) {
                        const index = currentlyDue.findIndex(f => f === 'company.business_vat_id_number');
                        if (index >= 0) {
                            currentlyDue[index] = currentlyDue[index].replace('company.business_vat_id_number', 'company.vat_id');
                        }
                    }

                    currentlyDue = moveKeysToEnd(currentlyDue);
                    const resIndex = currentlyDue.findIndex(f => f.includes('person'));
                    if (resIndex >= 0) {
                        const personId = currentlyDue[resIndex].split('.')[0];
                        setPersonId(personId);
                        res = await WhoIsThisPerson(connectId, personId);
                        currentlyDue = currentlyDue.map(cd => cd.replace(personId, res.data));
                    }
                    currentlyDue = transformArray(currentlyDue);
                    setCurrentlyDue(currentlyDue);
                    setRequirements(createNestedObject(currentlyDue));
                    setPageLoading(false);
                    setLoading(false);
                    setLoadOwnersExectivesAndDirectors(true);
                }
                else {
                    if (!cameFrom || (cameFrom && !cameFrom.includes('/Home') && !cameFrom.includes('/TransferDetails'))) {
                        router.push('/CardList');
                    }
                    else if (cameFrom) {
                        router.push(cameFrom)
                    }
                    else {
                        router.push('/TransactionHistory')
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
            Alert.alert('Error', error.response.data.message, [
                { 'text': 'Ok', onPress: () => routeBack }
            ])
        }
    }

    async function getExecutives(connectId) {
        try {
            let res = await getAllExecutives(connectId);
            if (res.data.length === 0) {
                setExecutivesProvided(false);
                await createPerson(connectId, 'executive');
            }
            else {
                setExecutivesProvided(true);
                const executives = res.data.filter(f => f.requirements.currentlyDue.length === 0);
                const rExecutives = executives.map(e => {
                    return { id: e.id, email: e.email, firstName: e.firstName, lastName: e.lastName, deleting: false };
                })
                setResolvedExecutives(rExecutives);
            }
            res = await getUnResolvedExecutive(connectId);
            if (res.data) {
                setUnresolvedExecutiveId(res.data.id)
                const { requirements } = res.data;
                let { currentlyDue } = requirements;
                if (currentlyDue && currentlyDue.length > 0) {
                    if (currentlyDue.includes('verification.document')) {
                        const index = currentlyDue.findIndex(f => f.includes('verification.document'));
                        if (index >= 0) {
                            const front = currentlyDue[index] + '.front';
                            const back = currentlyDue[index] + '.back';
                            currentlyDue.splice(index, 1);
                            currentlyDue.push(front);
                            currentlyDue.push(back);
                        }
                    }
                    currentlyDue = transformArray(currentlyDue);
                    setUnresolvedExecutive(createNestedObject(currentlyDue));
                    setExecutiveForm(true);
                }
            }
            else {
                setExecutiveForm(false);
            }
        }
        catch (error) {
            console.log(error);
            Alert.alert('Error', error.response.data.message, [
                { 'text': 'Ok', onPress: () => routeBack }
            ])
        }
    }

    function setOwnersProvided(value) {
        const key = currentlyDue.find(f => f.includes("OwnersProvided"));
        if (key) {
            handleInput(value, key, setRequirements);
        }
    }

    function setExecutivesProvided(value) {
        const key = currentlyDue.find(f => f.includes("ExecutivesProvided"));
        if (key) {
            handleInput(value, key, setRequirements);
        }
    }

    function setDirectorsProvided(value) {
        const key = currentlyDue.find(f => f.includes("DirectorsProvided"));
        if (key) {
            handleInput(value, key, setRequirements);
        }
    }

    async function getDirectors(connectId) {
        try {
            let res = await getAllDirectors(connectId);
            if (res.data.length === 0) {
                setDirectorsProvided(false);
                await createPerson(connectId, 'director');
            }
            else {
                setDirectorsProvided(true);
                const directors = res.data.filter(f => f.requirements.currentlyDue.length === 0);
                const rDirectors = directors.map(e => {
                    return { id: e.id, email: e.email, firstName: e.firstName, lastName: e.lastName, deleting: false };
                })
                setResolvedDirectors(rDirectors);
            }
            res = await getUnResolvedDirector(connectId);
            if (res.data) {
                setUnresolvedDirectorId(res.data.id)
                const { requirements } = res.data;
                let { currentlyDue } = requirements;
                if (currentlyDue && currentlyDue.length > 0) {
                    if (currentlyDue.includes('verification.document')) {
                        const index = currentlyDue.findIndex(f => f.includes('verification.document'));
                        if (index >= 0) {
                            const front = currentlyDue[index] + '.front';
                            const back = currentlyDue[index] + '.back';
                            currentlyDue.splice(index, 1);
                            currentlyDue.push(front);
                            currentlyDue.push(back);
                        }
                    }
                    currentlyDue = transformArray(currentlyDue);
                    setUnresolvedDirector(createNestedObject(currentlyDue));
                    setDirectorForm(true);
                }
            }
            else {
                setDirectorForm(false);
            }
        }
        catch (error) {
            console.log(error);
            Alert.alert('Error', error.response.data.message, [
                { 'text': 'Ok', onPress: () => routeBack }
            ])
        }
    }

    async function getOwners(connectId) {
        try {
            let res = await getAllOwners(connectId);
            if (res.data.length === 0) {
                setOwnersProvided(false);
                await createPerson(connectId, 'owner');
            }
            else {
                setOwnersProvided(true);
                const owners = res.data.filter(f => f.requirements.currentlyDue.length === 0);
                const rOwners = owners.map(e => {
                    return { id: e.id, email: e.email, firstName: e.firstName, lastName: e.lastName, deleting: false };
                });
                setResolvedOwners(rOwners);
            }
            res = await getUnResolvedOwner(connectId);
            if (res.data) {
                setUnresolvedOwnerId(res.data.id)
                const { requirements } = res.data;
                let { currentlyDue } = requirements;
                if (currentlyDue && currentlyDue.length > 0) {
                    if (currentlyDue.includes('verification.document')) {
                        const index = currentlyDue.findIndex(f => f.includes('verification.document'));
                        if (index >= 0) {
                            const front = currentlyDue[index] + '.front';
                            const back = currentlyDue[index] + '.back';
                            currentlyDue.splice(index, 1);
                            currentlyDue.push(front);
                            currentlyDue.push(back);
                        }
                    }
                    currentlyDue = transformArray(currentlyDue);
                    setUnresolvedOwner(createNestedObject(currentlyDue));
                    setOwnerForm(true);
                }
            }
            else {
                setOwnerForm(false);
            }
        }
        catch (error) {
            console.log(error);
            Alert.alert('Error', error.response.data.message, [
                { 'text': 'Ok', onPress: () => routeBack }
            ])
        }
    }

    function transformArray(arr) {
        return arr.map(item => {
            return item.split('.').map(segment => {
                return segment.split('_').map(subSegment => {
                    return subSegment.charAt(0).toUpperCase() + subSegment.slice(1);
                }).join('');
            }).join('.');
        });
    }

    function moveKeysToEnd(arr) {
        const keysToMove = ["company.owners_provided", "company.executives_provided"];
        const filteredKeys = arr.filter(key => !keysToMove.includes(key));
        const movedKeys = arr.filter(key => keysToMove.includes(key));

        return [...filteredKeys, ...movedKeys];
    }

    function createNestedObject(arr) {
        const result = {};

        arr.forEach(path => {
            const keys = path.split('.');
            keys.reduce((acc, key, index) => {
                if (!acc[key]) {
                    acc[key] = (index === keys.length - 1) ? { value: '', uploading: false, touched: false } : {};
                }
                return acc[key];
            }, result);
        });

        return result;
    };

    function transformObject(obj) {
        const result = {};

        for (const key in obj) {
            if (obj[key] && typeof obj[key] === 'object' && 'value' in obj[key]) {
                result[key] = obj[key].value;
            } else if (obj[key] && typeof obj[key] === 'object') {
                result[key] = transformObject(obj[key]);
            } else {
                result[key] = obj[key];
            }
        }

        return result;
    }

    function transformText(text) {
        text = text.replace('Mcc', 'Industry')
        text = text.replace('Dob', 'DateOfBirth')
        text = text.replace('IdNumber', 'Tax information')
        text = text.replace(/\./g, ' ')
        return text.replace(/([A-Z])/g, ' $1').trim();
    }

    function handleInput(value, path, setRequirements) {
        const objPaths = path.split('.');
        if (objPaths.length > 0) {
            setRequirements(prevState => setValueRecursive(value, _.cloneDeep(objPaths), prevState, 'value'));
        }
    }

    function setValueRecursive(value, paths, obj, toChange) {
        if (paths.length > 0) {
            let newObj = obj[paths[0]];
            if (typeof (newObj) === 'object' && !newObj.hasOwnProperty('touched')) {
                if (paths.length === 1) {
                    obj[paths[0]] = setValueRecursive(value, _.cloneDeep(paths), newObj, toChange);
                }
                else {
                    obj[paths[0]] = setValueRecursive(value, _.cloneDeep(paths.slice(1, paths.length)), newObj, toChange);
                }
            } else if (typeof (newObj) === 'object' && newObj.hasOwnProperty('touched')) {
                obj[paths[0]][toChange] = value;
            }
        }
        return obj;
    }

    function getValue(path, requirements) {
        const objPaths = path.split('.');
        let localRequirements = _.cloneDeep(requirements);
        if (objPaths.length > 0) {
            return getValueRecursive(_.cloneDeep(objPaths), localRequirements, 'value');
        }
        return "";
    }

    function getValueRecursive(paths, obj, type) {
        if (paths.length > 0) {
            let newObj = obj[paths[0]];
            if (typeof (newObj) === 'object' && !newObj.hasOwnProperty('touched')) {
                if (paths.length === 1) {
                    return getValueRecursive(_.cloneDeep(paths), newObj, type);
                }
                else {
                    return getValueRecursive(_.cloneDeep(paths.slice(1, paths.length)), newObj, type);
                }
            } else if (typeof (newObj) === 'object' && newObj.hasOwnProperty('touched')) {
                return obj[paths[0]][type];
            }
        }
        return "";
    }

    function getValidation(path, requirements) {
        const value = getValue(path, requirements);
        return value === "" || (_.isArray(value) && value.length === 0) ? false : true;
    }

    function handleTouched(path, requirements, setRequirements) {
        const objPaths = path.split('.');
        let localRequirements = _.cloneDeep(requirements);
        if (objPaths.length > 0) {
            localRequirements = setValueRecursive(true, _.cloneDeep(objPaths), localRequirements, 'touched');
            setRequirements(localRequirements);
        }
    }

    function getTouched(path, requirements) {
        const objPaths = path.split('.');
        let localRequirements = _.cloneDeep(requirements);
        if (objPaths.length > 0) {
            return getValueRecursive(_.cloneDeep(objPaths), localRequirements, 'touched');
        }
        return false;
    }

    function handleUploading(value, path, requirements, setRequirements) {
        const objPaths = path.split('.');
        let localRequirements = _.cloneDeep(requirements);
        if (objPaths.length > 0) {
            localRequirements = setValueRecursive(value, _.cloneDeep(objPaths), localRequirements, 'uploading');
            setRequirements(localRequirements);
        }
    }

    function getUploading(path, requirements) {
        const objPaths = path.split('.');
        let localRequirements = _.cloneDeep(requirements);
        if (objPaths.length > 0) {
            return getValueRecursive(_.cloneDeep(objPaths), localRequirements, 'uploading');
        }
        return false;
    }

    function getFilePurpose(path) {
        if (path.includes('Verification.AdditionalDocument') || path.includes('Verification.Document')) {
            return 'identity_document';
        }
        else if (path.includes('Company.Verification.Document')) {
            return 'additional_verification'
        }
        else {
            return 'account_requirement';
        }

    }

    async function uploadFile(path, requirements, setRequirements, isString) {
        try {
            if (uploading) {
                Alert.alert('Information', 'Please wait for other uploading to finish');
                return;
            }
            const purpose = getFilePurpose(path);
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: isString ? false : true
            });
            setUploading(true);
            handleUploading(true, path, requirements, setRequirements);
            let data = new FormData();
            res.forEach(file => {
                data.append('images', { uri: file.uri, type: file.type, name: file.name });
            })
            const uploadedFiles = [];
            const result = await uploadFilesToStripe(purpose, data);
            result.data.forEach(file => {
                uploadedFiles.push({ fileId: file.fileId, name: file.name });
            })
            setFilesUploaded([...filesUploaded, ...uploadedFiles]);
            let files = result.data.map(m => m.fileId);
            if (isString) {
                files = files.join(',');
            }
            handleUploading(false, path, requirements, setRequirements);
            handleInput(files, path, setRequirements);
            setUploading(false);
        }
        catch (error) {
            handleUploading(false, path, requirements, setRequirements);
            handleTouched(path, requirements, setRequirements);
            setUploading(false);
            console.log(error);
        }
    }

    function setDeleting(value, personId, resolvedList, setResolvedList) {
        const local = _.cloneDeep(resolvedList);
        const index = local.findIndex(f => f.id === personId);
        local[index].deleting = value;
        setResolvedList(local);
    }

    async function delPerson(connectId, personId, resolvedList, setResolvedList, get) {
        try {
            setDeleting(true, personId, resolvedList, setResolvedList);
            await deletePerson(connectId, personId);
            const local = _.cloneDeep(resolvedList);
            const index = local.findIndex(f => f.id === personId);
            local[index].deleting = true;
            local.splice(index, 1);
            setResolvedList(local);
            get(connectId);
        }
        catch (error) {
            Alert.alert('Error', 'Something went wrong, contact support');
        }
    }

    function FileUploader({ path, uploading, requirements, setRequirements, isString }) {
        return (
            <Pressable onPress={() => uploadFile(path, requirements, setRequirements, isString)}>
                <View style={tw`flex-row border border-[#0058CA4D] my-2 bg-[#EBF4FF] items-center`}>
                    <View style={tw`bg-white h-full py-2 px-3 flex-row items-center`}>
                        <Image style={tw`h-10 w-10`} resizeMode={'contain'} source={document} />
                    </View>
                    {uploading && <ActivityIndicator style={tw`ml-3`} size={'small'}></ActivityIndicator>}
                    <CustomText style={tw`font-medium text-4 ${uploading ? 'ml-1' : 'ml-3'} mt-1 capitalize`}>
                        {uploading ? 'Uploading...' : 'Select file to upload'}
                    </CustomText>
                </View>
            </Pressable>
        )
    }

    function FilesUploaded({ fileIds, path, setRequirements, isString }) {
        return (
            <View style={tw`flex-row border border-[#0058CA4D] mb-1 bg-[#EBF4FF] items-center`}>
                <View style={tw`bg-white h-full py-2 px-3 flex-row items-center`}>
                    <Image style={tw`h-10 w-10`} resizeMode={'contain'} source={document} />
                </View>
                <View>
                    {getFilenameFromUploaded(fileIds, isString)}
                </View>
                <Pressable style={tw`ml-auto mr-2`} onPress={() => clearUploads(fileIds, path, setRequirements)}>
                    <Ionicons name="close" size={28} color="red" />
                </Pressable>
            </View>
        )
    }

    function clearUploads(fileIds, path, setRequirements) {
        setFilesUploaded(filesUploaded.filter(f => !fileIds.includes(f.fileId)));
        handleInput('', path, setRequirements);
    }

    function getFilenameFromUploaded(fileIds, isString) {
        if (fileIds) {
            let fileIdsArr = isString ? fileIds.split(',') : fileIds;
            if (fileIdsArr.length > 0) {
                const filenames = [];
                fileIdsArr.forEach((ff, i) => {
                    const fileDic = filesUploaded.find(f => f.fileId === ff);
                    if (fileDic) {
                        filenames.push(<CustomText key={i} style={tw`font-medium text-4 ml-3 w-50 capitalize`} numberOfLines={1}>{fileDic.name}</CustomText>);
                    }
                });
                return filenames;
            }
            return <CustomText style={tw`font-medium text-4 ml-3 capitalize`}>Files Uploaded</CustomText>;
        }
    }

    function handleBankDetails(key, value, externalAccKey, requirements, setRequirements) {
        const localbankDetails = _.cloneDeep(bankDetails);
        localbankDetails[key] = value;
        localbankDetails.key = externalAccKey;
        setBankDetails(localbankDetails);
        handleTouched(externalAccKey, requirements, setRequirements);
    }

    function setDefaultCountry(key, value) {
        const localbankDetails = _.cloneDeep(bankDetails);
        localbankDetails[key] = value;
        setBankDetails(localbankDetails);
    }

    function setPhone(value, key, setRequirements) {
        if (refs && refs.current[key]) {
            if (refs.current[key].isValidNumber(value)) {
                handleInput(value, key, setRequirements);
            }
            else {
                //show toast
            }
        }
    }

    function getKeyboardType(key) {
        if (key.includes('Number') || key === 'Mcc' || key === 'Day' || key === 'Month' || key === 'Year' || key === 'TaxId' || key === 'VatId' || key === 'PostalCode') {
            return 'number-pad';
        }
        else if (key.includes('Email')) {
            return 'email-address';
        }
        else if (key.includes('Phone')) {
            return 'phone-pad';
        }
        return 'default';
    }

    const renderForm = ({ data, requirements, setRequirements, path = '', deep = 0 }) => {
        const form = [];
        deep++;
        form.push(Object.keys(data).map((key, i) => {
            const newPath = path ? `${path}.${key}` : key;
            const transformedText = transformText(key);
            if (data[key].hasOwnProperty('touched')) {
                const value = getValue(newPath, requirements);
                const touched = getTouched(newPath, requirements);
                return (
                    <View style={tw`my-2`} key={newPath}>
                        {
                            key === 'DirectorsProvided' ?
                                <>
                                    <CustomText style={tw`my-2 font-bold capitalize text-center ${!directorForm ? 'mt-7' : 'mt-15'} text-5`}>Directors</CustomText>
                                    {loadOwnersExectivesAndDirectors && <ActivityIndicator size={"large"}></ActivityIndicator>}
                                    {directorForm && !loadOwnersExectivesAndDirectors &&
                                        <>
                                            {renderForm({ data: unresolvedDirector, requirements: unresolvedDirector, setRequirements: setUnresolvedDirector, path: '', deep: 1, })}
                                            <Pressable
                                                onPress={() => saveDirector()}
                                                style={tw`${CustomStyles.btn} mt-5 py-3 mx-10 mb-15 ${savingDirector ? 'bg-[#0058CA99]' : ''}`}
                                                disabled={savingDirector}
                                            >
                                                {savingDirector && <ActivityIndicator size={"large"}></ActivityIndicator>}
                                                {!savingDirector && <CustomText style={tw`text-white font-bold text-lg `}>Save Director</CustomText>}
                                            </Pressable>
                                        </>
                                    }
                                    {!directorForm && !loadOwnersExectivesAndDirectors &&
                                        <View style={tw`flex-col border border-[#0058CA4D] mb-1 bg-[#EBF4FF] items-center rounded-lg`}>
                                            {resolvedDirectors.map((item) => (
                                                <View key={item.id} style={tw`py-2 px-3 flex-row gap-3 items-center w-full`}>
                                                    <View style={[tw`bg-[${secondary_color}] w-15 h-15`, { borderRadius: 50 }]}>
                                                        <CustomText style={tw`text-[${primary_color}] font-bold text-7 my-auto text-center capitalize`}>{item.firstName.charAt(0)}</CustomText>
                                                    </View>
                                                    <View style={tw`flex-row items-center justify-between flex-1`}>
                                                        <View style={tw`w-50`}>
                                                            <CustomText style={tw`font-bold text-lg`}>{`${item.firstName} ${item.lastName}`}</CustomText>
                                                            {item.email && <CustomText style={tw`font-bold text-lg`}>{item.email}</CustomText>}
                                                        </View>
                                                        <Pressable style={tw`mr-2`} onPress={() => delPerson(connectId, item.id, resolvedDirectors, setResolvedDirectors, getDirectors)}>
                                                            {!item.deleting && <Ionicons name="trash" size={24} color="red" />}
                                                            {item.deleting && <ActivityIndicator size={'small'}></ActivityIndicator>}
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>

                                    }
                                </>
                                :
                                <>
                                    {
                                        key === 'ExecutivesProvided' ?
                                            <>
                                                <CustomText style={tw`my-2 font-bold capitalize text-center ${!executiveForm ? 'mt-7' : 'mt-15'} text-5`}>Executives</CustomText>
                                                {loadOwnersExectivesAndDirectors && <ActivityIndicator size={"large"}></ActivityIndicator>}
                                                {executiveForm && !loadOwnersExectivesAndDirectors &&
                                                    <>
                                                        {renderForm({ data: unresolvedExecutive, requirements: unresolvedExecutive, setRequirements: setUnresolvedExecutive, path: '', deep: 1, })}
                                                        <Pressable
                                                            onPress={() => saveExecutive()}
                                                            style={tw`${CustomStyles.btn} mt-5 py-3 mx-10 mb-15 ${savingExecutive ? 'bg-[#0058CA99]' : ''}`}
                                                            disabled={savingExecutive}
                                                        >
                                                            {savingExecutive && <ActivityIndicator size={"large"}></ActivityIndicator>}
                                                            {!savingExecutive && <CustomText style={tw`text-white font-bold text-lg `}>Save Executive</CustomText>}
                                                        </Pressable>
                                                    </>
                                                }
                                                {!executiveForm && !loadOwnersExectivesAndDirectors &&
                                                    <View style={tw`flex-col border border-[#0058CA4D] mb-1 bg-[#EBF4FF] items-center rounded-lg`}>
                                                        {resolvedExecutives.map((item) => (
                                                            <View key={item.id} style={tw`py-2 px-3 flex-row gap-3 items-center w-full`}>
                                                                <View style={[tw`bg-[${secondary_color}] w-15 h-15`, { borderRadius: 50 }]}>
                                                                    <CustomText style={tw`text-[${primary_color}] font-bold text-7 my-auto text-center capitalize`}>{item.firstName.charAt(0)}</CustomText>
                                                                </View>
                                                                <View style={tw`flex-row items-center justify-between flex-1`}>
                                                                    <View style={tw`w-50`}>
                                                                        <CustomText style={tw`font-bold text-lg`}>{`${item.firstName} ${item.lastName}`}</CustomText>
                                                                        {item.email && <CustomText style={tw`font-bold text-lg`}>{item.email}</CustomText>}
                                                                    </View>
                                                                    <Pressable style={tw`mr-2`} onPress={() => delPerson(connectId, item.id, resolvedExecutives, setResolvedExecutives, getExecutives)}>
                                                                        {!item.deleting && <Ionicons name="trash" size={24} color="red" />}
                                                                        {item.deleting && <ActivityIndicator size={'small'}></ActivityIndicator>}
                                                                    </Pressable>
                                                                </View>
                                                            </View>
                                                        ))}
                                                    </View>

                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    key === 'OwnersProvided' ?
                                                        <>
                                                            <CustomText style={tw`my-2 font-bold capitalize text-center ${!ownerForm ? 'mt-7' : 'mt-15'} text-5`}>Owners</CustomText>
                                                            {loadOwnersExectivesAndDirectors && <ActivityIndicator size={'large'}></ActivityIndicator>}
                                                            {ownerForm && !loadOwnersExectivesAndDirectors &&
                                                                <>
                                                                    {renderForm({ data: unresolvedOwner, requirements: unresolvedOwner, setRequirements: setUnresolvedOwner, path: '', deep: 1, })}
                                                                    <Pressable
                                                                        onPress={() => saveOwner()}
                                                                        style={tw`${CustomStyles.btn} mt-5 py-3 mx-10 mb-15 ${savingOwner ? 'bg-[#0058CA99]' : ''}`}
                                                                        disabled={savingOwner}
                                                                    >
                                                                        {savingOwner && <ActivityIndicator size={"large"}></ActivityIndicator>}
                                                                        {!savingOwner && <CustomText style={tw`text-white font-bold text-lg `}>Save Owner</CustomText>}
                                                                    </Pressable>
                                                                </>
                                                            }
                                                            {!ownerForm && !loadOwnersExectivesAndDirectors &&
                                                                <View style={tw`flex-col border border-[#0058CA4D] mb-1 bg-[#EBF4FF] items-center rounded-lg`}>
                                                                    {resolvedOwners.map((item) => (
                                                                        <View key={item.id} style={tw`py-2 px-3 flex-row gap-3 items-center w-full`}>
                                                                            <View style={[tw`bg-[${secondary_color}] w-15 h-15`, { borderRadius: 50 }]}>
                                                                                <CustomText style={tw`text-[${primary_color}] font-bold text-7 my-auto text-center capitalize`}>{item.firstName.charAt(0)}</CustomText>
                                                                            </View>
                                                                            <View style={tw`flex-row items-center justify-between flex-1`}>
                                                                                <View style={tw`w-50`}>
                                                                                    <CustomText style={tw`font-bold text-lg`}>{`${item.firstName} ${item.lastName}`}</CustomText>
                                                                                    {item.email && <CustomText style={tw`font-bold text-lg`}>{item.email}</CustomText>}
                                                                                </View>
                                                                                <Pressable style={tw`mr-2`} onPress={() => delPerson(connectId, item.id, resolvedOwners, setResolvedOwners, getOwners)}>
                                                                                    {!item.deleting && <Ionicons name="trash" size={24} color="red" />}
                                                                                    {item.deleting && <ActivityIndicator size={'small'}></ActivityIndicator>}
                                                                                </Pressable>
                                                                            </View>
                                                                        </View>
                                                                    ))}
                                                                </View>

                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {key === 'ExternalAccount' &&
                                                                <>
                                                                    <CustomText style={tw`my-2 font-bold capitalize text-center mt-7 text-5`}>Bank Details</CustomText>
                                                                    <View style={tw`my-2`}>
                                                                        <CustomText style={tw`font-medium text-sm mt-1 capitalize`}>Account Title</CustomText>
                                                                        <TextInput ref={(e) => refs.current['accountTitle'] = e} onChangeText={(e) => handleBankDetails('accountTitle', e, newPath, requirements, setRequirements)} defaultValue={bankDetails['accountTitle']} style={tw`bg-[#EBF4FF] rounded-md border ${'border-[#0058CA4D]'} p-3.5 my-1`} placeholderTextColor="#0058CA66" placeholder={'Please enter Account Title'} />
                                                                        {errorBankDetails.accountTitle !== '' && <CustomText style={tw`font-medium text-red-700 text-xs capitalize`}>{errorBankDetails.accountTitle}</CustomText>}
                                                                    </View>
                                                                    <View style={tw`my-2`}>
                                                                        <CustomText style={tw`font-medium text-sm mt-1 capitalize`}>
                                                                            IBAN or Account No</CustomText>
                                                                        <Dropdown
                                                                            style={[tw`w-full`, styles.dropdown]}
                                                                            data={[
                                                                                {
                                                                                    label: 'IBAN',
                                                                                    value: 'iban'
                                                                                },
                                                                                {
                                                                                    label: 'Account No',
                                                                                    value: 'acc'
                                                                                },
                                                                            ]}
                                                                            maxHeight={300}
                                                                            labelField="label"
                                                                            value={bankDetails['accOrIban']}
                                                                            valueField="value"
                                                                            placeholder="Select Account"
                                                                            onChange={(item) => handleBankDetails('accOrIban', item.value, newPath, requirements, setRequirements)}
                                                                        />
                                                                    </View>
                                                                    <View style={tw`my-2`}>
                                                                        <CustomText style={tw`font-medium text-sm mt-1`}>{bankDetails['accOrIban'] === 'acc' ? 'Account No' : 'IBAN'}</CustomText>
                                                                        <TextInput ref={(e) => refs.current['accountNo'] = e} onChangeText={(e) => handleBankDetails('accountNo', e, newPath, requirements, setRequirements)} defaultValue={bankDetails['accountNo']} style={tw`bg-[#EBF4FF] rounded-md border ${'border-[#0058CA4D]'} p-3.5 my-1`} placeholderTextColor="#0058CA66" placeholder={`Please enter ${bankDetails['accOrIban'] === 'acc' ? 'Account No' : 'IBAN'}`} />
                                                                        {errorBankDetails.accountNo !== '' && <CustomText style={tw`font-medium text-red-700 text-xs capitalize`}>{errorBankDetails.accountNo}</CustomText>}
                                                                    </View>
                                                                    {
                                                                        bankDetails['accOrIban'] === 'acc' &&
                                                                        <View style={tw`my-2`}>
                                                                            <CustomText style={tw`font-medium text-sm mt-1 capitalize`}>Routing No</CustomText>
                                                                            <TextInput ref={(e) => refs.current['routingNo'] = e} keyboardType='number-pad' onChangeText={(e) => handleBankDetails('routingNo', e, newPath, requirements, setRequirements)} defaultValue={bankDetails['routingNo']} style={tw`bg-[#EBF4FF] rounded-md border ${'border-[#0058CA4D]'} p-3.5 my-1`} placeholderTextColor="#0058CA66" placeholder={'Please enter Routing No'} />
                                                                            {errorBankDetails.routingNo !== '' && <CustomText style={tw`font-medium text-red-700 text-xs capitalize`}>{errorBankDetails.routingNo}</CustomText>}
                                                                        </View>
                                                                    }
                                                                </>
                                                            }
                                                            {key !== 'ExternalAccount' &&
                                                                <>
                                                                    <CustomText style={tw`font-medium text-sm mt-1 capitalize`}>{transformedText === "files" ? transformText(newPath).replace('documents ', '').replace('files', 'file') : transformedText}</CustomText>
                                                                    {
                                                                        key === 'Structure' ?
                                                                            <>
                                                                                <Dropdown
                                                                                    style={[tw`w-full`, styles.dropdown]}
                                                                                    data={structure}
                                                                                    maxHeight={300}
                                                                                    labelField="name"
                                                                                    value={value}
                                                                                    valueField="value"
                                                                                    placeholder="Select Business Structure"
                                                                                    onFocus={() => handleTouched(newPath, requirements, setRequirements)}
                                                                                    onChange={(item) => handleInput(item.value, newPath, setRequirements)}
                                                                                />
                                                                            </>
                                                                            :
                                                                            <>
                                                                                {
                                                                                    key === 'Nationality' ?
                                                                                        <>
                                                                                            <Dropdown
                                                                                                style={[tw`w-full`, styles.dropdown]}
                                                                                                data={countryList}
                                                                                                maxHeight={300}
                                                                                                labelField="label"
                                                                                                value={value}
                                                                                                valueField="countryCode"
                                                                                                search={true}
                                                                                                placeholder="Select country"
                                                                                                onFocus={() => handleTouched(newPath, requirements, setRequirements)}
                                                                                                onChange={(item) => handleInput(item.countryCode, newPath, setRequirements)}
                                                                                            />
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            {
                                                                                                key === 'Mcc' ?
                                                                                                    <>
                                                                                                        <Dropdown
                                                                                                            style={[tw`w-full`, styles.dropdown]}
                                                                                                            data={merchantCategoryCodes}
                                                                                                            maxHeight={300}
                                                                                                            labelField="name"
                                                                                                            value={value}
                                                                                                            search={true}
                                                                                                            valueField="code"
                                                                                                            placeholder="Select Industry"
                                                                                                            onFocus={() => handleTouched(newPath, requirements, setRequirements)}
                                                                                                            onChange={(item) => handleInput(item.code, newPath, setRequirements)}
                                                                                                        />
                                                                                                    </>
                                                                                                    :
                                                                                                    <>
                                                                                                        {
                                                                                                            key === 'Files' || key === 'Front' || key === 'Back' ?
                                                                                                                <>
                                                                                                                    {(value === '' || (_.isArray(value) && value.length === 0)) &&
                                                                                                                        <FileUploader path={newPath} requirements={requirements} setRequirements={setRequirements} isString={key === 'Front' || key === 'Back' ? true : false} uploading={getUploading(newPath, requirements)}></FileUploader>
                                                                                                                    }
                                                                                                                    {(value !== '' || (_.isArray(value) && value.length > 0)) &&
                                                                                                                        <FilesUploaded fileIds={value} path={newPath} setRequirements={setRequirements} isString={key === 'Front' || key === 'Back' ? true : false}></FilesUploaded>
                                                                                                                    }
                                                                                                                </>
                                                                                                                :
                                                                                                                <>
                                                                                                                    {
                                                                                                                        (key === 'Executive' || key === 'Director' || key === 'Owner') ?
                                                                                                                            <>
                                                                                                                                <Dropdown
                                                                                                                                    style={[tw`w-full`, styles.dropdown]}
                                                                                                                                    data={[
                                                                                                                                        { name: 'Yes', value: true },
                                                                                                                                        { name: 'No', value: false },
                                                                                                                                    ]}
                                                                                                                                    maxHeight={300}
                                                                                                                                    labelField="name"
                                                                                                                                    value={value}
                                                                                                                                    search={true}
                                                                                                                                    valueField="value"
                                                                                                                                    placeholder="Select Yes/No"
                                                                                                                                    onFocus={() => handleTouched(newPath, requirements, setRequirements)}
                                                                                                                                    onChange={(item) => handleInput(item.value, newPath, setRequirements)}
                                                                                                                                />
                                                                                                                            </>
                                                                                                                            :
                                                                                                                            <>
                                                                                                                                {
                                                                                                                                    key.includes('Phone') ?
                                                                                                                                        <>
                                                                                                                                            <PhoneInput
                                                                                                                                                ref={(e) => refs.current[newPath] = e}
                                                                                                                                                value={value}
                                                                                                                                                defaultCode={bankDetails['country']}
                                                                                                                                                layout="first"
                                                                                                                                                textInputProps={{
                                                                                                                                                    onBlur: () => handleTouched(newPath, requirements, setRequirements)
                                                                                                                                                }}
                                                                                                                                                onChangeFormattedText={(value) => setPhone(value, newPath, setRequirements)}
                                                                                                                                                textContainerStyle={{
                                                                                                                                                    backgroundColor: '#EBF4FF'
                                                                                                                                                }}
                                                                                                                                                containerStyle={[{
                                                                                                                                                    backgroundColor: '#EBF4FF',
                                                                                                                                                    borderWidth: 1,
                                                                                                                                                    borderColor: '#0058CA4D',
                                                                                                                                                    borderRadius: 4,
                                                                                                                                                    height: 58,
                                                                                                                                                }, tw`w-full`]}
                                                                                                                                            />
                                                                                                                                        </>
                                                                                                                                        :
                                                                                                                                        <>
                                                                                                                                            {
                                                                                                                                                key.includes('Description') ?
                                                                                                                                                    <>
                                                                                                                                                        <TextInput ref={(e) => refs.current[newPath] = e} multiline={true} numberOfLines={4} onBlur={() => handleTouched(newPath, requirements, setRequirements)} keyboardType={getKeyboardType(key)} defaultValue={value} onChangeText={(e) => handleInput(e, newPath, setRequirements)} style={[tw`bg-[#EBF4FF] rounded-md border ${'border-[#0058CA4D]'} p-3.5 my-1`, { textAlignVertical: 'top' }]} placeholderTextColor="#0058CA66" placeholder={'Please enter ' + transformedText} />
                                                                                                                                                    </>
                                                                                                                                                    :
                                                                                                                                                    <>
                                                                                                                                                        <TextInput ref={(e) => refs.current[newPath] = e} onBlur={() => handleTouched(newPath, requirements, setRequirements)} keyboardType={getKeyboardType(key)} defaultValue={value} onChangeText={(e) => handleInput(e, newPath, setRequirements)} style={tw`bg-[#EBF4FF] rounded-md border ${'border-[#0058CA4D]'} p-3.5 my-1`} placeholderTextColor="#0058CA66" placeholder={'Please enter ' + transformedText} />
                                                                                                                                                    </>
                                                                                                                                            }
                                                                                                                                        </>
                                                                                                                                }
                                                                                                                            </>
                                                                                                                    }
                                                                                                                </>
                                                                                                        }
                                                                                                    </>

                                                                                            }
                                                                                        </>
                                                                                }
                                                                            </>
                                                                    }
                                                                    {!getValidation(newPath, requirements) && touched && <CustomText style={tw`font-medium text-red-700 text-xs capitalize ${key === 'Mcc' || key === 'Structure' ? 'mt-2' : ''}`}>{transformedText === "files" ? transformText(newPath).replace('documents ', '').replace('files', 'file') : transformedText} is required</CustomText>}
                                                                </>
                                                            }
                                                        </>
                                                }
                                            </>
                                    }
                                </>
                        }

                    </View>
                );
            }
            else {
                return (
                    <View key={newPath}>
                        {!data[key].length && <CustomText style={tw`my-2 font-bold capitalize text-center ${i > 0 ? 'mt-7' : ''} ${deep === 1 ? 'text-5' : 'text-4'}`}>{transformedText}{deep === 1 && ' Details'}</CustomText>}
                        {!data[key].length && newPath.includes('Verification.Document') && <CustomText style={tw`my-2 font-bold capitalize text-center text-4`}>Local Id Card or Passport</CustomText>}
                        {!data[key].length && newPath.includes('Verification.AdditionalDocument') && <CustomText style={tw`my-2 font-bold capitalize text-center text-4`}>Utility bill</CustomText>}
                        {
                            renderForm({ data: data[key], requirements, setRequirements, path: newPath, deep })
                        }
                    </View>
                );
            }
        }));
        return form;
    };

    if (pageLoading) {
        return (
            <View style={{ height, width }}>
                <View style={tw`my-auto text-center`}>
                    <ActivityIndicator size={"large"}></ActivityIndicator>
                    <CustomText style={tw`text-center mt-1 font-bold`}>Verifying please wait...</CustomText>
                </View>
            </View>
        );
    }

    if (loading) {
        return (
            <ActivityIndicator style={tw`mt-40`} size={"large"}></ActivityIndicator>
        );
    }

    return (
        <>
            <View style={tw`mt-3`}>
                {
                    renderForm({ data: requirements, requirements, setRequirements, path: '', deep: 0 })
                }
            </View>

            <Pressable
                onPress={() => saveAndNavigate()}
                style={tw`${CustomStyles.btn} mt-5 py-3 mx-10 ${submitting || checkUploading(requirements) ? 'bg-[#0058CA99]' : ''}`}
                disabled={submitting || checkUploading(requirements)}
            >
                {submitting && <ActivityIndicator size={"large"}></ActivityIndicator>}
                {!submitting && <CustomText style={tw`text-white font-bold text-lg `}>Next</CustomText>}
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    dropdown: {
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