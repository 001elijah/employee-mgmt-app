import React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import handleDownload from "../utils/handleDownload";

const ModalContent = ({ document, onClose }) => {
  if (!document) return null;

  console.log("document", document);
  console.log("document.localFilePath", document.file_path);
  console.log("document.title", document.title);
  return (
    <View className="flex justify-center items-center bg-stone-500/80 h-full">
      <View className="p-6 m-3 bg-[#E7E5FF] rounded-lg shadow-lg ">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-blue-700">
            {document.title}
          </Text>
          <TouchableOpacity
            className="bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center"
            onPress={onClose}
          >
            <Text className="text-lg font-semibold text-white">X</Text>
          </TouchableOpacity>
        </View>
        <View className="mb-4">
          <Text className="font-semibold text-lg">Description:</Text>
          <Text className="text-gray-600">{document.description}</Text>
        </View>
        <View className="mb-4 space-y-2">
          <View className="flex-row">
            <View className="flex-row w-1/2">
              <Text className="font-semibold">File size:</Text>
              <Text className="ml-2">{document.file_size_kb}kb</Text>
            </View>
            <View className="flex-row">
              <Text className="ml-4 font-semibold">File type:</Text>
              <Text className="ml-2">.{document.file_type}</Text>
            </View>
          </View>
          <View className="flex-row ">
            <View className="w-1/2">
              <Text className="font-semibold">Uploaded by:</Text>
              <Text className="">{document.username}</Text>
            </View>
            <View className="">
              <Text className="ml-4 font-semibold">Uploaded date:</Text>
              <Text className="ml-4">{document.uploadDate}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="bg-blue-700 text-white rounded-full py-2 px-4 text-center hover:bg-indigo-700"
          onPress={() => handleDownload()}
        >
          <Text className="text-lg font-semibold text-white text-center">
            Download Document
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalContent;
