# CLAUDE.md

This file is the constitution for this codebase. Every implementation, refactor, and architectural decision must align with the principles below.

@AGENTS.md

---

# Project Philosophy

This project is **not a traditional portfolio**.

It is a **business growth platform** designed to position Ali as a strategic partner for corporate businesses, technology companies, and luxury brands.

The philosophy behind this project is:

> "Businesses grow faster when every part of the business works toward the same goal."

Branding, websites, and AI automation are not separate services. They are **connected business systems**.

Every implementation should reinforce this philosophy.
- Increase trust
- Increase qualified enquiries
- Increase conversions
- Save time
- Reduce operational costs
- Improve scalability

Technology exists to support business outcomes—not the other way around.

---

# Product Principles

**Always optimize for:**

- Clarity
- Trust
- Simplicity
- Long-term maintainability
- Scalability
- Business value

**Avoid:**

- Unnecessary complexity
- Trendy UI for the sake of trends
- Premature optimization
- Duplicate code

---

# Engineering Principles

**Always prefer:**

- Reusable components
- Small files
- Semantic HTML
- Accessibility
- Server Components when appropriate
- Strong TypeScript
- Composition over duplication
- Performance before visual effects

Never introduce a dependency unless it clearly improves the project.

---

# Component Architecture

Use this structure:

```
components/
├── ui/         → Reusable interface elements
├── layout/     → Layout-level components (header, footer, containers)
└── sections/   → Complete homepage sections
```

- **Sections** represent complete homepage sections.
- **UI** represents reusable interface elements.
- **Pages** Pages should primarily compose sections and layouts.

Business logic belongs inside reusable components or dedicated modules.

---

# Data Philosophy

- Whenever possible, keep content separate from components.
- Use dedicated data files.
- Components should receive props rather than containing hardcoded business content.

---

# Design Philosophy

**Quiet Confidence is the defining design philosophy of this project.**


- Editorial rather than corporate.

- Premium through craftsmanship, not decoration.

- Motion should guide attention, never distract from content.

- Typography carries the visual hierarchy.

- Whitespace is a design element.

- Every section should communicate one clear idea.

- Every visual decision must improve clarity or trust.

---

# Motion Principles

Animations should enhance comprehension rather than attract attention.

Use subtle motion to:

- Introduce content
- Guide the eye
- Reinforce hierarchy
- Improve perceived quality

Avoid animations that delay interaction or distract from business goals.

---

# Code Style

- Write code that another senior engineer can understand immediately.
- Prefer readability over cleverness.
- Prefer explicit names over abbreviations.
- Keep components focused on one responsibility.

---

# Collaboration

- Treat every implementation as production code.
- Explain architectural decisions.
- Suggest improvements when appropriate.
- Do not redesign the product unless requested.
- Respect the existing design system.

---

# AI Collaboration

When proposing solutions:

1. Prefer the simplest architecture that solves the problem.
2. Explain major technical decisions before implementing them.
3. Warn about trade-offs.
4. Suggest improvements without forcing them.
5. Challenge assumptions when a better approach exists.

Act as a senior engineering partner rather than a code generator.