import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, View, useColorScheme } from "react-native";
import { okfnColors as brand } from "../theme/tokens";

export function useOKFNTheme() {
  const dark = useColorScheme() === "dark";
  return dark
    ? { background: brand.darkBackground, surface: brand.darkSurface, text: brand.darkText, muted: brand.darkMuted, border: "#243A5A", primary: "#76A7FF" }
    : { background: brand.mist, surface: brand.white, text: brand.ink, muted: brand.muted, border: brand.border, primary: brand.royalBlue };
}

export function ScreenContainer({ children, padding = 20 }: { children: ReactNode; padding?: number }) {
  const c = useOKFNTheme();
  return <View style={{ flex: 1, backgroundColor: c.background, paddingHorizontal: padding, paddingTop: 20 }}>{children}</View>;
}

export function ScreenHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  const c = useOKFNTheme();
  return (
    <View style={{ gap: 5, marginBottom: 18 }}>
      {eyebrow ? <Text style={{ color: brand.royalBlue, fontSize: 11, fontWeight: "800", letterSpacing: 1.1 }}>{eyebrow.toUpperCase()}</Text> : null}
      <Text accessibilityRole="header" style={{ color: c.text, fontSize: 26, fontWeight: "800" }}>{title}</Text>
      {subtitle ? <Text style={{ color: c.muted, fontSize: 14, lineHeight: 21 }}>{subtitle}</Text> : null}
    </View>
  );
}

export function ContentCard({ children, style }: { children: ReactNode; style?: object }) {
  const c = useOKFNTheme();
  return <View style={[{ padding: 16, borderRadius: 16, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, gap: 8 }, style]}>{children}</View>;
}

export function ActionButton({ label, onPress, disabled = false, busy = false }: { label: string; onPress: () => void; disabled?: boolean; busy?: boolean }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} disabled={disabled || busy} style={{ minHeight: 48, paddingHorizontal: 16, borderRadius: 12, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, backgroundColor: brand.royalBlue, opacity: disabled || busy ? 0.65 : 1 }}>
      {busy ? <ActivityIndicator color={brand.white} /> : null}
      <Text style={{ color: brand.white, fontSize: 14, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}

export function StateMessage({ message, error = false }: { message: string; error?: boolean }) {
  const c = useOKFNTheme();
  return <View accessibilityRole={error ? "alert" : "text"} style={{ padding: 14, borderRadius: 12, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}><Text style={{ color: error ? brand.danger : c.muted, fontSize: 14, lineHeight: 21 }}>{message}</Text></View>;
}
