export const state = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
} as const;

export type stateType = (typeof state)[keyof typeof state];
