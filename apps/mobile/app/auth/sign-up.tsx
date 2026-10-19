import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { makeRedirectUri } from "expo-linking";
import { Text, TextInput, View } from "react-native";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/features/auth/AuthProvider";
import { ActionButton, ContentCard, ScreenContainer, ScreenHeading, StateMessage, useOKFNTheme } from "../../src/components/ui";
import { okfnColors as brand } from "../../src/theme/tokens";

export default function SignUpScreen() {
  const router = useRouter();
  const { configured } = useAuth();
  const c = useOKFNTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function submit() {
    setError(""); setSuccess("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!configured || !supabase) { setError("Account services are not configured yet."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) { setError("Enter a valid email address."); return; }
    if (password.length < 8) { setError("Use a password with at least 8 characters."); return; }
    setBusy(true);
    try {
      const { data, error: authError } = await supabase.auth.signUp({ email: normalizedEmail, password, options: { emailRedirectTo: makeRedirectUri({ scheme: "okfn", path: "auth/callback" }) } });
      if (authError) throw authError;
      if (data.session) router.replace("/(tabs)/profile" as never);
      else setSuccess("If registration is accepted, check your email for a verification link before signing in.");
    } catch {
      setError("We couldn't complete registration. Check your details or try signing in.");
    } finally { setBusy(false); }
  }

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: "center", paddingBottom: 24, gap: 16 }}>
        <View style={{ alignSelf: "center", width: 68, height: 68, borderRadius: 22, backgroundColor: "#E5EEFC", borderWidth: 2, borderColor: brand.gold, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: brand.royalBlue, fontSize: 25, fontWeight: "900" }}>OK</Text>
        </View>
        <ScreenHeading eyebrow="One family • One kingdom • One mission" title="Join the OKFN family" subtitle="Create an account for member features and personal support." />
        <ContentCard>
          <Text style={{ color: c.text, fontSize: 13, fontWeight: "700" }}>Email address</Text>
          <TextInput accessibilityLabel="Email address" autoCapitalize="none" autoComplete="email" keyboardType="email-address" value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor={c.muted} style={{ minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: c.border, paddingHorizontal: 12, color: c.text }} />
          <Text style={{ color: c.text, fontSize: 13, fontWeight: "700", marginTop: 4 }}>Password</Text>
          <TextInput accessibilityLabel="Password" autoCapitalize="none" autoComplete="new-password" secureTextEntry value={password} onChangeText={setPassword} placeholder="At least 8 characters" placeholderTextColor={c.muted} style={{ minHeight: 48, borderRadius: 12, borderWidth: 1, borderColor: c.border, paddingHorizontal: 12, color: c.text }} />
          <Text style={{ color: c.muted, fontSize: 12 }}>Use at least 8 characters.</Text>
          {error ? <StateMessage message={error} error /> : null}
          {success ? <StateMessage message={success} /> : null}
          <ActionButton label="Create account" onPress={() => void submit()} busy={busy} />
        </ContentCard>
        <Text style={{ textAlign: "center", color: c.muted }}>Already a member? <Link href="/auth/sign-in" style={{ color: c.primary, fontWeight: "800" }}>Sign in</Link></Text>
        {!configured ? <StateMessage message="Connect Supabase and set the mobile environment values to enable account creation." /> : null}
      </View>
    </ScreenContainer>
  );
}
