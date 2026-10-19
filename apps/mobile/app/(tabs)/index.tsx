import { Link } from "expo-router";
import { ScrollView, Text, View, useColorScheme } from "react-native";
import { okfnColors as brand } from "../../src/theme/tokens";

export default function HomeScreen() {
  const dark = useColorScheme() === "dark";
  const c = dark
    ? { background: brand.darkBackground, surface: brand.darkSurface, text: brand.darkText, muted: brand.darkMuted, border: "#243A5A" }
    : { background: brand.mist, surface: brand.white, text: brand.ink, muted: brand.muted, border: brand.border };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: c.background }}
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 28, gap: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <View style={{ flex: 1, gap: 3 }}>
          <Text style={{ color: brand.royalBlue, fontSize: 12, fontWeight: "700", letterSpacing: 1.2 }}>ONE KINGDOM FAMILY NETWORK</Text>
          <Text style={{ color: c.text, fontSize: 24, fontWeight: "800" }}>One family. One kingdom.</Text>
          <Text style={{ color: c.muted, fontSize: 14 }}>One mission.</Text>
        </View>
        <View accessibilityLabel="OKFN brand mark" style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: "#E5EEFC", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: c.border }}>
          <Text style={{ color: brand.royalBlue, fontSize: 21, fontWeight: "800" }}>OK</Text>
        </View>
      </View>

      <View style={{ backgroundColor: brand.deepBlue, borderRadius: 20, padding: 20, gap: 12, overflow: "hidden" }}>
        <View style={{ alignSelf: "flex-start", backgroundColor: brand.gold, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 }}>
          <Text style={{ color: brand.deepBlue, fontSize: 11, fontWeight: "800" }}>GATHER • WORSHIP • GROW</Text>
        </View>
        <Text style={{ color: brand.white, fontSize: 23, lineHeight: 29, fontWeight: "800" }}>Stay connected to the family.</Text>
        <Text style={{ color: "#D9E7FF", fontSize: 14, lineHeight: 21 }}>Watch services, follow ministry updates and find support in one place.</Text>
        <Link href="/(tabs)/watch" style={{ alignSelf: "flex-start", color: brand.deepBlue, backgroundColor: brand.white, overflow: "hidden", paddingHorizontal: 16, paddingVertical: 11, borderRadius: 12, fontSize: 14, fontWeight: "700" }}>Watch a service  →</Link>
      </View>

      <View style={{ gap: 12 }}>
        <Text style={{ color: c.text, fontSize: 19, fontWeight: "800" }}>Quick access</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {[
            { title: "Watch", mark: "▶", href: "/(tabs)/watch" as const, tint: "#E7F0FF" },
            { title: "Prayer", mark: "♡", href: "/(tabs)/profile" as const, tint: "#FFF4D6" },
            { title: "Give", mark: "✦", href: "/(tabs)/giving" as const, tint: "#E1F5EB" },
            { title: "News", mark: "▤", href: "/(tabs)/announcements" as const, tint: "#F0EAFE" },
          ].map((item) => (
            <Link key={item.title} href={item.href} style={{ flex: 1, minHeight: 82, backgroundColor: c.surface, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 4, alignItems: "center", justifyContent: "center", gap: 8, borderWidth: 1, borderColor: c.border }}>
              <View style={{ width: 34, height: 34, borderRadius: 12, backgroundColor: item.tint, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: brand.royalBlue, fontSize: 17, fontWeight: "800" }}>{item.mark}</Text>
              </View>
              <Text style={{ color: c.text, fontSize: 12, fontWeight: "700" }}>{item.title}</Text>
            </Link>
          ))}
        </View>
      </View>

      <View style={{ backgroundColor: c.surface, borderRadius: 18, padding: 18, gap: 8, borderWidth: 1, borderColor: c.border }}>
        <Text style={{ color: c.text, fontSize: 18, fontWeight: "800" }}>Upcoming at OKFN</Text>
        <Text style={{ color: c.muted, fontSize: 14, lineHeight: 21 }}>Service times and events will appear here when published by the ministry.</Text>
        <Link href="/(tabs)/announcements" style={{ color: brand.royalBlue, fontSize: 14, fontWeight: "700" }}>View announcements  →</Link>
      </View>

      <View style={{ gap: 5 }}>
        <Text style={{ color: c.text, fontSize: 16, fontWeight: "800" }}>A family connected by faith</Text>
        <Text style={{ color: c.muted, fontSize: 13, lineHeight: 19 }}>Official updates, worship resources and community support—wherever you are.</Text>
      </View>
    </ScrollView>
  );
}
