import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View, useColorScheme } from "react-native";
import { supabase } from "../../src/lib/supabase";

type Announcement = {
  id: string;
  title: string;
  body: string;
  published_at: string | null;
  audience: "public" | "members";
};

function formatDate(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export default function AnnouncementsScreen() {
  const dark = useColorScheme() === "dark";
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const colors = { background: dark ? "#101010" : "#FFFFFF", surface: dark ? "#1D1D1D" : "#F5F5F5", text: dark ? "#F5F5F5" : "#171717", muted: dark ? "#B0B0B0" : "#666666", accent: dark ? "#B7A5FF" : "#5B3CC4" };

  useEffect(() => {
    let active = true;
    if (!supabase) {
      setMessage("Announcements will appear after the development backend is configured.");
      setLoading(false);
      return () => { active = false; };
    }
    void supabase
      .from("announcements")
      .select("id,title,body,published_at,audience")
      .eq("is_published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setMessage("We couldn't load announcements. Please try again later.");
        } else {
          setItems((data ?? []) as Announcement[]);
          if (!data?.length) setMessage("There are no announcements yet.");
        }
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 24, gap: 14 }}>
      <Text style={{ color: colors.text, fontSize: 26, fontWeight: "700" }}>Announcements</Text>
      <Text style={{ color: colors.muted }}>Church updates and important notices from the OKFN team.</Text>
      {loading ? <ActivityIndicator color={colors.accent} /> : null}
      {message ? <Text style={{ color: colors.muted }}>{message}</Text> : null}
      {items.map((item) => (
        <View key={item.id} style={{ padding: 16, borderRadius: 14, backgroundColor: colors.surface, gap: 8 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: "700" }}>{item.title}</Text>
          {item.published_at ? <Text style={{ color: colors.accent, fontSize: 12 }}>{formatDate(item.published_at)}</Text> : null}
          <Text selectable style={{ color: colors.text, lineHeight: 22 }}>{item.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
