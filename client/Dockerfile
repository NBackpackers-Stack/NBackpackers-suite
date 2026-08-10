FROM node:22-alpine AS base
WORKDIR /app

#Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat

COPY package.json pnpm-lock.yaml ./

RUN corepack enable pnpm

RUN pnpm i --frozen-lockfile

#Builder
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN corepack enable pnpm
RUN pnpm run build

#Runner
FROM base AS runner
ENV NODE_ENV=production

#Security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#copy static file and standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

#Runner
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node","server.js"]
