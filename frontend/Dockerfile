FROM node:16.13.0-alpine3.14
WORKDIR /app
COPY . /app
ENV NODE_ENV production
RUN npm install --production
RUN yarn build --production
EXPOSE 3000

CMD ["yarn", "start:prod"]