import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { okfnColors } from "../../src/theme/tokens";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: okfnColors.royalBlue,
        tabBarInactiveTintColor: okfnColors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginBottom: Platform.OS === "ios" ? 0 : 2 },
        tabBarStyle: {
          backgroundColor: okfnColors.white,
          borderTopColor: okfnColors.border,
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 84 : 66,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarAccessibilityLabel: "Home" }} />
      <Tabs.Screen name="watch" options={{ title: "Watch", tabBarAccessibilityLabel: "Watch and listen" }} />
      <Tabs.Screen name="announcements" options={{ title: "News", tabBarAccessibilityLabel: "Announcements and news" }} />
      <Tabs.Screen name="giving" options={{ title: "Give", tabBarAccessibilityLabel: "Giving" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarAccessibilityLabel: "Member profile" }} />
    </Tabs>
  );
}
