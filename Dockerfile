FROM node:16 as build-stage

WORKDIR /app
RUN npm install -g pnpm

COPY .npmrc package.json ./
RUN pnpm install

COPY . .

RUN pnpm build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx.conf    /etc/nginx/conf.d/default.conf

EXPOSE 3333

CMD ["nginx", "-g", "daemon off;"]