import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Dashboard, Watch, MediaLibrary, More } from '../../screens';
import { ScreenNames } from '../screenNames';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName: any;

                    if (route.name === 'Dashboard') {
                        iconName = 'grid';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Watch') {
                        return <Entypo name="controller-play" size={size + 2} color={color} />;
                    } else if (route.name === 'Media Library') {
                        return <MaterialIcons name="video-library" size={size + 1} color={color} />;
                    } else if (route.name === 'More') {
                        return <Ionicons name="list" size={size + 1} color={color} />;
                    }
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#8E8E93',
                tabBarStyle: {
                    backgroundColor: '#262237',
                    borderTopWidth: 0,
                    height: 75,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    position: 'absolute',
                    overflow: 'hidden',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    paddingBottom: 8,
                    fontWeight: '600',
                },
                headerShown: false,
            })}
        >
            <Tab.Screen
                name={ScreenNames.TabDashboard}
                component={Dashboard}
            />
            <Tab.Screen
                name={ScreenNames.TabWatch}
                component={Watch}
            />
            <Tab.Screen
                name={ScreenNames.TabMediaLibrary}
                component={MediaLibrary}
            />
            <Tab.Screen
                name={ScreenNames.TabMore}
                component={More}
            />

        </Tab.Navigator>
    );
}
