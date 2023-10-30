import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import DocumentItem from "../components/DocumentItem";
import { useSelector } from "react-redux";
import { selectUserName } from "../redux/selectors/authSelectors";
import ModalContent from "../components/ModalContent";

const documentData = [
  {
    icon: "clock-o",
    label: "Test",
    title: "Recite for lunch",
    description: "Recite for lunch, with the whole team",
    uploadDate: "2021-05-05",
    fileSize: "100kb",
    fileType: ".Img",
    userName: "Erik",
  },
  {
    icon: "file-pdf-o",
    label: "Pdf upload",
    fileSize: "111kb",
    fileType: ".pdf",
    userName: "daniel",
    title: "Bookkeeping",
    description: "Bookkeeping for the month of May",
    uploadDate: "2022-05-05",
  },

  {
    icon: "picture-o",
    label: "Image upload",
    fileSize: "100kb",
    fileType: ".img",
    title: "Picture of the team",
    description: "Picture of the team, taken at the office",
    uploadDate: "2023-05-05",
  },
  {
    icon: "file-text-o",
    label: "Text uploadaass",
    fileSize: "56kb",
    fileType: ".txt",
    title: "Recite for lunch",
    description: "Recite for lunch, with the whole team",
    uploadDate: "2021-05-05",
  },
  {
    icon: "picture-o",
    label: "Image uploadee",
    fileSize: "100kb",
    fileType: ".img",
  },
  {
    icon: "file-text-o",
    label: "Text uploadrr",
    fileSize: "56kb",
    fileType: ".txt",
  },
  {
    icon: "picture-o",
    label: "Image uploadsa",
    fileSize: "100kb",
    fileType: ".img",
  },
  {
    icon: "file-text-o",
    label: "Text uploads",
    fileSize: "56kb",
    fileType: ".txt",
  },
  {
    icon: "picture-o",
    label: "Test1",
    fileSize: "100kb",
    fileType: ".img",
  },
  {
    icon: "file-text-o",
    label: "test2",
    fileSize: "56kb",
    fileType: ".txt",
  },
  {
    icon: "picture-o",
    label: "Test4",
    fileSize: "100kb",
    fileType: ".img",
  },
  {
    icon: "file-text-o",
    label: "test3",
    fileSize: "56kb",
    fileType: ".txt",
  },
];

const UploadDocsScreen = () => {
  const [text, setText] = useState("");
  const [filteredData, setFilteredData] = useState(documentData);
  const [selectedDocument, setSelectedDocument] = useState(false);

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
                No matches...
              </Text>
            )}
            {filteredData.map((doc) => (
              <DocumentItem
                key={doc.label}
                icon={doc.icon}
                label={doc.label}
                info1={doc.fileSize}
                info2={doc.fileType}
                onPress={() => setSelectedDocument(doc)}
              />
            ))}
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedDocument}
          onRequestClose={() => setSelectedDocument(null)}
        >
          <ModalContent
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
          />
        </Modal>
        <TouchableOpacity className="m-[-45px] z-10 ">
          <Icon name="plus-circle" size={100} color="#444" className="" />
          <View className="border-2 z-50"></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadDocsScreen;
