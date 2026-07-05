export const PATH_ROUTES = {
  ROOT: "/",
  AUTH: {
    LOGIN: "/login",
  },
  ACCOUNT: {
    OVERVIEW: "/",
    DETAIL: (accountId: string) => `/account/${accountId}`,
    DETAIL_PATTERN: "/account/:accountId",
  },
} as const;
