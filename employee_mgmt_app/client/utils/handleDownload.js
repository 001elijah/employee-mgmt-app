// import * as MediaLibrary from "expo-media-library";
// import * as FileSystem from "expo-file-system";

// const handleDownload = async () => {
//   const localFilePath = "http://192.168.1.69:8080/111222.png";
//   const fileName = "111222.png";
//   const destUri = FileSystem.documentDirectory + fileName;

//   try {
//     const { uri } = await FileSystem.downloadAsync(localFilePath, destUri);
//     console.log("Finished downloading to ", uri);

//     const asset = await MediaLibrary.createAssetAsync(uri);
//     await MediaLibrary.createAlbumAsync("Download", asset, false);
//   } catch (e) {
//     console.error(e);
//   }
// };

// export default handleDownload;
