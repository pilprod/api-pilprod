FROM node:current AS production
ENV NODE_ENV=production
ENV TZ=Europe/Moscow
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD npm run production

LABEL org.opencontainers.image.source=https://github.com/pilprod/api-pilprod