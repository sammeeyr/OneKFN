import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { okfnColors as brand } from "../../src/theme/tokens";
import { useOKFNTheme } from "../../src/components/ui";

function BrandMark({ size = 54 }: { size?: number }) {
  return <View accessibilityLabel="One Kingdom Family Network gold dove and blue globe logo" style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
    <Text style={{ position: "absolute", top: -4, zIndex: 2, fontSize: size * 0.47, color: brand.gold }}>🕊</Text>
    <View style={{ width: size * 0.68, height: size * 0.68, marginTop: size * 0.22, borderWidth: Math.max(2, size * 0.055), borderColor: brand.royalBlue, borderRadius: size, backgroundColor: "#E5EEFC", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: brand.royalBlue, fontSize: size * 0.31 }}>🌐</Text>
    </View>
  </View>;
}

export default function HomeScreen() {
  const c = useOKFNTheme();
  const quick = [
    { title: "Watch", mark: "▶", href: "/(tabs)/watch" as const, tint: "#E7F0FF" },
    { title: "Give", mark: "✦", href: "/(tabs)/giving" as const, tint: "#FFF4D6" },
    { title: "Prayer", mark: "♡", href: "/(tabs)/prayer" as const, tint: "#E1F5EB" },
    { title: "News", mark: "▤", href: "/(tabs)/announcements" as const, tint: "#F0EAFE" },
  ];
  return <ScrollView style={{ flex: 1, backgroundColor: c.background }} contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 18, paddingBottom: 30, gap: 18 }} showsVerticalScrollIndicator={false}>
    <View style={{ flexDirection: "row", alignItems: "center", gap: 11 }}>
      <BrandMark size={56} />
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={{ color: brand.royalBlue, fontSize: 11, fontWeight: "900", letterSpacing: 1 }}>ONE KINGDOM FAMILY NETWORK</Text>
        <Text style={{ color: c.text, fontSize: 18, fontWeight: "900" }}>One family. One kingdom.</Text>
        <Text style={{ color: c.muted, fontSize: 12 }}>One mission.</Text>
      </View>
      <Link href="/notifications" accessibilityLabel="Notifications" style={{ width: 42, height: 42, borderRadius: 14, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, alignItems: "center", justifyContent: "center", textAlign: "center", textAlignVertical: "center", color: brand.royalBlue, fontSize: 21 }}>♧</Link>
    </View>

    <View style={{ borderRadius: 22, padding: 20, gap: 11, backgroundColor: brand.deepBlue, overflow: "hidden" }}>
      <Text style={{ color: brand.gold, fontSize: 11, fontWeight: "900", letterSpacing: 1.2 }}>OCTOBER EDITION • IN HIS PRESENCE</Text>
      <Text style={{ color: brand.white, fontSize: 31, lineHeight: 35, fontWeight: "900", letterSpacing: 0.2 }}>IN HIS{"\n"}PRESENCE</Text>
      <Text style={{ color: "#D9E7FF", fontSize: 14, lineHeight: 21 }}>A gathering for worship, prayer and the Word. Stay connected with the next ministry event.</Text>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}><Text style={{ color: brand.white, fontWeight: "700", fontSize: 12 }}>EVENT • WORSHIP • FELLOWSHIP</Text></View>
      <Link href="/(tabs)/announcements" style={{ alignSelf: "flex-start", backgroundColor: brand.white, color: brand.deepBlue, paddingHorizontal: 16, paddingVertical: 11, borderRadius: 12, fontSize: 13, fontWeight: "900" }}>View ministry updates  →</Link>
      <View pointerEvents="none" style={{ position: "absolute", right: -14, bottom: -35, opacity: 0.15 }}><BrandMark size={180} /></View>
    </View>

    <View style={{ gap: 11 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}><Text style={{ color: c.text, fontSize: 19, fontWeight: "900" }}>Quick access</Text><Text style={{ color: c.muted, fontSize: 12 }}>Your OKFN family</Text></View>
      <View style={{ flexDirection: "row", gap: 9 }}>
        {quick.map(item => <Link key={item.title} href={item.href} style={{ flex: 1, minHeight: 86, backgroundColor: c.surface, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 3, alignItems: "center", justifyContent: "center", gap: 8, borderWidth: 1, borderColor: c.border }}>
          <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: item.tint, alignItems: "center", justifyContent: "center" }}><Text style={{ color: brand.royalBlue, fontSize: 18, fontWeight: "900" }}>{item.mark}</Text></View>
          <Text style={{ color: c.text, fontSize: 12, fontWeight: "800" }}>{item.title}</Text>
        </Link>)}
      </View>
    </View>

    <View style={{ backgroundColor: c.surface, borderRadius: 18, padding: 17, gap: 10, borderWidth: 1, borderColor: c.border }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}><View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: "#E5EEFC", alignItems: "center", justifyContent: "center" }}><Text style={{ color: brand.royalBlue, fontSize: 20 }}>▶</Text></View><View style={{ flex: 1, gap: 3 }}><Text style={{ color: c.text, fontSize: 16, fontWeight: "900" }}>Live service</Text><Text style={{ color: c.muted, fontSize: 12 }}>Join the next service online</Text></View><View style={{ backgroundColor: "#FCE7E7", borderRadius: 7, paddingHorizontal: 8, paddingVertical: 4 }}><Text style={{ color: "#B4232D", fontSize: 10, fontWeight: "900" }}>LIVE</Text></View></View>
      <Link href="/live" style={{ backgroundColor: brand.royalBlue, color: brand.white, padding: 13, borderRadius: 12, textAlign: "center", fontWeight: "900" }}>Watch live service  →</Link>
    </View>

    <View style={{ gap: 7 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}><Text style={{ color: c.text, fontSize: 18, fontWeight: "900" }}>Latest announcements</Text><Link href="/(tabs)/announcements" style={{ color: brand.royalBlue, fontSize: 12, fontWeight: "800" }}>See all →</Link></View>
      <View style={{ backgroundColor: c.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: c.border, gap: 5 }}><Text style={{ color: c.text, fontWeight: "800" }}>Stay connected with OKFN</Text><Text style={{ color: c.muted, fontSize: 13, lineHeight: 19 }}>Check ministry announcements for service details, events and community updates.</Text></View>
    </View>
  </ScrollView>;
}
