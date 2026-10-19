import { useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, TextInput, View, useColorScheme } from "react-native";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/features/auth/AuthProvider";

function safeReturnPath(value: unknown): string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/(tabs)/profile";
}

export default function SignInScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ returnTo?: string }>();
  const { configured } = useAuth();
  const dark = useColorScheme() === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const colors = { background: dark ? "#101010" : "#FFFFFF", surface: dark ? "#1D1D1D" : "#F5F5F5", text: dark ? "#F5F5F5" : "#171717", muted: dark ? "#B0B0B0" : "#666666", accent: dark ? "#B7A5FF" : "#5B3CC4" };

  async function submit() {
    setError("");
    setNotice("");
    if (!configured || !supabase) {
      setError("Account services are not configured yet. Please try again later.");
      return;
    }
    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }
    setBusy(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (authError) throw authError;
      router.replace(safeReturnPath(params.returnTo) as never);
    } catch {
      setError("We couldn't sign you in with those details. Check them and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 14, backgroundColor: colors.background }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: "700" }}>Welcome back</Text>
      <Text style={{ color: colors.muted }}>Sign in to access your OKFN member features.</Text>
      <TextInput accessibilityLabel="Email address" autoCapitalize="none" autoComplete="email" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor={colors.muted} style={{ padding: 14, borderRadius: 12, backgroundColor: colors.surface, color: colors.text }} />
      <TextInput accessibilityLabel="Password" autoCapitalize="none" autoComplete="password" secureTextEntry value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={colors.muted} style={{ padding: 14, borderRadius: 12, backgroundColor: colors.surface, color: colors.text }} />
      {error ? <Text accessibilityRole="alert" style={{ color: "#D92D20" }}>{error}</Text> : null}
      {notice ? <Text style={{ color: colors.accent }}>{notice}</Text> : null}
      <Pressable accessibilityRole="button" disabled={busy} onPress={submit} style={{ minHeight: 48, alignItems: "center", justifyContent: "center", borderRadius: 12, backgroundColor: colors.accent, opacity: busy ? 0.7 : 1 }}>
        {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Sign in</Text>}
      </Pressable>
      <Text style={{ color: colors.muted }}>New to OKFN? <Link href="/auth/sign-up" style={{ color: colors.accent, fontWeight: "600" }}>Create an account</Link></Text>
    </View>
  );
}
