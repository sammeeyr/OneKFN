export type AppRole =
  | "member"
  | "pastor"
  | "prayer_team"
  | "content_admin"
  | "finance_officer"
  | "member_admin"
  | "super_admin";

export type StreamProvider = "youtube" | "mixlr" | "zoom" | "facebook" | "other";
export type PaymentStatus = "pending" | "successful" | "failed" | "abandoned" | "refunded";

export interface OfficialStreamLink {
  id: string;
  label: string;
  provider: StreamProvider;
  url: string;
  isLive: boolean;
  enabled: boolean;
}

export interface PublicAnnouncement {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  audience: "public" | "members";
}

export { isSafeExternalUrl, isValidEmail } from "./validation";
