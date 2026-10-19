import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/features/auth/AuthProvider";
import { ContentCard, ScreenContainer, ScreenHeading, StateMessage, useOKFNTheme } from "../../src/components/ui";
import { okfnColors as brand } from "../../src/theme/tokens";

export default function ProfileScreen() {
  const c = useOKFNTheme();
  const router = useRouter();
  const { user, loading, configured } = useAuth();
  const [error, setError] = useState("");

  async function signOut() {
    if (!supabase) return;
    setError("");
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) { setError("We couldn't sign you out. Please try again."); return; }
    router.replace("/(tabs)" as never);
  }

  if (loading) return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: c.background }}><ActivityIndicator color={c.primary} /><Text style={{ color: c.muted, marginTop: 12 }}>Loading account…</Text></View>;

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 28, gap: 14 }} showsVerticalScrollIndicator={false}>
        <ScreenHeading eyebrow="Your OKFN account" title="Member Profile" subtitle="Manage your account and stay connected with the family." />
        {!configured ? <StateMessage message="Member accounts will be available after the development backend is configured." /> : null}
        {user ? (
          <>
            <ContentCard style={{ alignItems: "center", paddingVertical: 24 }}>
              <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: "#E5EEFC", borderWidth: 2, borderColor: brand.gold, alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
                <Text style={{ color: brand.royalBlue, fontSize: 25, fontWeight: "800" }}>{(user.email ?? "OK").slice(0, 2).toUpperCase()}</Text>
              </View>
              <Text style={{ color: c.text, fontSize: 18, fontWeight: "800" }}>Welcome to OKFN</Text>
              <Text style={{ color: c.muted, textAlign: "center" }}>{user.email ?? "OKFN member"}</Text>
            </ContentCard>
            {error ? <StateMessage message={error} error /> : null}
            <Pressable accessibilityRole="button" onPress={signOut} style={{ minHeight: 48, alignItems: "center", justifyContent: "center", borderRadius: 12, backgroundColor: brand.royalBlue }}>
              <Text style={{ color: brand.white, fontWeight: "700" }}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <ContentCard>
              <Text style={{ color: c.text, fontSize: 17, fontWeight: "800" }}>Join the OKFN family</Text>
              <Text style={{ color: c.muted, fontSize: 14, lineHeight: 21 }}>Sign in to access your member account and personal features.</Text>
              <Link href="/auth/sign-in" style={{ color: c.primary, fontWeight: "800", paddingVertical: 8 }}>Sign in  →</Link>
              <Link href="/auth/sign-up" style={{ color: c.primary, fontWeight: "800", paddingVertical: 8 }}>Create account  →</Link>
            </ContentCard>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
