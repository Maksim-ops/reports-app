FROM node:14.5.0-alpine as build
WORKDIR /usr/src/app
#RUN npm install -g @vue/cli serve
COPY package*.json ./
RUN npm install
COPY . .
COPY vue-multi-image-upload.ssr.js ./node_modules/@zakerxa/vue-multiple-image-upload/dist/
RUN npm run build
#CMD ["npm", "run", "serve"]

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/src/app/dist ./
COPY --from=build /usr/src/app/default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]