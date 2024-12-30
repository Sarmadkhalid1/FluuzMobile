import { createSlice, configureStore, createSelector } from '@reduxjs/toolkit'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        verifyCode: {
            tokenData: null,
            email: null,
            phoneNumber: null
        },
        howMuchSending: {
            senderAmount: null,
            senderCountry: null,
            receiverAmount: null,
            receiverCountry: null,
            rate: 0,
            payoutMethod: null,
        },
        addRecipient: {
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            userId: null,
            connectId: null,
            goalAmount: 0
        },
        savedRecipient: {
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            userId: null,
            connectId: null,
            goalAmount: 0
        },
        card: null,
        language: 'en',
        cameFrom: null,
        fee: 0
    },
    reducers: {
        setVerifyCodeData: (state, action) => {
            state.verifyCode = action.payload;
        },
        setHowMuchSendingData: (state, action) => {
            state.howMuchSending = action.payload;
        },
        setAddRecipientData: (state, action) => {
            state.addRecipient = action.payload;
        },
        setSavedRecipientData: (state, action) => {
            state.savedRecipient = action.payload;
        },
        setCardData: (state, action) => {
            state.card = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setFee: (state, action) => {
            state.fee = action.payload;
        },
        setCameFrom: (state, action) => {
            state.cameFrom = action.payload;
        }
    }
})

export const { setVerifyCodeData, setHowMuchSendingData, setAddRecipientData, setSavedRecipientData, setCardData, setLanguage, setFee, setCameFrom } = appSlice.actions

export const store = configureStore({
    reducer: appSlice.reducer
});

export const getVerifyCodeData = state => state.verifyCode;
export const getHowMuchSendingData = state => state.howMuchSending;
export const getAddRecipientData = state => state.addRecipient;
export const getSavedRecipientData = state => state.savedRecipient;
export const getCardData = state => state.card;
export const getLanguage = state => state.language;
export const getFeeData = state => state.fee;
export const getCameFrom = state => state.cameFrom;

