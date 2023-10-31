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
import DocumentItem from "../components/DocumentItem";
import { useSelector, useDispatch } from "react-redux";
import { selectUserName, selectUserID } from "../redux/selectors/authSelectors";
import ModalContent from "../components/ModalContent";
import { fetchDocuments } from "../redux/slices/documentsSlice";

const UploadDocsScreen = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state.document.documents);
  const userId = useSelector(selectUserID);

  const [text, setText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(false);

  const userName = useSelector(selectUserName);
  console.log("userName", userName);
  console.log("documents", documents);
  console.log("userId", userId);

  useEffect(() => {
    dispatch(fetchDocuments(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (text === "") {
      setFilteredData(documents);
    } else {
      const searchText = text.toLowerCase();
      const filteredData = documents.filter((doc) => {
        return (
          doc.title.toLowerCase().includes(searchText) ||
          doc.description.toLowerCase().includes(searchText) ||
          (doc.file_type && doc.file_type.toLowerCase().includes(searchText)) ||
          (doc.file_size && doc.file_size.toLowerCase().includes(searchText)) ||
          (doc.username && doc.username.toLowerCase().includes(searchText))
        );
      });
      setFilteredData(filteredData);
    }
  }, [text, documents]);

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
            {Array.isArray(filteredData) && filteredData.length === 0 && (
              <Text className="text-center text-lg text-gray-700 mt-5 font-semibold">
                No matches...
              </Text>
            )}
            {Array.isArray(filteredData) &&
              filteredData.map((doc) => (
                <DocumentItem
                  key={doc.id}
                  icon={
                    doc.file_type === "png" || doc.file_type === "jpg"
                      ? "picture-o"
                      : "file-pdf-o"
                  }
                  label={doc.title}
                  info1={doc.file_size_kb}
                  info2={doc.file_type}
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
      </View>
    </View>
  );
};

export default UploadDocsScreen;
