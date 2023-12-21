FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR C:\hgbprj\gss\gssFe

COPY package.json .

ADD . .
RUN pnpm install

EXPOSE 8080

CMD ["npm", "run", "serve"]