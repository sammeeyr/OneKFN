import { ScrollView, Text, View, useColorScheme } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  const dark = useColorScheme() === "dark";
  const colors = dark
    ? { background: "#101010", surface: "#1D1D1D", text: "#F5F5F5", muted: "#B0B0B0", primary: "#B7A5FF" }
    : { background: "#FFFFFF", surface: "#F5F5F5", text: "#171717", muted: "#666666", primary: "#5B3CC4" };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 24, gap: 16 }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: "700" }}>One Kingdom Family Network</Text>
      <Text style={{ color: colors.muted, fontSize: 16 }}>Faith. Family. Community.</Text>
      <View style={{ padding: 18, borderRadius: 16, backgroundColor: colors.surface, gap: 8 }}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}>Welcome to OKFN</Text>
        <Text style={{ color: colors.text }}>Official services, announcements, prayer support and giving in one place.</Text>
        <Link href="/(tabs)/watch" style={{ color: colors.primary }}>Watch or listen to a service →</Link>
      </View>
      <Text style={{ color: colors.muted }}>Official logo and brand colours will be applied when the approved assets are supplied.</Text>
    </ScrollView>
  );
}
