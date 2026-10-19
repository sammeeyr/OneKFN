import { useState } from "react";
import { Link } from "expo-router";
import { ScrollView, Text, TextInput } from "react-native";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/features/auth/AuthProvider";
import { ActionButton, ContentCard, ScreenContainer, ScreenHeading, StateMessage, useOKFNTheme } from "../../src/components/ui";

export default function PrayerScreen() {
  const c = useOKFNTheme();
  const { user, configured } = useAuth();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [failed, setFailed] = useState(false);

  async function submit() {
    setFeedback(""); setFailed(false);
    if (!supabase || !user) { setFeedback("Please sign in before submitting a private request."); setFailed(true); return; }
    if (!message.trim()) { setFeedback("Please enter your request."); setFailed(true); return; }
    setBusy(true);
    const { error } = await supabase.from("prayer_requests").insert({ member_id: user.id, subject: subject.trim() || null, message: message.trim() });
    setBusy(false);
    if (error) { setFeedback("We couldn't submit your request. Please try again later."); setFailed(true); return; }
    setSubject(""); setMessage(""); setFeedback("Your request has been submitted."); 
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 28, gap: 14 }} keyboardShouldPersistTaps="handled">
        <ScreenHeading eyebrow="We are here with you" title="Prayer & Support" subtitle="Share a request with the authorized ministry team. This is not a public post." />
        {!configured ? <StateMessage message="Member services are not configured yet." /> : null}
        {!user ? <ContentCard>
          <Text style={{ color: c.text, fontSize: 17, fontWeight: "800" }}>Sign in to continue</Text>
          <Text style={{ color: c.muted, lineHeight: 21 }}>Sign in so your private request can be associated with your account.</Text>
          <Link href="/auth/sign-in?returnTo=/prayer" style={{ color: c.primary, fontWeight: "800", paddingVertical: 10 }}>Sign in  →</Link>
        </ContentCard> : <ContentCard>
          <Text style={{ color: c.text, fontSize: 17, fontWeight: "800" }}>Share your request</Text>
          <TextInput accessibilityLabel="Optional topic" value={subject} onChangeText={setSubject} maxLength={120} placeholder="Topic (optional)" placeholderTextColor={c.muted} style={{ color: c.text, borderColor: c.border, borderWidth: 1, borderRadius: 12, padding: 12, minHeight: 48 }} />
          <TextInput accessibilityLabel="Prayer request" value={message} onChangeText={setMessage} multiline maxLength={5000} textAlignVertical="top" placeholder="Write your request…" placeholderTextColor={c.muted} style={{ color: c.text, borderColor: c.border, borderWidth: 1, borderRadius: 12, padding: 12, minHeight: 130 }} />
          {feedback ? <StateMessage message={feedback} error={failed} /> : null}
          <ActionButton label="Submit request" onPress={() => void submit()} busy={busy} disabled={!message.trim()} />
        </ContentCard>}
      </ScrollView>
    </ScreenContainer>
  );
}
