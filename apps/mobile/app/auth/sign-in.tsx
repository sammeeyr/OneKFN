import { useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/features/auth/AuthProvider";
import { ActionButton, ContentCard, ScreenContainer, ScreenHeading, StateMessage, useOKFNTheme } from "../../src/components/ui";
import { okfnColors as brand } from "../../src/theme/tokens";

function safeReturnPath(value: unknown): string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/(tabs)/profile";
}

export default function SignInScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ returnTo?: string }>();
  const { configured } = useAuth();
  const c = useOKFNTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    if (!configured || !supabase) { setError("Account services are not configured yet."); return; }
    if (!email.trim() || !password) { setError("Enter your email and password."); return; }
    setBusy(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
      if (authError) throw authError;
      router.replace(safeReturnPath(params.returnTo) as never);
    } catch {
      setError("We couldn't sign you in with those details. Check them and try again.");
    } finally { setBusy(false); }
  }

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: "center", paddingBottom: 24, gap: 16 }}>
        <View style={{ alignSelf: "center", width: 68, height: 68, borderRadius: 22, backgroundColor: "#E5EEFC", borderWidth: 2, borderColor: brand.gold, alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
          <Text style={{ color: brand.royalBlue, fontSize: 25, fontWeight: "900" }}>OK</Text>
        </View>
        <ScreenHeading eyebrow="One family • One kingdom • One mission" title="Welcome back" subtitle="Sign in to access your OKFN member features." />
        <ContentCard>
          <Text style={{ color: c.text, fontSize: 13, fontWeight: "700" }}>Email address</Text>
          <TextInput accessibilityLabel="Email address" autoCapitalize="none" autoComplete="email" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor={c.muted} style={{ minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: c.border, paddingHorizontal: 12, color: c.text }} />
          <Text style={{ color: c.text, fontSize: 13, fontWeight: "700", marginTop: 4 }}>Password</Text>
          <TextInput accessibilityLabel="Password" autoCapitalize="none" autoComplete="password" secureTextEntry value={password} onChangeText={setPassword} placeholder="Your password" placeholderTextColor={c.muted} style={{ minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: c.border, paddingHorizontal: 12, color: c.text }} />
          {error ? <StateMessage message={error} error /> : null}
          <ActionButton label="Sign in" onPress={() => void submit()} busy={busy} />
        </ContentCard>
        <Text style={{ color: c.muted, textAlign: "center", fontSize: 14 }}>New to OKFN? <Link href="/auth/sign-up" style={{ color: c.primary, fontWeight: "800" }}>Create an account</Link></Text>
        {!configured ? <StateMessage message="Connect the Supabase project and set the mobile environment values to enable sign-in." /> : null}
      </View>
    </ScreenContainer>
  );
}
