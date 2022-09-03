FROM gcr.io/google-appengine/nodejs

# Add the runtime builder code
ADD contents/ /opt/nodejs-runtime-builder

ENV NODE_ENV=production

# Setup the runtime builder code
RUN cd /opt/nodejs-runtime-builder && npm install && npm run compile

ENTRYPOINT ["node", "/opt/nodejs-runtime-builder/build/src/main.js", "--app-dir", "/workspace"]