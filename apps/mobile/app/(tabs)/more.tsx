import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { ContentCard, ScreenContainer, ScreenHeading, useOKFNTheme } from "../../src/components/ui";
import { okfnColors as brand } from "../../src/theme/tokens";

const links = [
  { title: "Member profile", detail: "Account and sign-in", href: "/(tabs)/profile", icon: "◉" },
  { title: "News & announcements", detail: "Ministry updates and events", href: "/(tabs)/announcements", icon: "▤" },
  { title: "Notifications", detail: "Service alerts and updates", href: "/notifications", icon: "♧" },
  { title: "Settings", detail: "Appearance, account and help", href: "/settings", icon: "⚙" },
];

export default function MoreScreen() {
  const c = useOKFNTheme();
  return <ScreenContainer><ScrollView contentContainerStyle={{ paddingBottom: 28, gap: 14 }} showsVerticalScrollIndicator={false}>
    <ScreenHeading eyebrow="Your OKFN space" title="More" subtitle="Your account, ministry updates and app preferences." />
    <ContentCard style={{ backgroundColor: brand.deepBlue, borderColor: brand.deepBlue }}>
      <Text style={{ color: brand.gold, fontWeight: "800", letterSpacing: 1 }}>ONE FAMILY • ONE KINGDOM</Text>
      <Text style={{ color: brand.white, fontSize: 20, fontWeight: "800" }}>One mission.</Text>
      <Text style={{ color: "#D9E7FF", lineHeight: 21 }}>Everything you need to stay connected to the OKFN family.</Text>
    </ContentCard>
    <ContentCard>{links.map((item, i) => <View key={item.title}>
      <Link href={item.href as never} style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 13 }}>
        <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: "#E5EEFC", alignItems: "center", justifyContent: "center" }}><Text style={{ color: brand.royalBlue, fontSize: 18, fontWeight: "800" }}>{item.icon}</Text></View>
        <View style={{ flex: 1, gap: 4 }}><Text style={{ color: c.text, fontWeight: "700", fontSize: 15 }}>{item.title}</Text><Text style={{ color: c.muted, fontSize: 13 }}>{item.detail}</Text></View>
        <Text style={{ color: c.muted, fontSize: 22 }}>›</Text>
      </Link>
      {i < links.length - 1 ? <View style={{ height: 1, backgroundColor: c.border }} /> : null}
    </View>)}</ContentCard>
    <Text style={{ color: c.muted, textAlign: "center", fontSize: 12 }}>One Kingdom Family Network • Version 0.1.0</Text>
  </ScrollView></ScreenContainer>;
}
