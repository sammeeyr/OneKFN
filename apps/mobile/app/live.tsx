import { ScrollView, Text, View, Linking } from "react-native";
import { ContentCard, ScreenContainer, ScreenHeading, StateMessage, useOKFNTheme } from "../src/components/ui";
import { okfnColors as brand } from "../src/theme/tokens";
import { supabase } from "../src/lib/supabase";
import { useEffect, useState } from "react";
import { isSafeExternalUrl } from "@okfn/shared";

type Stream = { id: string; label: string; provider: string; url: string; is_live: boolean };
export default function LiveScreen() {
  const c = useOKFNTheme(); const [stream, setStream] = useState<Stream | null>(null); const [message, setMessage] = useState("Loading official service links…");
  useEffect(() => { let active = true; if (!supabase) { setMessage("Connect the OKFN backend to load the official live service."); return () => { active = false; }; }
    void supabase.from("streaming_links").select("id,label,provider,url,is_live").eq("is_enabled", true).order("sort_order", { ascending: true }).limit(1).then(({ data, error }) => { if (!active) return; const first = ((data ?? []) as Stream[]).find(x => isSafeExternalUrl(x.url)); setStream(first ?? null); setMessage(error ? "We couldn't load the live service." : first ? "" : "No official live stream has been published yet."); }); return () => { active = false; }; }, []);
  return <ScreenContainer><ScrollView contentContainerStyle={{ paddingBottom: 28, gap: 14 }}><ScreenHeading eyebrow="Worship together" title="Live Service" subtitle="Watch the official OKFN service stream." />
    <View style={{ height: 190, borderRadius: 20, backgroundColor: brand.deepBlue, alignItems: "center", justifyContent: "center", gap: 12, padding: 20 }}><Text style={{ color: brand.gold, fontSize: 12, fontWeight: "900", letterSpacing: 1 }}>ONE KINGDOM FAMILY NETWORK</Text><Text style={{ color: brand.white, fontSize: 25, fontWeight: "900" }}>Sunday Service</Text><Text style={{ color: "#D9E7FF", textAlign: "center" }}>Worship • Word • Fellowship</Text><View style={{ backgroundColor: "#D52B39", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 7 }}><Text style={{ color: "#FFFFFF", fontWeight: "900", fontSize: 11 }}>● LIVE STREAM</Text></View></View>
    {message ? <StateMessage message={message} /> : null}
    {stream ? <ContentCard><Text style={{ color: c.text, fontSize: 17, fontWeight: "800" }}>{stream.label}</Text><Text style={{ color: c.muted }}>Provider: {stream.provider}</Text><Text onPress={() => { if (isSafeExternalUrl(stream.url)) void Linking.openURL(stream.url); }} accessibilityRole="link" style={{ backgroundColor: brand.royalBlue, color: brand.white, overflow: "hidden", textAlign: "center", padding: 14, borderRadius: 12, fontWeight: "800" }}>Open official stream ↗</Text></ContentCard> : null}
    <ContentCard><Text style={{ color: c.text, fontWeight: "800" }}>Other ways to watch</Text><Text style={{ color: c.muted, lineHeight: 21 }}>Visit Watch & Listen to see all verified ministry stream links, including YouTube, Facebook, Mixlr and Zoom.</Text></ContentCard>
  </ScrollView></ScreenContainer>;
}
