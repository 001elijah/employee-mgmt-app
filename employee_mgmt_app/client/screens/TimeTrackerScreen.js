import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import GoBack from "../components/GoBack";
import { Ionicons } from "@expo/vector-icons";
import { getTimeDifference } from "../utils/getTimeDifference";

const TimeTrackerScreen = () => {
  const [clockIn, setClockIn] = useState(false);
  const [clockInTimestamp, setClockInTimestamp] = useState(null);
  const [clockInReadable, setClockInReadable] = useState(null);
  const [clockOutReadable, setClockOutReadable] = useState(null);
  const [clockOutTimestamp, setClockOutTimestamp] = useState(null);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );
  const [currentDay, setCurrentDay] = useState("default", { weekday: "short" });
  const [tableData, setTableData] = useState([]);

  const headers = ["Time In", "Time Out", "Date", "Status"];

  // const currentTime = new Date().toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  const handleClockIn = () => {
    setClockIn(true);
    const currentTime = Date.now();
    const clockInReadable = new Date(currentTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setClockOutTimestamp(null);
    setClockInTimestamp(currentTime);
    setClockInReadable(clockInReadable);

    setTableData((prevData) => [
      ...prevData,
      {
        timeIn: clockInReadable,
        timeOut: null,
        date:
          new Date(currentTime)
            .toLocaleDateString("en-GB")
            .toString()
            .slice(0, 5) +
          "-" +
          new Date(currentTime)
            .toLocaleDateString("en-GB")
            .toString()
            .slice(-2),
        status: "Pending",
      },
    ]);
  };

  const handleClockOut = () => {
    setClockIn(false);
    const clockOutReadable = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setClockOutTimestamp(Date.now());
    setClockOutReadable(clockOutReadable);

    setTableData((prevData) => {
      const newData = [...prevData];
      newData[newData.length - 1].timeOut = clockOutReadable;
      newData[newData.length - 1].status = "Complete";
      return newData;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
      setCurrentDay(
        new Date().toLocaleDateString("en-GB", { weekday: "short" }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView className="bg-[#4D91D5] h-full">
      <View className="flex-row mt-10 justify-center">
        <GoBack color="white" />
        <Text className="text-3xl font-bold text-white ">Time Tracker</Text>
      </View>

      <View className="flex-col justify-center mb-8 items-center mt-3">
        <Text className="text-xl  text-white">{currentDay}</Text>
        <Text className="text-xl  text-white">{time}</Text>
      </View>

      <View className="flex-row h-[30vh] bg-white justify-center gap-2 px-5 mx-3  py-2 rounded-3xl z-10 shadow-inner ">
        <TouchableOpacity
          disabled={clockIn}
          className={`${
            clockIn
              ? "opacity-40 h-52 rounded-[30px] flex-col items-center bg-[#4D91D5] w-1/2 justify-around "
              : " rounded-[30px] h-52 flex-col items-center bg-[#4D91D5] w-1/2 justify-around "
          } `}
          onPress={() => handleClockIn()}
        >
          <View className="flex flex-col items-center">
            <Ionicons name="checkmark-circle-outline" size={80} color="white" />
            <Text className="text-white text-3xl font-semibold text-center">
              Clock In
            </Text>
          </View>
          <View className="">
            <Text className="text-white text-2xl  text-center">
              {!clockIn ? time : clockInReadable}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!clockIn}
          className={`${
            clockIn
              ? " rounded-[30px] h-52 flex-col items-center bg-[#EA4343] w-1/2 justify-around "
              : "opacity-40 h-52 rounded-[30px] flex-col items-center bg-[#EA4343] w-1/2 justify-around "
          } `}
          onPress={() => handleClockOut()}
        >
          <View className="flex flex-col items-center">
            <Ionicons name="close-circle-outline" size={80} color="white" />
            <Text className="text-white text-3xl font-semibold text-center">
              Clock Out
            </Text>
          </View>
          <View className="">
            <Text className="text-white text-2xl  text-center">
              {clockIn ? time : ""}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={styles.shadow}
        className="absolute w-full mb-10 h-60 top-[38vh] bg-white rounded-b-[110px] -z-5"
      >
        {clockInTimestamp && clockOutTimestamp && (
          <View className=" absolute bottom-5 left-0 right-0 flex-col ml-4 z-50 justify-end items-center">
            <View className="flex-row">
              <Text className="text-black text-xl mr-1 ">Clocked in:</Text>
              <Text className="text-black text-xl  ">
                {clockInReadable ? clockInReadable : ""}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-black text-xl mr-1 ">Clocked Out:</Text>
              <Text className="text-black text-xl  ">
                {clockOutReadable ? clockOutReadable : ""}
              </Text>
            </View>
            <View className="flex-row mr-1">
              <Text className="text-black text-2xl font-semibold">
                Hours worked:
              </Text>
              <Text className="text-black text-2xl mr-3 font-semibold">
                {clockOutTimestamp
                  ? getTimeDifference(clockInTimestamp, clockOutTimestamp)
                  : "0h 0m"}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* bg-[#4D91D5] <- Show PO blue bg instead of yellow */}
      <View className="bg-yellow-200 mt-52 w-full min-h-[22vh] pb-24">
        <Text className="absolute text-xl text-white ml-3 font-semibold mt-[-68] ">
          History
        </Text>
        <View className=" mx-2 bg-red-500 mt-[-38] ">
          <View className="flex-row ">
            {headers.map((header) => (
              <View key={header} className="flex-1 p-2 border bg-[#EFEFEF]">
                <Text className="text-center font-semibold">{header}</Text>
              </View>
            ))}
          </View>

          {tableData.map((record, index) => (
            <View key={index} className="flex-row border-b bg-white">
              <View className="flex-1 p-2 border">
                <Text className="text-center">{record.timeIn}</Text>
              </View>
              <View className="flex-1 p-2 border">
                <Text className="text-center">{record.timeOut}</Text>
              </View>
              <View className="flex-1 p-2 border">
                <Text className="text-center">{record.date}</Text>
              </View>
              <View className="flex-1 p-2 border">
                <Text className="text-center">{record.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,

    elevation: 8,
  },
});

export default TimeTrackerScreen;
