import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, TextInput, View, useColorScheme } from "react-native";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/features/auth/AuthProvider";

export default function SignUpScreen() {
  const router = useRouter();
  const { configured } = useAuth();
  const dark = useColorScheme() === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const colors = { background: dark ? "#101010" : "#FFFFFF", surface: dark ? "#1D1D1D" : "#F5F5F5", text: dark ? "#F5F5F5" : "#171717", muted: dark ? "#B0B0B0" : "#666666", accent: dark ? "#B7A5FF" : "#5B3CC4" };

  async function submit() {
    setError("");
    setSuccess("");
    if (!configured || !supabase) {
      setError("Account services are not configured yet. Please try again later.");
      return;
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
      });
      if (authError) throw authError;
      if (data.session) router.replace("/(tabs)/profile" as never);
      else setSuccess("If registration is accepted, check your email for a verification link before signing in.");
    } catch {
      setError("We couldn't complete registration. Check your details or try signing in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 14, backgroundColor: colors.background }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: "700" }}>Create your account</Text>
      <Text style={{ color: colors.muted }}>Create a member account to access personal features.</Text>
      <TextInput accessibilityLabel="Email address" autoCapitalize="none" autoComplete="email" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor={colors.muted} style={{ padding: 14, borderRadius: 12, backgroundColor: colors.surface, color: colors.text }} />
      <TextInput accessibilityLabel="Password" autoCapitalize="none" autoComplete="new-password" secureTextEntry value={password} onChangeText={setPassword} placeholder="Password (8+ characters)" placeholderTextColor={colors.muted} style={{ padding: 14, borderRadius: 12, backgroundColor: colors.surface, color: colors.text }} />
      {error ? <Text accessibilityRole="alert" style={{ color: "#D92D20" }}>{error}</Text> : null}
      {success ? <Text accessibilityRole="text" style={{ color: colors.accent }}>{success}</Text> : null}
      <Pressable accessibilityRole="button" disabled={busy} onPress={submit} style={{ minHeight: 48, alignItems: "center", justifyContent: "center", borderRadius: 12, backgroundColor: colors.accent, opacity: busy ? 0.7 : 1 }}>
        {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Create account</Text>}
      </Pressable>
      <Text style={{ color: colors.muted }}>Already registered? <Link href="/auth/sign-in" style={{ color: colors.accent, fontWeight: "600" }}>Sign in</Link></Text>
    </View>
  );
}
