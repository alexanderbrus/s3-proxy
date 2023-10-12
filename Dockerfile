ARG IMAGE_VERSION=20-bullseye-slim

FROM node:${IMAGE_VERSION} as deps

WORKDIR /usr/app

RUN apt update && \
  apt install -y --no-install-recommends tini && \
  rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/usr/bin/tini", "--", "npm", "run"]

### --- Dev image target ---- ###

FROM deps as dev

WORKDIR /usr/app

COPY . .

ENV NODE_ENV=development

CMD ["dev"]

### --- Dev image target ---- ###

FROM node:${IMAGE_VERSION} as npm-deps

WORKDIR /usr/app

COPY ./package.json ./package-lock.json ./

ENV NODE_ENV=build

# Clean install
RUN npm ci && rm -f package-lock.json

WORKDIR /usr/app/production

COPY ./package.json ./package-lock.json ./

ENV NODE_ENV=production

# Clean install
RUN npm ci && rm -f package-lock.json

FROM npm-deps as build

WORKDIR /usr/app

COPY ./tsconfig.json ./package.json ./
COPY ./src/ ./src/

RUN npm run build

FROM deps as final

WORKDIR /usr/app

COPY --from=npm-deps /usr/app/production/node_modules ./node_modules
COPY --from=build /usr/app/package.json ./
COPY --from=build /usr/app/dist ./dist

CMD ["start"]
