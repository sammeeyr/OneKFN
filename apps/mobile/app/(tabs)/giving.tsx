import { ScrollView, Text, View } from "react-native";
import { ContentCard, ScreenContainer, ScreenHeading, StateMessage, useOKFNTheme } from "../../src/components/ui";
import { okfnColors as brand } from "../../src/theme/tokens";

export default function GivingScreen() {
  const c = useOKFNTheme();
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 28, gap: 14 }} showsVerticalScrollIndicator={false}>
        <ScreenHeading eyebrow="Partner with the vision" title="Tithes & Offerings" subtitle="Thank you for supporting the work and community of One Kingdom Family Network." />
        <View style={{ backgroundColor: brand.deepBlue, borderRadius: 20, padding: 20, gap: 10 }}>
          <Text style={{ color: brand.gold, fontSize: 11, fontWeight: "800", letterSpacing: 1 }}>GENEROSITY • FAITH • IMPACT</Text>
          <Text style={{ color: brand.white, fontSize: 22, fontWeight: "800", lineHeight: 29 }}>Giving with purpose</Text>
          <Text style={{ color: "#D9E7FF", fontSize: 14, lineHeight: 21 }}>Secure giving options will be available here once the ministry’s payment provider and server-side verification are configured.</Text>
        </View>
        <ContentCard>
          <Text style={{ color: c.text, fontSize: 17, fontWeight: "800" }}>Your giving, handled securely</Text>
          <Text style={{ color: c.muted, fontSize: 14, lineHeight: 21 }}>OKFN will never ask you to enter card or bank credentials directly into this screen. Payment methods remain disabled until merchant verification and secure payment flows are ready.</Text>
        </ContentCard>
        <StateMessage message="Online giving is not available yet. Please use only official giving instructions confirmed by the OKFN team." />
      </ScrollView>
    </ScreenContainer>
  );
}
