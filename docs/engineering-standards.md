# Engineering Standards

## Purpose

These standards define how software is built in this project.

The goal is consistency, maintainability, scalability, and long-term quality.

Every contribution should follow these standards.

---

# Core Principles

Always optimize for:

- Readability
- Maintainability
- Scalability
- Simplicity
- Performance

Prefer simple solutions over clever ones.

Code should be easy to understand six months later.

---

# Project Structure

```
src/

app/
components/
    ui/
    layout/
    sections/
data/
hooks/
lib/
types/
styles/
```

Every folder has a single responsibility.

Avoid creating folders without a clear purpose.

---

# Component Architecture

Pages compose sections.

Sections compose UI components.

UI components never depend on page-specific logic.

Business logic belongs inside reusable modules whenever possible.

---

# Naming Conventions

Use descriptive names.

Examples:

HeroSection.tsx

ProjectCard.tsx

PrimaryButton.tsx

Avoid abbreviations unless they are industry standards.

---

# Data Management

Business content belongs inside dedicated data files.

Avoid hardcoding copy inside UI components.

Components should receive props whenever practical.

This allows future integration with CMSs, databases, or AI-generated content.

---

# Styling

Tailwind CSS is the primary styling solution.

Guidelines:

- Prefer utility classes.
- Keep class lists readable.
- Avoid unnecessary nesting.
- Reuse UI components instead of repeating styles.

---

# State Management

Prefer local state first.

Avoid global state until there is a clear need.

Do not introduce state management libraries prematurely.

---

# Performance

Optimize for:

- Fast page loads
- Small bundles
- Accessible markup
- Image optimization
- Lazy loading where appropriate

Never sacrifice performance for visual effects.

---

# Accessibility

Every feature should support:

- Semantic HTML
- Keyboard navigation
- Proper heading hierarchy
- Accessible forms
- Alt text for images
- Sufficient color contrast

Accessibility is part of quality—not an optional feature.

---

# Dependencies

Before installing a dependency ask:

1. Does Next.js already solve this?

2. Can we build it ourselves simply?

3. Does this dependency clearly improve the project?

Avoid unnecessary packages.

---

# Git Workflow

Each feature should represent a logical commit.

Write meaningful commit messages.

Example:

feat: build hero section

fix: improve mobile navigation

refactor: simplify project cards

Avoid large commits containing unrelated changes.

---

# Code Reviews

Before considering work complete, verify:

- Code is readable.
- Components are reusable.
- No duplicated logic.
- No unnecessary dependencies.
- Responsive behavior works.
- Accessibility has been considered.
- Documentation remains accurate.

---

# AI Development Workflow

Architecture decisions originate from documentation.

Implementation is performed through Claude Code.

Major product and UX decisions are reviewed before implementation.

If implementation conflicts with documentation, documentation wins until updated.

---

# Definition of Done

A task is complete when:

- Requirements are met.
- Code is clean.
- Responsive behavior is verified.
- Accessibility has been considered.
- No obvious technical debt has been introduced.
- Documentation remains aligned.

"Working" is not enough.

The implementation should also be maintainable.