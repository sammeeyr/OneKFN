/** OKFN design tokens. Keep brand decisions centralized for the mobile app. */
export const okfnColors = {
  royalBlue: "#0646A2",
  deepBlue: "#062B63",
  gold: "#D4AF37",
  white: "#FFFFFF",
  mist: "#F3F7FC",
  ink: "#17243A",
  muted: "#64748B",
  border: "#DCE5F0",
  success: "#16845B",
  warning: "#B7791F",
  danger: "#C43D4B",
  darkBackground: "#07172F",
  darkSurface: "#102544",
  darkText: "#F4F7FC",
  darkMuted: "#B5C3D8",
} as const;

export const okfnSpacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, xxl: 32 } as const;
export const okfnRadius = { control: 12, card: 16, panel: 20, pill: 999 } as const;
export const okfnType = { title: 28, heading: 20, subheading: 17, body: 15, label: 13, caption: 12 } as const;
