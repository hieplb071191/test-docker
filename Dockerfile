# BASE STAGE
FROM node:22-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./


# DEVELOPMENT STAGE
FROM base AS development

RUN npm install

COPY . .

EXPOSE 5000 

CMD ["npm", "run", "start:dev"]

# BUILD STAGE
FROM development AS build

RUN npm run build

RUN npm prune --production

# PRODUCTION STAGE
FROM node:22-alpine AS production
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

EXPOSE 5000
CMD ["node", "dist/main.js"]