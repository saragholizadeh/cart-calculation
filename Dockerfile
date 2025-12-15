# base 
FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY src ./src


# test
FROM base AS test

COPY jest.config.ts ./
COPY nodemon.json ./

CMD ["npm", "test"]


# builder
FROM base AS builder

RUN npx tsc
RUN npm prune --production


# production
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

CMD ["node", "dist/server.js"]
