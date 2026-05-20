import { describe, it, expect } from "vitest";
import { hmacHex, verifyHmac } from "../functions/_lib/security";

const SECRET = "test-secret-32-bytes-long-enough!";

describe("hmacHex", () => {
  it("returns a 64-char hex string", async () => {
    const token = await hmacHex("hello@example.com", SECRET);
    expect(token).toHaveLength(64);
    expect(token).toMatch(/^[0-9a-f]+$/);
  });

  it("is deterministic for the same inputs", async () => {
    const a = await hmacHex("same-message", SECRET);
    const b = await hmacHex("same-message", SECRET);
    expect(a).toBe(b);
  });

  it("produces different tokens for different messages", async () => {
    const a = await hmacHex("messageA", SECRET);
    const b = await hmacHex("messageB", SECRET);
    expect(a).not.toBe(b);
  });

  it("produces different tokens for different secrets", async () => {
    const a = await hmacHex("message", "secret1");
    const b = await hmacHex("message", "secret2");
    expect(a).not.toBe(b);
  });
});

describe("verifyHmac", () => {
  it("accepts a correct token", async () => {
    const token = await hmacHex("user@test.com", SECRET);
    expect(await verifyHmac("user@test.com", token, SECRET)).toBe(true);
  });

  it("rejects a tampered token", async () => {
    const token = await hmacHex("user@test.com", SECRET);
    const tampered = token.slice(0, -1) + (token[63] === "f" ? "0" : "f");
    expect(await verifyHmac("user@test.com", tampered, SECRET)).toBe(false);
  });

  it("rejects a token for a different message", async () => {
    const token = await hmacHex("user@test.com", SECRET);
    expect(await verifyHmac("attacker@test.com", token, SECRET)).toBe(false);
  });

  it("rejects a token of wrong length", async () => {
    expect(await verifyHmac("user@test.com", "short", SECRET)).toBe(false);
  });

  it("returns false on empty inputs", async () => {
    expect(await verifyHmac("", "", SECRET)).toBe(false);
    expect(await verifyHmac("msg", "", SECRET)).toBe(false);
  });
});
