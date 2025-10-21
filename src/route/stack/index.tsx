import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../tab';
import SearchScreen from '../../screens/search';
import { searchMovies } from '../../screens';
import { ScreenNames } from '../screenNames';



const Stack = createNativeStackNavigator<any>();

export default function Route() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
                <Stack.Screen name={ScreenNames.Tabs} component={BottomTabs} />
                <Stack.Screen name={ScreenNames.Search} component={SearchScreen} />
                {/*  <Stack.Screen name="Watch" component={Watch} />
                <Stack.Screen name="MediaLibrary" component={MediaLibrary} />
                <Stack.Screen name="More" component={More} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
