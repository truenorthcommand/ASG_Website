import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Mock notification helper
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

const mockCtx = {
  user: null,
  req: {} as any,
  res: { clearCookie: vi.fn() } as any,
};

const validInput = {
  customerName: "Jane Smith",
  contactEmail: "jane@example.co.uk",
  contactPhone: "07700900000",
  address: "12 High Street, Ashford",
  postcode: "TN24 0AB",
  description: "Burst pipe in kitchen — water coming through ceiling.",
  urgency: "high" as const,
  emergency_type: "burst_pipe",
};

describe("intake.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns success and jobNo when TrueNorthOS responds OK", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ jobNo: "J-2026-001", success: true }),
    });

    const caller = appRouter.createCaller(mockCtx);
    const result = await caller.intake.submit(validInput);

    expect(result.success).toBe(true);
    expect(result.jobNo).toBe("J-2026-001");
    expect(result.integrationError).toBeNull();
  });

  it("returns success with null jobNo when TrueNorthOS returns non-OK status", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 503,
      text: async () => "Service Unavailable",
    });

    const caller = appRouter.createCaller(mockCtx);
    const result = await caller.intake.submit(validInput);

    expect(result.success).toBe(true);
    expect(result.jobNo).toBeNull();
    expect(result.integrationError).toContain("503");
  });

  it("returns success with error message when fetch throws", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network timeout"));

    const caller = appRouter.createCaller(mockCtx);
    const result = await caller.intake.submit(validInput);

    expect(result.success).toBe(true);
    expect(result.jobNo).toBeNull();
    expect(result.integrationError).toBe("Network timeout");
  });

  it("validates required fields — rejects empty customerName", async () => {
    const caller = appRouter.createCaller(mockCtx);
    await expect(
      caller.intake.submit({ ...validInput, customerName: "" })
    ).rejects.toThrow();
  });

  it("validates required fields — rejects invalid email", async () => {
    const caller = appRouter.createCaller(mockCtx);
    await expect(
      caller.intake.submit({ ...validInput, contactEmail: "not-an-email" })
    ).rejects.toThrow();
  });

  it("accepts normal urgency without emergency_type", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ jobNo: "J-2026-002", success: true }),
    });

    const caller = appRouter.createCaller(mockCtx);
    const result = await caller.intake.submit({
      ...validInput,
      urgency: "normal",
      emergency_type: undefined,
    });

    expect(result.success).toBe(true);
  });
});
