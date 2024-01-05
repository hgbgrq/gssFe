FROM node:16 as build-stage

WORKDIR /app
RUN corepack enable

COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install

#COPY . .
#RUN pnpm build
#
#FROM nginx:stable-alpine as production-stage
#
#COPY --from=build-stage /app/dist /usr/share/nginx/html
#
#EXPOSE 3333
#
#CMD ["nginx", "-g", "daemon off;"]