FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY *json ./

RUN npm install

COPY . .

RUN npm run build

CMD npm run serve
