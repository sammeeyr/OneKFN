import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { ContentCard, ScreenContainer, ScreenHeading, useOKFNTheme } from "../src/components/ui";
import { okfnColors as brand } from "../src/theme/tokens";

const rows = [
  { title: "Member profile", detail: "Account and sign-in", href: "/(tabs)/profile" as const },
  { title: "Prayer & support", detail: "Submit a private prayer request", href: "/prayer" as const },
  { title: "Announcements", detail: "Updates from the ministry", href: "/(tabs)/announcements" as const },
  { title: "Watch & listen", detail: "Official service streams", href: "/(tabs)/watch" as const },
];

export default function SettingsScreen() {
  const c = useOKFNTheme();
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 28, gap: 14 }} showsVerticalScrollIndicator={false}>
        <ScreenHeading eyebrow="Personalize your experience" title="Settings & Help" subtitle="Find your account, ministry content and support options." />
        <ContentCard>
          {rows.map((row, index) => <View key={row.title}>
            <Link href={row.href} style={{ paddingVertical: 12, flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "#E5EEFC", alignItems: "center", justifyContent: "center" }}><Text style={{ color: brand.royalBlue, fontSize: 17, fontWeight: "800" }}>{["◉", "♡", "▤", "▶"][index]}</Text></View>
              <View style={{ flex: 1, gap: 4 }}><Text style={{ color: c.text, fontSize: 15, fontWeight: "700" }}>{row.title}</Text><Text style={{ color: c.muted, fontSize: 13 }}>{row.detail}</Text></View>
              <Text style={{ color: c.muted, fontSize: 20 }}>›</Text>
            </Link>
            {index < rows.length - 1 ? <View style={{ height: 1, backgroundColor: c.border }} /> : null}
          </View>)}
        </ContentCard>
        <ContentCard>
          <Text style={{ color: c.text, fontSize: 16, fontWeight: "800" }}>About One Kingdom Family Network</Text>
          <Text style={{ color: c.muted, fontSize: 14, lineHeight: 21 }}>One Family. One Kingdom. One Mission.</Text>
          <Text style={{ color: c.muted, fontSize: 12 }}>OKFN mobile app • Version 0.1.0</Text>
        </ContentCard>
      </ScrollView>
    </ScreenContainer>
  );
}
