import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Dashboard, Watch, MediaLibrary, More } from '../../screens';
import { ScreenNames } from '../screenNames';
import { colors, fontFamily } from '../../utils/constants';
import { font, heightPixel } from '../../utils/helper';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    if (route.name === ScreenNames.TabDashboard) {
                        return <Ionicons name="grid" size={size} color={color} />;
                    } else if (route.name === ScreenNames.TabWatch) {
                        return <Entypo name="controller-play" size={size + 2} color={color} />;
                    } else if (route.name === ScreenNames.TabMediaLibrary) {
                        return <MaterialIcons name="video-library" size={size + 1} color={color} />;
                    } else if (route.name === ScreenNames.TabMore) {
                        return <Ionicons name="list" size={size + 1} color={color} />;
                    }
                },
                tabBarActiveTintColor: colors.background,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarLabelPosition: 'below-icon',
                tabBarItemStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: heightPixel(10),
                },
                tabBarStyle: {
                    backgroundColor: '#262237',
                    borderTopWidth: 0,
                    height: heightPixel(80),
                    borderTopLeftRadius: 27,
                    borderTopRightRadius: 27,
                    position: 'absolute',
                    overflow: 'hidden',
                    justifyContent: 'center',
                },

                tabBarLabelStyle: {
                    fontSize: font(11),
                    paddingBottom: 8,
                    fontFamily: fontFamily.regular
                },
                headerShown: false,
            })}
        >
            <Tab.Screen
                name={ScreenNames.TabDashboard}
                component={Dashboard}
                options={{ title: 'Dashboard' }}
            />
            <Tab.Screen
                name={ScreenNames.TabWatch}
                component={Watch}
                options={{ title: 'Watch' }}
            />
            <Tab.Screen
                name={ScreenNames.TabMediaLibrary}
                component={MediaLibrary}
                options={{ title: 'Library' }}
            />
            <Tab.Screen
                name={ScreenNames.TabMore}
                component={More}
                options={{ title: 'More' }}
            />
        </Tab.Navigator>
    );
}
