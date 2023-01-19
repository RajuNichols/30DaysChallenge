import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";

export default function App() {
  let [fontsLoaded, error] = useFonts({
    Inter_900Black,
  });
  if (fontsLoaded) {
    <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>30 Days Challenge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#123166",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    display: "flex",
  },
  text: {
    fontFamily: "Inter_900Black",
    color: "white",
    fontSize: 30,
    textAlign: "center",
    width: "100%",
    height: 300,
    position: "absolute",
  },
});
