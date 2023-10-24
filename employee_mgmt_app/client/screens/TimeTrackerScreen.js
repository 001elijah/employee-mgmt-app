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
import { selectUserID } from "../redux/selectors/authSelectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimes, registerTime } from "../redux/slices/timeSlice";
import TimeItem from "../components/TimeItem";
import { formatTime } from "../utils/formatTime";
import { SetClockIn } from "../redux/slices/timeSlice";

const TimeTrackerScreen = () => {
  const userId = useSelector(selectUserID);
  const isClockedIn = useSelector((state) => state.time.isClockedIn);
  console.log(isClockedIn);

  const dispatch = useDispatch();
  const { times } = useSelector((state) => state.time);
  // console.log("times", times);
  const [clockInTimestamp, setClockInTimestamp] = useState(null);
  const [showTotalTime, setShowTotalTime] = useState(false);
  const [clockInReadable, setClockInReadable] = useState(null);
  const [clockOutReadable, setClockOutReadable] = useState(null);
  const [clockOutTimestamp, setClockOutTimestamp] = useState(null);
  const [visibleRowsLimit, setVisibleRowsLimit] = useState(5);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString(["se-SE"], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );
  const [currentDay, setCurrentDay] = useState("default", { weekday: "short" });

  const headers = ["Time In", "Time Out", "Date", "Status"];

  const handleClockIn = () => {
    dispatch(SetClockIn(true));
    setShowTotalTime(false);

    const currentTime = Date.now();
    const clockInReadable = formatTime(currentTime);
    setClockOutTimestamp(null);
    setClockInTimestamp(currentTime);
    setClockInReadable(clockInReadable);
  };

  const onShowMoreTimes = () => {
    setVisibleRowsLimit((visibleRowsLimit) => visibleRowsLimit + 5);
  };

  const onShowLessTimes = () => {
    setVisibleRowsLimit((visibleRowsLimit) => visibleRowsLimit - 5);
  };

  // const formatTime = (time) => {
  //   return time.slice(0, 5);
  // };

  const onShowAllTimes = () => {
    if (times.length == visibleRowsLimit) {
      setVisibleRowsLimit(5);
    } else {
      setVisibleRowsLimit(times.length);
    }
  };

  const handleClockOut = () => {
    dispatch(SetClockIn(false));
    setShowTotalTime(true);
    const currentTime = Date.now();
    const clockOutReadable = formatTime(currentTime);

    setClockOutTimestamp(Date.now());
    setClockOutReadable(clockOutReadable);

    const date = new Date().toLocaleDateString("en-GB", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

    dispatch(
      registerTime({
        employee_id: userId,
        time_in: clockInReadable,
        time_out: clockOutReadable,
        date: date,
        status_id: 2,
      }),
    ).then(() => {
      dispatch(fetchTimes(userId));
    });
  };

  useEffect(() => {
    dispatch(fetchTimes(userId));

    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString(["se-SE"], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
      setCurrentDay(
        new Date().toLocaleDateString("en-GB", { weekday: "short" }),
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, userId]);

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
          disabled={isClockedIn}
          className={`${
            isClockedIn
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
              {!isClockedIn ? time : ""}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!isClockedIn}
          className={`${
            isClockedIn
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
              {isClockedIn ? time : ""}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={styles.shadow}
        className="absolute w-full mb-10 h-60 top-[38vh] bg-white rounded-b-[110px] -z-5"
      >
        {showTotalTime && times.length > 0 && (
          <View className=" absolute bottom-5 left-0 right-0 flex-col ml-4 z-50 justify-end items-center">
            <View className="flex-row">
              <Text className="text-black text-xl mr-1 ">Clocked in:</Text>
              <Text className="text-black text-xl  ">
                {clockInReadable ? clockInReadable.slice(0, 5) : ""}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-black text-xl mr-1 ">Clocked Out:</Text>
              <Text className="text-black text-xl  ">
                {clockOutReadable ? clockOutReadable.slice(0, 5) : ""}
              </Text>
            </View>
            <View className="flex-row mr-1">
              <Text className="text-black text-2xl font-semibold">
                Hours worked:{" "}
              </Text>
              <Text className="text-black text-2xl mr-3 font-semibold">
                {times[times.length - 1].total_hours.slice(0, 5)}
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
        <View className=" mx-2 mt-[-38] ">
          <View className="flex-row ">
            {headers.map((header) => (
              <View key={header} className="flex-1 p-2 border bg-[#EFEFEF]">
                <Text className="text-center font-semibold">{header}</Text>
              </View>
            ))}
          </View>

          {times.slice(0, visibleRowsLimit).map((time, index) => (
            <TimeItem
              key={index}
              timeIn={time.time_in.slice(0, 5)}
              timeOut={time.time_out.slice(0, 5)}
              date={time.date}
              status={time.status_id === 1 ? "Pending" : "Complete"}
            />
          ))}
          {times.length > 5 && (
            <View className="flex flex-row mt-2 justify-between px-3 font-semibold back">
              <TouchableOpacity onPress={() => onShowMoreTimes()}>
                <Text className="font-semibold border-b">
                  {times.length > visibleRowsLimit && "Load more.."}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onShowLessTimes()}>
                <Text className="font-semibold border-b">
                  {visibleRowsLimit > 5 ? "Show Less" : ""}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onShowAllTimes()}>
                <Text className="font-semibold border-b">
                  {times.length >= 15 && times.length !== visibleRowsLimit
                    ? "Show all"
                    : "Collapse"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
