import { describe, expect, it } from "vitest";
import { isSafeExternalUrl, isValidEmail } from "./validation";

describe("isSafeExternalUrl", () => {
  it("accepts HTTPS URLs", () => {
    expect(isSafeExternalUrl("https://youtube.com/@okfn")).toBe(true);
  });

  it("rejects insecure or malformed URLs", () => {
    expect(isSafeExternalUrl("http://example.com")).toBe(false);
    expect(isSafeExternalUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeExternalUrl("not a url")).toBe(false);
  });

  it("rejects credentials embedded in a URL", () => {
    expect(isSafeExternalUrl("https://user:secret@example.com")).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("accepts a basic valid email", () => {
    expect(isValidEmail("member@example.org")).toBe(true);
  });

  it("rejects whitespace and missing domains", () => {
    expect(isValidEmail("not an email")).toBe(false);
    expect(isValidEmail("member@")).toBe(false);
  });
});
