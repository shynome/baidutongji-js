FROM node:carbon-alpine

ENV NODE_ENV=production

COPY npm-pack.tgz /tmp/npm-pack.tgz
RUN set -x \
  && tar -xzf /tmp/npm-pack.tgz -C /tmp \
  && mv /tmp/package /app \
  && npm i \
  && rm -rf /tmp/npm-pack.tgz $(npm config get cache)

WORKDIR /app

CMD [ "npm", "start" ]
