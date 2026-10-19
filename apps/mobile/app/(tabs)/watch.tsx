import { useEffect, useState } from "react";
import { ActivityIndicator, Linking, Pressable, Text, View, useColorScheme } from "react-native";
import { supabase } from "../../src/lib/supabase";
import { isSafeExternalUrl } from "../../../../packages/shared/src/validation";

type StreamLink = {
  id: string;
  label: string;
  provider: string;
  url: string;
  is_live: boolean;
};

const providerLabel: Record<string, string> = {
  youtube: "YouTube",
  mixlr: "Mixlr",
  zoom: "Zoom",
  facebook: "Facebook",
  other: "Official stream",
};

export default function WatchScreen() {
  const dark = useColorScheme() === "dark";
  const [links, setLinks] = useState<StreamLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [openingId, setOpeningId] = useState<string | null>(null);
  const colors = { background: dark ? "#101010" : "#FFFFFF", surface: dark ? "#1D1D1D" : "#F5F5F5", text: dark ? "#F5F5F5" : "#171717", muted: dark ? "#B0B0B0" : "#666666", accent: dark ? "#B7A5FF" : "#5B3CC4" };

  useEffect(() => {
    let active = true;
    if (!supabase) {
      setMessage("Official stream links will appear after the development backend is configured.");
      setLoading(false);
      return () => { active = false; };
    }
    void supabase
      .from("streaming_links")
      .select("id,label,provider,url,is_live")
      .eq("is_enabled", true)
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setMessage("We couldn't load the official stream links. Please try again later.");
        } else {
          const safeLinks = ((data ?? []) as StreamLink[]).filter((link) => isSafeExternalUrl(link.url));
          setLinks(safeLinks);
          if (safeLinks.length === 0) setMessage("No official stream links have been published yet.");
        }
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  async function openStream(link: StreamLink) {
    if (!isSafeExternalUrl(link.url)) {
      setMessage("This stream link is not valid. Please contact the OKFN team.");
      return;
    }
    setOpeningId(link.id);
    setMessage("");
    try {
      await Linking.openURL(link.url);
    } catch {
      setMessage("Unable to open this stream on your device.");
    } finally {
      setOpeningId(null);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 14, backgroundColor: colors.background }}>
      <Text style={{ color: colors.text, fontSize: 26, fontWeight: "700" }}>Watch & Listen</Text>
      <Text style={{ color: colors.muted }}>Choose an official OKFN broadcast. Links are supplied by the church team.</Text>
      {loading ? <ActivityIndicator color={colors.accent} /> : null}
      {message ? <Text accessibilityRole="text" style={{ color: colors.muted }}>{message}</Text> : null}
      {links.map((link) => (
        <Pressable key={link.id} accessibilityRole="button" onPress={() => void openStream(link)} disabled={openingId !== null} style={{ padding: 16, borderRadius: 14, backgroundColor: colors.surface, gap: 6, opacity: openingId === link.id ? 0.65 : 1 }}>
          <Text style={{ color: colors.text, fontWeight: "700", fontSize: 17 }}>{link.label}</Text>
          <Text style={{ color: colors.muted }}>{providerLabel[link.provider] ?? providerLabel.other}{link.is_live ? " · LIVE NOW" : ""}</Text>
          <Text style={{ color: colors.accent, fontWeight: "600" }}>{openingId === link.id ? "Opening…" : "Open broadcast →"}</Text>
        </Pressable>
      ))}
    </View>
  );
}
