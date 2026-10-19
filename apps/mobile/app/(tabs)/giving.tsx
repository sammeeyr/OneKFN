import { Text, View, useColorScheme } from "react-native";
export default function GivingScreen() {
  const dark = useColorScheme() === "dark";
  return <View style={{ flex: 1, padding: 24, gap: 12, backgroundColor: dark ? "#101010" : "#FFFFFF" }}>
    <Text style={{ color: dark ? "#F5F5F5" : "#171717", fontSize: 26, fontWeight: "700" }}>Tithes & Offerings</Text>
    <Text style={{ color: dark ? "#B0B0B0" : "#666666" }}>Payment methods remain disabled until merchant verification and secure server-side payment flows are implemented.</Text>
  </View>;
}
