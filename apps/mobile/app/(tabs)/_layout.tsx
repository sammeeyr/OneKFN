import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="watch" options={{ title: "Watch" }} />
      <Tabs.Screen name="announcements" options={{ title: "News" }} />
      <Tabs.Screen name="giving" options={{ title: "Giving" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
