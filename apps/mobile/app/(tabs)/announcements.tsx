import { Text, View, useColorScheme } from "react-native";
export default function AnnouncementsScreen() {
  const dark = useColorScheme() === "dark";
  return <View style={{ flex: 1, padding: 24, gap: 12, backgroundColor: dark ? "#101010" : "#FFFFFF" }}>
    <Text style={{ color: dark ? "#F5F5F5" : "#171717", fontSize: 26, fontWeight: "700" }}>Announcements</Text>
    <Text style={{ color: dark ? "#B0B0B0" : "#666666" }}>Announcements will be loaded from the backend.</Text>
  </View>;
}
