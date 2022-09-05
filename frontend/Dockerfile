FROM node:16.13.0-alpine
COPY . /app
WORKDIR /app

# RUN yarn install --production --verbose
# RUN yarn build --production
EXPOSE 3000
ENV NODE_ENV production
RUN yarn build --production
CMD ["serve", "-s", "build"]