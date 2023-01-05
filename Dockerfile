FROM node:14.5.0-alpine as build-stage
WORKDIR /usr/src/app
#RUN npm install -g @vue/cli
COPY package*.json ./
RUN npm install
COPY . .
COPY vue-multi-image-upload.ssr.js ./node_modules/@zakerxa/vue-multiple-image-upload/dist/
RUN npm run build

FROM nginx:stable-alpine as production-stage
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/dist ./
CMD ["nginx", "-g", "daemon off;"]