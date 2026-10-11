# AI Agent Operating Guide — BookBridge / Milbe

## 1. Core Principles

You are working on a multi-folder web application project. Before taking action, understand the existing architecture, read relevant project instructions, and inspect the current implementation.

Follow these principles:

- Understand before changing.
- Audit before planning.
- Plan before implementing when the task requires architectural or multi-file changes.
- Prefer minimal, targeted changes over unnecessary refactoring.
- Preserve working functionality and existing architectural decisions.
- Never assume an API, file structure, dependency behavior, or framework convention without verification when documentation is available.
- Do not introduce new features, dependencies, abstractions, or architectural changes without a clear requirement.
- Prioritize correctness, security, maintainability, and timely delivery.

## 2. Understand the Project Structure

The main project directory contains multiple related folders, including:

- `BookBridge/` — Frontend application.
- `BookBridge-Server/` — Backend application.
- `BookBridge-Services/` — Shared or supporting services.
- `Update Plans/` — Implementation plans and task-related planning documents.
- `Docs/` — Project documentation.

These names describe the expected organization; always verify the actual directory names and contents before acting.

Determine which application, service, and files are relevant to the requested task. Read existing documentation and implementation plans when they directly affect the task.

Do not assume that every task requires changes across all folders. Keep changes within the necessary scope.

## 3. Mandatory Next.js Documentation Rule

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

For frontend tasks involving Next.js, inspect the installed version and read the relevant local documentation before implementing changes that depend on framework APIs or conventions.

Do not blindly apply examples from older Next.js versions, outdated tutorials, or model memory.

Respect the existing App Router structure, React Server Components, Server Actions, caching behavior, route conventions, and other version-specific APIs as applicable to the task.

## 4. Default Workflow: Audit → Plan → Implement → Verify

### Phase A — Understand and Audit

Before making changes:

1. Restate the task internally as a specific, testable objective.
2. Inspect the relevant files, components, routes, schemas, services, and dependencies.
3. Trace the existing data flow and identify affected functionality.
4. Check existing documentation and previous implementation plans where relevant.
5. Identify dependencies, edge cases, security implications, and potential regressions.
6. Determine the smallest safe implementation that satisfies the requirements.

Do not modify code during an audit-only task.

### Phase B — Prepare an Implementation Plan

For tasks involving multiple files, architecture, data structures, security, or non-trivial behavior, prepare a concise implementation plan before coding.

The plan should identify:

- The problem and its root cause, where established.
- The proposed solution and important design decisions.
- The files expected to change and why.
- Any data structure, API contract, or backward-compatibility implications.
- The verification strategy and potential risks.

Distinguish confirmed findings from assumptions. If an important requirement or architectural decision is unclear, ask before proceeding.

Do not create a separate planning document for every small task. Use the existing planning workflow when appropriate.

### Phase C — Implement

After the plan is approved, or when the user explicitly authorizes direct implementation:

1. Follow the agreed scope and design.
2. Inspect the current code again if necessary.
3. Make small, focused changes.
4. Preserve unrelated functionality and existing conventions.
5. Update relevant tests, documentation, and dependent code where required.
6. Avoid opportunistic cleanup and unrelated feature development.

Do not expand the task merely because additional improvements are possible.

### Phase D — Verify and Report

After implementation:

1. Run the most relevant available checks, such as type-checking, linting, tests, or a production build.
2. Inspect the final diff for unintended changes.
3. Report what passed, failed, or could not be verified.
4. Identify remaining risks and any required manual testing.

Never claim that a check passed unless it was actually executed and passed.

## 5. Respect the User's Explicit Instructions

The user's task-specific instructions take precedence over this guide unless they conflict with higher-priority system or safety requirements.

- If asked to audit, investigate and report findings without editing code.
- If asked to prepare a plan, prepare the plan without implementing it.
- If asked to implement an approved plan, follow that plan.
- If explicitly asked to implement a small, well-defined change directly, do not unnecessarily block progress with a separate planning phase.
- Ask before making major architectural, UI/UX, data-model, or scope decisions that the user has not authorized.
- Do not repeatedly ask questions when the answer is already available in the codebase, documentation, or previous approved decisions.

When new findings make the approved plan unsafe or materially incorrect, explain the issue and obtain approval before making significant deviations.

## 6. Architecture and Technology Constraints

Verify the current implementation before relying on these known project conventions.

### Frontend

The project has used:

- Next.js 16 App Router
- React 19
- TypeScript with strict checking
- Tailwind CSS v4

Rules:

- Preserve Server Components by default.
- Use Client Components only when client-side interactivity or browser APIs require them.
- Do not convert entire pages or layouts into Client Components to solve a localized problem.
- Avoid introducing Context API or a global state library when local state or existing data-flow patterns are sufficient.
- Follow the existing component, routing, form-validation, and data-fetching conventions.
- Maintain strict TypeScript types and avoid `any`.
- Do not mix incompatible Tailwind CSS versions or configuration patterns.

### Backend

The project has used:

- Express 5
- TypeScript
- MongoDB native collections
- Better Auth

Rules:

- Preserve the existing backend architecture and established collection-access patterns.
- Validate untrusted input at appropriate boundaries.
- Enforce authorization on the server; never rely solely on frontend restrictions.
- Preserve authentication, ownership checks, and access-control rules.
- Use consistent error handling and avoid exposing sensitive internal errors.
- Consider data integrity, concurrent requests, and backward compatibility when modifying data structures or API contracts.

### Shared Services and Integrations

Before changing a shared service, identify all relevant consumers and the effect of the change.

For external APIs, authentication providers, file uploads, translation services, and other integrations:

- Inspect the current implementation and configuration.
- Verify relevant documentation and supported APIs.
- Keep secrets and credentials out of source code and logs.
- Avoid unnecessary dependencies and duplicated business logic.
- Preserve existing integration contracts unless the task requires changing them.

These technology references are not permission to introduce or upgrade dependencies.

## 7. Data Structure and API Changes

Data structure changes require particular care because existing production records and clients may depend on the current format.

Before modifying a schema, request payload, response format, or database field:

1. Inspect existing records and relevant read/write operations.
2. Identify all affected frontend and backend consumers.
3. Determine whether old records or older clients need to remain compatible.
4. Consider validation, optional fields, defaults, and migration requirements.
5. Define how the new behavior will be verified.

Never delete, reset, overwrite, or migrate production data without explicit authorization.

Do not delete existing user-generated records simply to simplify implementation. If a destructive operation is genuinely required, explain the impact and obtain approval before proceeding.

Avoid unnecessary backfills, automatic data transformations, and breaking API changes.

## 8. Security and Privacy

Security is a core requirement, not an optional improvement.

- Enforce authentication and authorization for protected operations.
- Verify ownership and permissions on the server.
- Protect private contact information and user-specific data.
- Never expose secrets, tokens, credentials, or private configuration.
- Validate inputs and handle malformed requests safely.
- Prevent unauthorized access to protected resources.
- Consider rate limiting, abuse cases, and information leakage where relevant.
- Do not weaken existing security controls to make a feature work.
- Do not use real production credentials or expose sensitive production data during testing.

When a task touches authentication, access control, contact visibility, or sensitive data, explicitly review the relevant security boundaries.

## 9. Dependencies, Git, and Environment

- Do not install, remove, or upgrade dependencies without a clear need and appropriate authorization.
- Do not overwrite environment files or change deployment configuration unnecessarily.
- Never expose environment variables or secrets.
- Do not run destructive Git commands.
- Do not discard user changes or overwrite unrelated uncommitted work.
- Do not create Git commits unless explicitly requested.
- Do not push, deploy, or perform production mutations unless explicitly authorized.
- Inspect `git diff` and relevant repository status before finishing when Git is available.

Treat existing uncommitted changes as user-owned work unless their ownership and purpose are clear.

## 10. Testing and Quality Standards

Choose verification steps based on the scope and risk of the change.

Examples include:

- TypeScript type-checking.
- ESLint or the project's configured lint command.
- Relevant unit or integration tests.
- Production builds.
- API behavior and authorization checks.
- Manual UI checks for responsive behavior, loading states, empty states, errors, and success states.

Do not add unrelated tooling solely to satisfy a generic checklist.

If a check fails, determine whether the failure was introduced by the change or already existed. Report the evidence without concealing failures.

A successful build alone does not prove that business logic, security, or user workflows are correct.

## 11. Documentation and Planning Files

Keep documentation useful, accurate, and consistent with the actual implementation.

- Read relevant existing documents before creating replacements.
- Update an existing implementation plan when that is the established workflow.
- Do not create duplicate plans or competing sources of truth.
- Mark proposed changes separately from completed and verified changes.
- Do not claim that a task is complete when implementation or verification remains outstanding.
- Avoid modifying unrelated documentation.

## 12. Scope Control and Delivery Discipline

The project should progress toward a reliable, launch-ready product rather than accumulating unnecessary features.

- Prioritize the user's explicitly stated objective.
- Resolve launch-blocking defects before optional enhancements when the task involves prioritization.
- Prefer a working, maintainable solution over an unnecessarily complex abstraction.
- Separate essential requirements from optional recommendations.
- Do not silently add new features or redesign unrelated interfaces.
- Flag adjacent issues separately instead of expanding the implementation automatically.

## 13. Final Response Format

After completing a task, provide a concise, evidence-based report containing the relevant items:

**Status:** Audit complete, plan prepared, implementation complete, or partially complete.

**Findings:** The key issue and its confirmed cause, if investigated.

**Files changed:** Each important file and the reason for its modification.

**Implementation:** What changed and how it satisfies the requirement.

**Verification:** Commands or tests actually executed and their results.

**Remaining work:** Known limitations, failed checks, manual testing requirements, or decisions requiring approval.

For audit-only tasks, explicitly state that no code was changed.

Do not claim deployment, production success, or complete testing without direct evidence.

## Final Rule

Understand the existing system, protect working behavior, follow the approved scope, and deliver the smallest correct solution with clear verification evidence.
