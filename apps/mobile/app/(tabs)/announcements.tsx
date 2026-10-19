import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { supabase } from "../../src/lib/supabase";
import { ContentCard, ScreenContainer, ScreenHeading, StateMessage, useOKFNTheme } from "../../src/components/ui";

type Announcement = { id: string; title: string; body: string; published_at: string | null; audience: "public" | "members" };
function formatDate(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export default function AnnouncementsScreen() {
  const c = useOKFNTheme();
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    if (!supabase) {
      setMessage("Announcements will appear after the development backend is configured.");
      setLoading(false);
      return () => { active = false; };
    }
    void supabase.from("announcements").select("id,title,body,published_at,audience").eq("is_published", true).order("published_at", { ascending: false, nullsFirst: false }).then(({ data, error }) => {
      if (!active) return;
      if (error) setMessage("We couldn't load announcements. Please try again later.");
      else {
        setItems((data ?? []) as Announcement[]);
        if (!data?.length) setMessage("There are no announcements yet.");
      }
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 28, gap: 12 }} showsVerticalScrollIndicator={false}>
        <ScreenHeading eyebrow="Stay connected" title="News & Announcements" subtitle="Church updates and important notices from the OKFN team." />
        {loading ? <ActivityIndicator color={c.primary} style={{ marginVertical: 12 }} /> : null}
        {message ? <StateMessage message={message} /> : null}
        {items.map((item) => (
          <ContentCard key={item.id}>
            {item.published_at ? <Text style={{ color: c.primary, fontSize: 12, fontWeight: "700" }}>{formatDate(item.published_at)}</Text> : null}
            <Text accessibilityRole="header" style={{ color: c.text, fontSize: 18, fontWeight: "800", lineHeight: 24 }}>{item.title}</Text>
            <Text selectable style={{ color: c.text, fontSize: 14, lineHeight: 22 }}>{item.body}</Text>
          </ContentCard>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}
