import { Tabs } from "expo-router";
import { Platform, Text } from "react-native";
import { okfnColors as brand } from "../../src/theme/tokens";

const icons: Record<string, string> = { index: "⌂", watch: "▶", giving: "✦", prayer: "♡", more: "☷" };

export default function TabLayout() {
  return <Tabs screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: brand.royalBlue,
    tabBarInactiveTintColor: brand.muted,
    tabBarLabelStyle: { fontSize: 10, fontWeight: "700", marginBottom: Platform.OS === "ios" ? 0 : 2 },
    tabBarIcon: ({ color, focused }) => <Text style={{ color: focused ? brand.royalBlue : color, fontSize: 21, fontWeight: focused ? "900" : "600" }}>{icons[route.name] ?? "•"}</Text>,
    tabBarStyle: { backgroundColor: brand.white, borderTopColor: brand.border, borderTopWidth: 1, height: Platform.OS === "ios" ? 84 : 66, paddingTop: 6, paddingBottom: Platform.OS === "ios" ? 24 : 8 },
  })}>
    <Tabs.Screen name="index" options={{ title: "Home", tabBarAccessibilityLabel: "Home" }} />
    <Tabs.Screen name="watch" options={{ title: "Watch", tabBarAccessibilityLabel: "Watch and listen" }} />
    <Tabs.Screen name="giving" options={{ title: "Give", tabBarAccessibilityLabel: "Giving" }} />
    <Tabs.Screen name="prayer" options={{ title: "Prayer", tabBarAccessibilityLabel: "Prayer and support" }} />
    <Tabs.Screen name="more" options={{ title: "More", tabBarAccessibilityLabel: "More options" }} />
    <Tabs.Screen name="announcements" options={{ href: null }} />
    <Tabs.Screen name="profile" options={{ href: null }} />
  </Tabs>;
}
