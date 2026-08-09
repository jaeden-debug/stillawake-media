import { describe, expect, it } from "vitest";
import { acquireSubmissionLock } from "./submission-lock";

describe("contact submission lock", () => {
  it("allows the first submit and blocks an immediate duplicate click", () => {
    const lock = { current: false };
    expect(acquireSubmissionLock(lock)).toBe(true);
    expect(acquireSubmissionLock(lock)).toBe(false);
  });
});
