import { describe, it, expect } from "vitest";
import { isValidEmail, checkLength, LIMITS } from "../functions/_lib/validate";

describe("isValidEmail", () => {
  it("accepts standard emails", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("user+tag@sub.domain.io")).toBe(true);
    expect(isValidEmail("a@b.co")).toBe(true);
  });

  it("rejects malformed emails", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("notanemail")).toBe(false);
    expect(isValidEmail("@domain.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("user@domain")).toBe(false);
    expect(isValidEmail("user @domain.com")).toBe(false);
  });

  it("rejects emails with local-part over 64 chars", () => {
    const longLocal = "a".repeat(65) + "@example.com";
    expect(isValidEmail(longLocal)).toBe(false);
  });
});

describe("checkLength", () => {
  it("accepts strings within the limit", () => {
    expect(checkLength("hello", 100)).toBe(true);
    expect(checkLength("", 0)).toBe(true);
    expect(checkLength("abc", 3)).toBe(true);
  });

  it("rejects strings exceeding the limit", () => {
    expect(checkLength("abcd", 3)).toBe(false);
    expect(checkLength("a".repeat(LIMITS.nombre + 1), LIMITS.nombre)).toBe(false);
    expect(checkLength("a".repeat(LIMITS.mensaje + 1), LIMITS.mensaje)).toBe(false);
  });

  it("accepts strings at exactly the limit", () => {
    expect(checkLength("a".repeat(LIMITS.nombre), LIMITS.nombre)).toBe(true);
    expect(checkLength("a".repeat(LIMITS.idea), LIMITS.idea)).toBe(true);
  });
});
