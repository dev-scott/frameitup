# FrameItUp Monorepo

> Premium custom framing SaaS — museum-quality, delivered.

## Architecture

```
frameitup/
├── apps/
│   ├── api/          # NestJS + GraphQL backend       :4000
│   ├── web/          # Main SaaS (frameitup.com)      :3000
│   ├── marketplace/  # Art marketplace                :3001
│   └── finance/      # Internal finance dashboard     :3002
└── packages/
    ├── ui/                  # Shared React components (shadcn/Radix)
    ├── types/               # Shared TypeScript types
    ├── database/            # Prisma schema + client
    ├── utils/               # Shared utility functions
    ├── config-typescript/   # Shared tsconfig presets
    └── config-eslint/       # Shared ESLint presets
```

## Stack

| Layer | Technology |
|---|---|
| Monorepo | Turborepo + pnpm workspaces |
| Backend | NestJS + GraphQL (code-first) |
| ORM | Prisma + PostgreSQL |
| Real-time DB | Convex |
| Frontend | Next.js 15 (App Router) |
| Auth | Clerk |
| Payments | Stripe |
| Email | Resend |
| File Storage | Cloudflare R2 |
| UI | Radix UI + Tailwind CSS |
| CI/CD | GitHub Actions |

## Getting Started

### Prerequisites
- Node.js ≥ 20
- pnpm ≥ 9
- Docker (for PostgreSQL)

### 1. Clone & install

```bash
git clone https://github.com/your-org/frameitup
cd frameitup
pnpm install
```

### 2. Start infrastructure

```bash
docker-compose up -d
```

### 3. Set up environment variables

```bash
cp apps/api/.env.example apps/api/.env.local
cp apps/web/.env.example apps/web/.env.local
cp apps/marketplace/.env.example apps/marketplace/.env.local
cp apps/finance/.env.example apps/finance/.env.local
```

### 4. Set up the database

```bash
pnpm --filter @frameitup/database db:generate
pnpm --filter @frameitup/database db:migrate
pnpm --filter @frameitup/database db:seed
```

### 5. Run all apps

```bash
pnpm dev
```

This starts all 4 apps concurrently via Turborepo.

| App | URL |
|---|---|
| API + GraphQL Playground | http://localhost:4000/graphql |
| Main SaaS | http://localhost:3000 |
| Marketplace | http://localhost:3001 |
| Finance | http://localhost:3002 |

## Useful Commands

```bash
# Run a single app
pnpm --filter @frameitup/web dev

# Run a single package script
pnpm --filter @frameitup/database db:studio

# Type-check everything
pnpm type-check

# Lint everything
pnpm lint

# Build everything
pnpm build

# Clean all build artifacts
pnpm clean
```

## Deployment

- **API**: Railway, Render, or Fly.io (Dockerfile coming)
- **Web / Marketplace / Finance**: Vercel (one project per app)
- **Database**: Neon (serverless Postgres, generous free tier)
- **Convex**: convex.dev (built-in hosting)
