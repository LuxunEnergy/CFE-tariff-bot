# Usa una imagen base con Node.js preinstalado
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el código de tu proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Instala Selenium y el controlador de Chrome
RUN npm install selenium-webdriver
RUN npm install chromedriver

# Define las variables de entorno necesarias
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

# Comando para ejecutar el script Selenium
CMD ["node", "index.js"]