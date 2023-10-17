import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import HistoryScreen from "./HistoryScreen";
import MessagesScreen from "./MessagesScreen";
import AddEmployeeScreen from "./AddEmployeeScreen";
import HomeIcon from "../assets/icons/HomeIcon";
import BookIcon from "../assets/icons/BookIcon";
import MessageIcon from "../assets/icons/MessageIcon";
import DashboardScreen from "./DashboardScreen";
import { Platform, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectIsAuth, selectUserRole } from "../redux/selectors/authSelectors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserManagementScreen from "./UserManagementScreen";
import TimeTrackerScreen from "./TimeTrackerScreen";
import CalendarScreen from "./CalendarScreen";
import ReportScreen from "./ReportScreen";
import UploadDocsScreen from "./UploadDocsScreen";
import PaymentSystemScreen from "./PaymentSystemScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const EmployeeManagementStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        // options={{ headerShown: false }}
        name="UserManagementScreen"
        component={UserManagementScreen}
      ></Stack.Screen>
      <Stack.Screen
        // options={{ headerShown: false }}
        name="AddEmployeeScreen"
        component={AddEmployeeScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        // options={{ headerShown: false }}
        name="DashboardScreen"
        component={DashboardScreen}
      ></Stack.Screen>
      <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
      <Stack.Screen
        animationEnabled={false}
        name="EmployeeManagementStack"
        component={EmployeeManagementStack}
      ></Stack.Screen>
      <Stack.Screen
        name="TimeTrackerScreen"
        component={TimeTrackerScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
      ></Stack.Screen>
      <Stack.Screen name="ReportScreen" component={ReportScreen}></Stack.Screen>
      <Stack.Screen
        name="UploadDocsScreen"
        component={UploadDocsScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="PaymentSystemScreen"
        component={PaymentSystemScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const Home = ({ navigation }) => {
  const isAuthorized = useSelector(selectIsAuth);
  const role = useSelector(selectUserRole);

  useEffect(() => {
    !isAuthorized && navigation.replace("Auth");
  }, [isAuthorized]);
  return (
    <Tab.Navigator
      initialRouteName={"Dashboard"}
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS !== "ios",
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#858EA9",
        tabBarStyle: {
          position: "absolute",
          height: 84,
          paddingTop: 3,
          alignItems: "center",
          justifyContent: "space-around",
          border: "none",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#FFF",
        },
      }}
    >
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full ${
                focused ? "bg-[#2578CC]" : "bg-[#FFF]"
              } items-center justify-center`}
            >
              <HomeIcon fill={color} />
            </View>
          ),
          title: "Home",
          tabBarShowLabel: false,
        }}
      />
      {/* <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full ${
                focused ? "bg-[#2578CC]" : "bg-[#FFF]"
              } items-center justify-center`}
            >
              <BookIcon fill={color} />
            </View>
          ),
          title: "History",
          tabBarShowLabel: false,
        }}
      /> */}
      <Tab.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`w-12 h-12 rounded-full ${
                focused ? "bg-[#2578CC]" : "bg-[#FFF]"
              } items-center justify-center`}
            >
              <MessageIcon fill={color} />
            </View>
          ),
          title: "Messages",
          tabBarShowLabel: false,
        }}
      />
      {/* {role !== "staff" && (
        <Tab.Screen
          name="AddEmployeeScreen"
          component={AddEmployeeScreen}
          headerShown={false}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View
                className={`w-12 h-12 rounded-full ${
                  focused ? "bg-[#2578CC]" : "bg-[#FFF]"
                } items-center justify-center`}
              >
                <Text
                  className={`text-4xl ${focused ? "text-white" : "text-grey"}`}
                >
                  +
                </Text>
              </View>
            ),
            title: "",
            tabBarShowLabel: false,
          }}
        />
      )} */}
    </Tab.Navigator>
  );
};

export default Home;
