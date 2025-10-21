# Software Architecture Description

## 1. Scope
This document describes the architecture of the Personal Profile Page web application, following ISO/IEC/IEEE 42010.

## 2. Stakeholders
- Developer (site owner/admin)
- Visitors (users)
- Cloud provider/host

## 3. Architectural Views
- **Context**: Web app for portfolio, blog, and contact
- **Container**: SvelteKit frontend/backend, PostgreSQL DB
- **Component**: Svelte components, server logic, Prisma models
- **Deployment**: Node.js/serverless, managed DB

## 4. Key Decisions
- SvelteKit for full-stack JS/TS
- Prisma for DB access
- Tailwind for styling
- Session-based auth

## 5. Quality Attributes
- Responsive, accessible, secure, extensible

## 6. Constraints
- Node.js runtime
- PostgreSQL DB

## 7. Rationale
- Modern stack for rapid development and deployment

See other docs for diagrams and details.