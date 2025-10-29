import { SafeAreaView, StatusBar } from "react-native";
import { valoraTheme } from "./lib/theme";
import { CameraUploadScreen } from "./screens/CameraUploadScreen";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: valoraTheme.colors.background }}>
      <StatusBar barStyle="light-content" />
      <CameraUploadScreen />
    </SafeAreaView>
  );
}
