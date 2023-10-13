FROM node:18.13.0

WORKDIR /app

COPY . .

RUN npm install

RUN npm install selenium-webdriver
RUN npm install chromedriver

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

CMD ["node", "server.js"]