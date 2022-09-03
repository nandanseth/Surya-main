FROM node:16.13.0-alpine3.14
WORKDIR /app
COPY . /app

RUN yarn
RUN yarn build --production

ENV NODE_ENV production

EXPOSE 3000

CMD ["yarn", "start:prod"]