import { useEffect, useState } from "react";
import { ActivityIndicator, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { supabase } from "../../src/lib/supabase";
import { isSafeExternalUrl } from "@okfn/shared";
import { ContentCard, ScreenContainer, ScreenHeading, StateMessage, useOKFNTheme } from "../../src/components/ui";

type StreamLink = { id: string; label: string; provider: string; url: string; is_live: boolean };
const providerLabel: Record<string, string> = { youtube: "YouTube", mixlr: "Mixlr", zoom: "Zoom", facebook: "Facebook", other: "Official stream" };

export default function WatchScreen() {
  const c = useOKFNTheme();
  const [links, setLinks] = useState<StreamLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [openingId, setOpeningId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (!supabase) {
      setMessage("Official stream links will appear after the development backend is configured.");
      setLoading(false);
      return () => { active = false; };
    }
    void supabase.from("streaming_links").select("id,label,provider,url,is_live").eq("is_enabled", true).order("sort_order", { ascending: true }).then(({ data, error }) => {
      if (!active) return;
      if (error) setMessage("We couldn't load official stream links. Please try again later.");
      else {
        const safeLinks = ((data ?? []) as StreamLink[]).filter((link) => isSafeExternalUrl(link.url));
        setLinks(safeLinks);
        if (!safeLinks.length) setMessage("No official stream links have been published yet.");
      }
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  async function openStream(link: StreamLink) {
    if (!isSafeExternalUrl(link.url)) { setMessage("This stream link is not valid. Please contact the OKFN team."); return; }
    setOpeningId(link.id); setMessage("");
    try { await Linking.openURL(link.url); }
    catch { setMessage("Unable to open this stream on your device."); }
    finally { setOpeningId(null); }
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
        <ScreenHeading eyebrow="Worship anywhere" title="Watch & Listen" subtitle="Choose an official OKFN broadcast. Links are supplied by the church team." />
        <View style={{ backgroundColor: "#062B63", padding: 18, borderRadius: 18, marginBottom: 16, gap: 8 }}>
          <Text style={{ color: "#D4AF37", fontSize: 11, fontWeight: "800", letterSpacing: 1 }}>GATHER • WORSHIP • GROW</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 21, fontWeight: "800" }}>Join the family in worship</Text>
          <Text style={{ color: "#D9E7FF", fontSize: 14, lineHeight: 21 }}>Live services and published broadcast links will be listed below.</Text>
        </View>
        {loading ? <ActivityIndicator color={c.primary} style={{ marginVertical: 16 }} /> : null}
        {message ? <StateMessage message={message} /> : null}
        <View style={{ gap: 12 }}>
          {links.map((link) => (
            <Pressable key={link.id} accessibilityRole="button" accessibilityLabel={`Open ${providerLabel[link.provider] ?? providerLabel.other} stream: ${link.label}`} onPress={() => void openStream(link)} disabled={openingId !== null} style={{ opacity: openingId === link.id ? 0.65 : 1 }}>
              <ContentCard>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <Text style={{ color: c.text, fontSize: 17, fontWeight: "800", flex: 1 }}>{link.label}</Text>
                  {link.is_live ? <View style={{ backgroundColor: "#FCE7E7", borderRadius: 999, paddingHorizontal: 9, paddingVertical: 5 }}><Text style={{ color: "#A61B1B", fontSize: 11, fontWeight: "800" }}>LIVE NOW</Text></View> : null}
                </View>
                <Text style={{ color: c.muted, fontSize: 13 }}>{providerLabel[link.provider] ?? providerLabel.other}</Text>
                <Text style={{ color: c.primary, fontWeight: "700" }}>{openingId === link.id ? "Opening…" : "Open broadcast  →"}</Text>
              </ContentCard>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
