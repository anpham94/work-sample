# ADR 002: API Integration Approach

## Context

The application needs to interact with a mock backend API frequently. I require a standardized, maintainable, and professional way to handle requests, responses, and potential errors across the entire codebase.

## Alternatives Considered

- **Direct fetch in components:** Simple for small components, but leads to code duplication, difficult global error handling, and maintenance challenges.
- **TanStack Query (React Query):** Powerful for caching and synchronization, but potentially adds unnecessary complexity for this project's current scope.
- **Base API Service with Axios + JSON Server:** A centralized approach using a configured Axios instance combined with a locally hosted JSON Server to simulate a real database.

## Final Decision

I have chosen to implement a **Centralized Base API Service using Axios** integrated with **JSON Server**.

## Trade-offs

- **Pros:**
  - **Database Control:** JSON Server allows me to simulate a real database where I can freely modify, add, or delete data, offering a much more realistic experience than static mock data or external dummy APIs.
  - **API Consistency:** Applying Axios API calls to a local server mirrors a production environment, allowing me to build robust request interceptors and error handling.
  - **Maintainability:** Centralizing API configuration (base URL, headers) ensures a consistent architectural pattern for data fetching.
- **Cons:**
  - **Setup Overhead:** Requires initial effort to configure both the Axios wrapper and the JSON Server environment.
  - **Manual Sync:** As with any mock environment, I am responsible for managing the local `db.json` file state.
  - **Complexity:** Unlike TanStack Query, it does not provide built-in advanced features like automatic caching or optimistic updates.
