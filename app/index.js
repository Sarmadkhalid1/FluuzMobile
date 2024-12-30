import { Redirect } from "expo-router";
import React, { useState, useEffect } from 'react';
import _layout from "./(dashboard)/_layout";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../components/SplashScreen';

export default function index() {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
                AsyncStorage.clear();
                setTimeout(() => {
                        setLoading(false);
                }, 2000);
        }, []);

        if (loading)
                return <SplashScreen />

        return (
                <Redirect href={'/Onboarding'} />
        );
}