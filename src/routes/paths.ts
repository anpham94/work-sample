export const PATH_ROUTES = {
  ROOT: "/",
  ACCOUNT: {
    OVERVIEW: "/",
    DETAIL: (id: string) => `/account/${id}`,
    DETAIL_PATTERN: "/account/:id",
  },
} as const;
