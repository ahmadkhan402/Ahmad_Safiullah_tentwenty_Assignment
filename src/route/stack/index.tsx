import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../tab';


export type RootStackParamList = {
    Tabs: undefined;
    Dashboard: undefined;
    Watch: undefined;
    MediaLibrary: undefined;
    More: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Route() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Tabs" component={BottomTabs} />
                {/* <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Watch" component={Watch} />
                <Stack.Screen name="MediaLibrary" component={MediaLibrary} />
                <Stack.Screen name="More" component={More} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
