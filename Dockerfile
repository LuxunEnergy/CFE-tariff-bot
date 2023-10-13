FROM node:18.12.0

RUN useradd -u 1000 myuser

RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    libnss3 \
    libgconf-2-4 \
    libfontconfig1

WORKDIR /app

COPY . .

RUN npm ci

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

CMD ["node", "server.js"]