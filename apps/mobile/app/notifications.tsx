import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { ContentCard, ScreenContainer, ScreenHeading, useOKFNTheme } from "../src/components/ui";
import { okfnColors as brand } from "../src/theme/tokens";

const sample = [
  { title: "Live Service Alert", body: "Join us for the next Sunday service.", time: "Service updates", color: "#E5EEFC", mark: "▶" },
  { title: "New Announcement", body: "Read the latest news from the OKFN ministry.", time: "Ministry news", color: "#E5EEFC", mark: "▤" },
  { title: "Prayer Support", body: "Your prayer requests can be managed privately in Prayer.", time: "Member support", color: "#E6F5EC", mark: "♡" },
  { title: "Giving Updates", body: "Official giving information will be shared when available.", time: "Giving", color: "#FFF4D6", mark: "✦" },
];

export default function NotificationsScreen() {
  const c = useOKFNTheme();
  return <ScreenContainer><ScrollView contentContainerStyle={{ paddingBottom: 28, gap: 14 }} showsVerticalScrollIndicator={false}>
    <ScreenHeading eyebrow="Stay in the loop" title="Notifications" subtitle="Important service reminders and ministry updates." />
    <View style={{ flexDirection: "row", gap: 10 }}><View style={{ flex: 1, backgroundColor: brand.royalBlue, padding: 12, borderRadius: 14, alignItems: "center" }}><Text style={{ color: brand.white, fontWeight: "800" }}>All updates</Text></View><View style={{ flex: 1, backgroundColor: c.surface, padding: 12, borderRadius: 14, alignItems: "center", borderWidth: 1, borderColor: c.border }}><Text style={{ color: c.muted, fontWeight: "700" }}>Unread</Text></View></View>
    <ContentCard>{sample.map((item, i) => <View key={item.title}>
      <Link href={(i === 0 ? "/live" : i === 1 ? "/(tabs)/announcements" : i === 2 ? "/prayer" : "/(tabs)/giving") as never} style={{ flexDirection: "row", gap: 12, alignItems: "center", paddingVertical: 12 }}>
        <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: item.color, alignItems: "center", justifyContent: "center" }}><Text style={{ color: brand.royalBlue, fontSize: 18, fontWeight: "800" }}>{item.mark}</Text></View>
        <View style={{ flex: 1, gap: 4 }}><Text style={{ color: c.text, fontWeight: "800" }}>{item.title}</Text><Text style={{ color: c.muted, fontSize: 13, lineHeight: 19 }}>{item.body}</Text><Text style={{ color: c.muted, fontSize: 11 }}>{item.time}</Text></View><Text style={{ color: c.muted, fontSize: 20 }}>›</Text>
      </Link>
      {i < sample.length - 1 ? <View style={{ height: 1, backgroundColor: c.border }} /> : null}
    </View>)}</ContentCard>
  </ScrollView></ScreenContainer>;
}
