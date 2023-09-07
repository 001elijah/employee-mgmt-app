/*
import * as React from "react";
import {View, Text} from 'react-native';
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';


const homePage = 'HomeScreen';
const listScreen = 'ListScreen';

const Tab = createBottomTabNavigator();


const NavigationBar = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName={homePage} screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let routeName = route.name;

                    if (routeName === homePage) { iconName = focused ? 'home' : 'home-outline'; } 

                    else if (routeName === listScreen) { iconName = focused ? 'list' : 'list-outline'; }

                    return <Ionicons name={iconName} size={size} color={color}/>

                },
        })}>

            <Tab.Screen name={homePage} component={HomeScreen} />

            </Tab.Navigator>

        </NavigationContainer>
    );
};

export default NavigationBar;
*/
