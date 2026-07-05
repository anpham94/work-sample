# ADR 003: Architecture Standards (Config-over-Convention)

## Context

As the project grows, maintaining code quality and structural consistency across different environments (VSCode, WebStorm, CLI) is crucial. I need a robust system that prevents human error, enforces coding standards, and ensures that the codebase remains maintainable, modular, and scalable for any team member.

## Alternatives Considered

- **IDE-specific settings (.vscode folder):** These are editor-bound, often ignored, and fail to provide project-wide enforcement, leading to inconsistent code quality.
- **Config-over-Convention with Automation:** A rigorous approach using centralized configuration, strict linting, and automated git hooks to enforce standards at the project level, regardless of the developer's local environment.

## Final Decision

I have chosen a **Config-over-Convention** approach combined with **Automated Quality Gates**.

- **Modular Structure:** Organization follows a feature-based architecture (grouping by functionality) combined with shared core modules (`hooks`, `utils`, `components`).
- **Path Alias:** Enforced absolute path aliases (e.g., `@/components/...`) via `tsconfig.json`.
- **Quality Assurance:** Integrated **Husky** with **ESLint** and **Prettier** to enforce code style and catch errors during the pre-commit phase, ensuring only compliant code enters the repository.
- **Commit Standards:** Enforced **Commit Convention** to maintain a clean and meaningful version history.

## Trade-offs

- **Pros:**
  - **Error Prevention:** Automated hooks prevent broken or poorly formatted code from ever reaching the main branch, drastically reducing production bugs.
  - **Consistency:** By standardizing paths and formatting via configuration, the project maintains a uniform look and feel regardless of which developer touches it.
  - **Reusability:** The focus on shared `hooks`, `utils`, and generic `components` significantly reduces redundancy and accelerates feature development.
  - **Onboarding Efficiency:** New team members can start contributing immediately without worrying about setting up local environments; the project "self-governs."
- **Cons:**
  - **Initial Complexity:** Setting up Husky, linting rules, and alias paths requires significant upfront effort.
  - **Strictness:** The automated pre-commit checks can feel restrictive to developers initially, requiring them to fix linting errors before committing.
  - **Maintenance:** As dependencies update, the configuration files must be maintained to ensure the quality gates remain effective and performant.
