FROM node:lts-alpine

WORKDIR /web/
COPY . .
RUN yarn
RUN yarn build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html
COPY --from=0 /web/dist/ .

EXPOSE 80
