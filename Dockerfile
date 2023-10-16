FROM node:18.17.0-alpine

RUN apk add --no-cache chromium chromium-chromedriver

ENV NPM_CONFIG_UPDATE_NOTIFIER false
ENV NPM_CONFIG_FUND false

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

USER 1000

CMD ["node", "server.js"]