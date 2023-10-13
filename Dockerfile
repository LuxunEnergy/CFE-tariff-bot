FROM node:18.13.0

WORKDIR /app

COPY . .

RUN npm ci

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

CMD ["node", "server.js"]