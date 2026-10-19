import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, useColorScheme } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../src/lib/supabase";

export default function AuthCallbackScreen() {
  const { code } = useLocalSearchParams<{ code?: string }>();
  const router = useRouter();
  const dark = useColorScheme() === "dark";
  const [message, setMessage] = useState("Verifying your email…");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    async function complete() {
      if (!supabase || typeof code !== "string" || !code) {
        if (active) {
          setFailed(true);
          setMessage("This verification link is invalid or expired. Request a new one and try again.");
        }
        return;
      }
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!active) return;
      if (error) {
        setFailed(true);
        setMessage("This verification link is invalid or expired. Request a new one and try again.");
        return;
      }
      setMessage("Email verified. Opening your account…");
      router.replace("/(tabs)/profile" as never);
    }
    void complete().catch(() => {
      if (active) {
        setFailed(true);
        setMessage("We couldn't verify this link. Please request a new one.");
      }
    });
    return () => { active = false; };
  }, [code, router]);

  return (
    <View style={{ flex: 1, padding: 24, alignItems: "center", justifyContent: "center", gap: 14, backgroundColor: dark ? "#101010" : "#FFFFFF" }}>
      {!failed ? <ActivityIndicator /> : null}
      <Text accessibilityRole="text" style={{ color: failed ? "#D92D20" : dark ? "#F5F5F5" : "#171717", textAlign: "center" }}>{message}</Text>
    </View>
  );
}
