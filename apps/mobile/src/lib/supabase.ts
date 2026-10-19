import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const CHUNK_SIZE = 1500;
const secureStorage = {
  async getItem(key: string): Promise<string | null> {
    const meta = await SecureStore.getItemAsync(`${key}:chunks`);
    if (!meta) return SecureStore.getItemAsync(key);
    const count = Number(meta);
    if (!Number.isInteger(count) || count < 1 || count > 100) return null;
    const chunks = await Promise.all(
      Array.from({ length: count }, (_, index) => SecureStore.getItemAsync(`${key}:chunk:${index}`)),
    );
    return chunks.every((chunk): chunk is string => chunk !== null) ? chunks.join("") : null;
  },
  async setItem(key: string, value: string): Promise<void> {
    const previousMeta = await SecureStore.getItemAsync(`${key}:chunks`);
    const previousCount = Number(previousMeta);
    if (value.length <= CHUNK_SIZE) {
      await SecureStore.setItemAsync(key, value);
      await SecureStore.deleteItemAsync(`${key}:chunks`).catch(() => undefined);
      if (Number.isInteger(previousCount) && previousCount > 0 && previousCount <= 100) {
        await Promise.all(Array.from({ length: previousCount }, (_, index) =>
          SecureStore.deleteItemAsync(`${key}:chunk:${index}`).catch(() => undefined),
        ));
      }
      return;
    }
    const count = Math.ceil(value.length / CHUNK_SIZE);
    if (count > 100) throw new Error("Auth session exceeds secure storage limit.");
    await Promise.all(Array.from({ length: count }, (_, index) =>
      SecureStore.setItemAsync(`${key}:chunk:${index}`, value.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE)),
    ));
    await SecureStore.setItemAsync(`${key}:chunks`, String(count));
    await SecureStore.deleteItemAsync(key).catch(() => undefined);
    if (Number.isInteger(previousCount) && previousCount > count && previousCount <= 100) {
      await Promise.all(Array.from({ length: previousCount - count }, (_, offset) =>
        SecureStore.deleteItemAsync(`${key}:chunk:${count + offset}`).catch(() => undefined),
      ));
    }
  },
  async removeItem(key: string): Promise<void> {
    const meta = await SecureStore.getItemAsync(`${key}:chunks`);
    const count = Number(meta);
    if (Number.isInteger(count) && count > 0 && count <= 100) {
      await Promise.all(Array.from({ length: count }, (_, index) =>
        SecureStore.deleteItemAsync(`${key}:chunk:${index}`).catch(() => undefined),
      ));
    }
    await Promise.all([
      SecureStore.deleteItemAsync(`${key}:chunks`).catch(() => undefined),
      SecureStore.deleteItemAsync(key).catch(() => undefined),
    ]);
  },
};

export const supabase = url && anonKey
  ? createClient(url, anonKey, {
      auth: {
        storage: secureStorage,
        flowType: "pkce",
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  : null;
