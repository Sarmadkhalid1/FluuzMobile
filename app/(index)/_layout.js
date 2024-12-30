import React from "react";
import { Slot } from "expo-router";
import { Provider } from 'react-redux';
import { store } from '../../store';
import '../../localization/i18n';

export default Layout = () => {
    return <Provider store={store}><Slot /></Provider>
};