FROM mhart/alpine-node:12.14.0

WORKDIR /

COPY ./dist /
COPY ./package.json /package.json

RUN yarn install --production && yarn cache clean

CMD ["node", "."]
