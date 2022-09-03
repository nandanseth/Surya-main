FROM node:16.13.0-alpine as build
WORKDIR /app
COPY . /app
# RUN yarn install
# RUN yarn build

ENV NODE_ENV production

EXPOSE 3000

CMD ["yarn", "start:prod"]