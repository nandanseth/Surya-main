FROM node:16.13.0-alpine
COPY . /app
WORKDIR /app
ENV NODE_ENV production
RUN npm install --production
RUN yarn build --production
EXPOSE 3000

CMD ["yarn", "start"]