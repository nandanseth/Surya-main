# FROM node:16.13-alpine
FROM gcr.io/google_appengine/nodejs

# RUN /usr/local/bin/install_node '16.17.0'  # meh...

COPY . /app/
WORKDIR /app
# RUN npm install --unsafe-perm --global typescript sync react-scripts webpack
# RUN npm install -g typescript sync react-scripts webpack --verbose
RUN yarn
ENV NODE_ENV=production
RUN yarn build --production 

CMD yarn start