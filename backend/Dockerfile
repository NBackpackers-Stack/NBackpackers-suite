FROM node:22-alpine

WORKDIR /app

RUN corepack enable pnpm

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 4000

CMD ["npm","start"]

