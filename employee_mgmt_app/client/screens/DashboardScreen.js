import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import DashboardCard from "../components/DashboardCard";
import Icon from "react-native-vector-icons/FontAwesome";
import { selectToken } from "../redux/selectors/authSelectors";
import { logoutUser } from "../redux/operations/authOperations";
import { useDispatch, useSelector } from "react-redux";

const dashboardItems = [
  { id: 1, icon: "user", label: "Profile", screen: "HomeScreen" },
  {
    id: 2,
    icon: "users",
    label: "Manage users",
    screen: "EmployeeManagementStack",
  },
  {
    id: 3,
    icon: "clock-o",
    label: "Time Tracker",
    screen: "TimeTrackerScreen",
  },
  { id: 4, icon: "history", label: "History", screen: "HistoryScreen" },
  {
    id: 5,
    icon: "calendar",
    label: "Booking & Calendar",
    screen: "CalendarScreen",
  },
  { id: 6, icon: "file-text-o", label: "Report", screen: "ReportScreen" },
  { id: 7, icon: "upload", label: "Upload Docs", screen: "UploadDocsScreen" },
  {
    id: 8,
    icon: "calculator",
    label: "Payment System",
    screen: "PaymentSystemScreen",
  },
];

function DashboardScreen() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const handleLogout = () => {
    if (token) dispatch(logoutUser());
  };

  return (
    <ScrollView className="mb-24">
      <View className=" flex-row mt-10 mb-4 justify-between">
        <Text className="text-black font-bold text-4xl tracking-wider pl-4 ">
          Dashboard
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          className="mr-4"
          onPress={handleLogout}
        >
          <Icon name="sign-out" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-row flex-wrap justify-center">
        {dashboardItems.map((item) => (
          <DashboardCard
            key={item.id}
            icon={item.icon}
            label={item.label}
            screen={item.screen}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export default DashboardScreen;
