import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View, useColorScheme } from "react-native";
import { Link, useRouter } from "expo-router";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/features/auth/AuthProvider";

export default function ProfileScreen() {
  const dark = useColorScheme() === "dark";
  const router = useRouter();
  const { user, loading, configured } = useAuth();
  const [error, setError] = useState("");
  const colors = { background: dark ? "#101010" : "#FFFFFF", surface: dark ? "#1D1D1D" : "#F5F5F5", text: dark ? "#F5F5F5" : "#171717", muted: dark ? "#B0B0B0" : "#666666", accent: dark ? "#B7A5FF" : "#5B3CC4" };

  async function signOut() {
    if (!supabase) return;
    setError("");
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setError("We couldn't sign you out. Please try again.");
      return;
    }
    router.replace("/(tabs)" as never);
  }

  if (loading) return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}><ActivityIndicator color={colors.accent} /><Text style={{ color: colors.muted, marginTop: 12 }}>Loading account…</Text></View>;

  return (
    <View style={{ flex: 1, padding: 24, gap: 14, backgroundColor: colors.background }}>
      <Text style={{ color: colors.text, fontSize: 26, fontWeight: "700" }}>Member Profile</Text>
      {!configured ? <Text style={{ color: colors.muted }}>Member accounts will be available after the development backend is configured.</Text> : null}
      {user ? (
        <>
          <View style={{ padding: 16, borderRadius: 14, backgroundColor: colors.surface, gap: 6 }}>
            <Text style={{ color: colors.muted }}>Signed in as</Text>
            <Text style={{ color: colors.text, fontWeight: "600" }}>{user.email ?? "OKFN member"}</Text>
          </View>
          {error ? <Text accessibilityRole="alert" style={{ color: "#D92D20" }}>{error}</Text> : null}
          <Pressable accessibilityRole="button" onPress={signOut} style={{ minHeight: 48, alignItems: "center", justifyContent: "center", borderRadius: 12, backgroundColor: colors.accent }}>
            <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Sign out</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={{ color: colors.muted }}>Sign in to access your member account and personal features.</Text>
          <Link href="/auth/sign-in" style={{ color: colors.accent, fontWeight: "700" }}>Sign in →</Link>
          <Link href="/auth/sign-up" style={{ color: colors.accent, fontWeight: "700" }}>Create account →</Link>
        </>
      )}
    </View>
  );
}
