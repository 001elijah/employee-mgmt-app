import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import DocumentItem from "../components/DocumentItem";
import { useSelector } from "react-redux";
import { selectUserName } from "../redux/selectors/authSelectors";

const documentData = [
  {
    icon: "clock-o",
    label: "Test",
    screen: "DashboardScreen",
    info1: "100kb",
    info2: "Info 2",
    userName: "Erik",
  },
  {
    icon: "file-pdf-o",
    label: "Pdf upload",
    screen: "DashboardScreen",
    info1: "111kb",
    info2: ".pdf",
    userName: "daniel",
  },

  {
    icon: "picture-o",
    label: "Image upload",
    screen: "DashboardScreen",
    info1: "100kb",
    info2: ".img",
  },
  {
    icon: "file-text-o",
    label: "Text uploadaass",
    screen: "DashboardScreen",
    info1: "56kb",
    info2: ".txt",
  },
  {
    icon: "picture-o",
    label: "Image uploadee",
    screen: "DashboardScreen",
    info1: "100kb",
    info2: ".img",
  },
  {
    icon: "file-text-o",
    label: "Text uploadrr",
    screen: "DashboardScreen",
    info1: "56kb",
    info2: ".txt",
  },
  {
    icon: "picture-o",
    label: "Image uploadsa",
    screen: "DashboardScreen",
    info1: "100kb",
    info2: ".img",
  },
  {
    icon: "file-text-o",
    label: "Text uploads",
    screen: "DashboardScreen",
    info1: "56kb",
    info2: ".txt",
  },
  {
    icon: "picture-o",
    label: "Test1",
    screen: "DashboardScreen",
    info1: "100kb",
    info2: ".img",
  },
  {
    icon: "file-text-o",
    label: "test2",
    screen: "DashboardScreen",
    info1: "56kb",
    info2: ".txt",
  },
  {
    icon: "picture-o",
    label: "Test4",
    screen: "DashboardScreen",
    info1: "100kb",
    info2: ".img",
  },
  {
    icon: "file-text-o",
    label: "test3",
    screen: "DashboardScreen",
    info1: "56kb",
    info2: ".txt",
  },
];

const UploadDocsScreen = () => {
  const [text, setText] = useState("");
  const [filteredData, setFilteredData] = useState(documentData);

  const userName = useSelector(selectUserName);
  console.log("userName", userName);
  useEffect(() => {
    if (text === "") {
      setFilteredData(documentData);
    } else {
      const filteredData = documentData.filter((doc) => {
        const searchText = text.toLowerCase();

        return (
          doc.label.toLowerCase().includes(searchText) ||
          doc.info1.toLowerCase().includes(searchText) ||
          doc.info2.toLowerCase().includes(searchText) ||
          (doc.userName && doc.userName.toLowerCase().includes(searchText))
        );
      });
      setFilteredData(filteredData);
    }
  }, [text]);

  return (
    <View className="bg-[#4D91D5]">
      <View className="">
        <Header title="Documents" avatarbg="bg-blue-400" />
      </View>
      <View className="bg-[#E7E5FF] h-full rounded-[25px] items-center">
        <View className="flex-row">
          <TextInput
            placeholder="Search..."
            className="bg-white rounded-[15px] h-10 w-80  mt-10  pl-2 text-lg text-gray-500"
            onChangeText={(text) => setText(text)}
            value={text}
          ></TextInput>
          {text !== "" && (
            <TouchableOpacity
              onPress={() => setText("")}
              className="bg-black rounded-r-[15px] w-8 h-10 justify-center items-center mt-10 ml-[-25]"
            >
              <Text className="text-white font-bold ">X</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView className="mb-24 max-h-[70vh] m-2">
          <View className="flex flex-row justify-center  flex-wrap mt-5">
            {filteredData.length === 0 && (
              <Text className="text-center text-lg text-gray-700 mt-5 font-semibold">
                Inga dokument hittades...
              </Text>
            )}
            {filteredData.map((doc) => (
              <DocumentItem
                key={doc.label}
                icon={doc.icon}
                label={doc.label}
                info1={doc.info1}
                info2={doc.info2}
                screen={doc.screen}
              />
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity className="m-[-45px] z-10 ">
          <Icon name="plus-circle" size={100} color="#444" className="" />
          <View className="border-2 z-50"></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadDocsScreen;
