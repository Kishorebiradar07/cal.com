import { describe, it, expect } from "vitest";
import {
  validateEmail,
  parseCommaSeparatedEmails,
  isDuplicateEmail,
  getEmailLabel,
} from "../validateEmail";

describe("Email Validation", () => {
  describe("validateEmail", () => {
    it("should validate correct email addresses", () => {
      expect(validateEmail("user@example.com")).toBe(true);
      expect(validateEmail("test.user+tag@example.co.uk")).toBe(true);
      expect(validateEmail("john.doe@company.io")).toBe(true);
    });

    it("should reject invalid emails", () => {
      expect(validateEmail("invalid")).toBe(false);
      expect(validateEmail("@example.com")).toBe(false);
      expect(validateEmail("user@")).toBe(false);
      expect(validateEmail("user @example.com")).toBe(false);
      expect(validateEmail("")).toBe(false);
    });

    it("should handle whitespace", () => {
      expect(validateEmail("  user@example.com  ")).toBe(true);
      expect(validateEmail(" invalid email ")).toBe(false);
    });
  });

  describe("parseCommaSeparatedEmails", () => {
    it("should parse multiple emails", () => {
      const emails = parseCommaSeparatedEmails("user1@test.com, user2@test.com");
      expect(emails).toEqual(["user1@test.com", "user2@test.com"]);
    });

    it("should handle whitespace", () => {
      const emails = parseCommaSeparatedEmails("  user1@test.com  ,  user2@test.com  ");
      expect(emails).toEqual(["user1@test.com", "user2@test.com"]);
    });

    it("should filter invalid emails", () => {
      const emails = parseCommaSeparatedEmails("user1@test.com, invalid, user2@test.com");
      expect(emails).toEqual(["user1@test.com", "user2@test.com"]);
    });

    it("should handle empty input", () => {
      const emails = parseCommaSeparatedEmails("");
      expect(emails).toEqual([]);
    });

    it("should handle only invalid emails", () => {
      const emails = parseCommaSeparatedEmails("invalid, notanemail, @test.com");
      expect(emails).toEqual([]);
    });

    it("should handle single email", () => {
      const emails = parseCommaSeparatedEmails("user@test.com");
      expect(emails).toEqual(["user@test.com"]);
    });
  });

  describe("isDuplicateEmail", () => {
    it("should detect duplicate emails", () => {
      const existing = ["user@test.com"];
      expect(isDuplicateEmail("user@test.com", existing)).toBe(true);
    });

    it("should be case-insensitive", () => {
      const existing = ["User@Test.com"];
      expect(isDuplicateEmail("user@test.com", existing)).toBe(true);
    });

    it("should check team member emails", () => {
      expect(isDuplicateEmail("member@test.com", [], ["member@test.com"])).toBe(true);
    });

    it("should return false for non-duplicates", () => {
      expect(isDuplicateEmail("newemail@test.com", ["user@test.com"], ["member@test.com"])).toBe(false);
    });

    it("should check both lists", () => {
      const existing = ["invite1@test.com"];
      const teamMembers = ["member@test.com"];
      expect(isDuplicateEmail("invite1@test.com", existing, teamMembers)).toBe(true);
      expect(isDuplicateEmail("member@test.com", existing, teamMembers)).toBe(true);
      expect(isDuplicateEmail("new@test.com", existing, teamMembers)).toBe(false);
    });
  });

  describe("getEmailLabel", () => {
    it("should format email with invite label", () => {
      expect(getEmailLabel("user@example.com")).toBe("user@example.com (invite)");
      expect(getEmailLabel("test@company.io")).toBe("test@company.io (invite)");
    });
  });
});
