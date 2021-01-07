FROM node:12-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production PORT=8080

COPY . .

RUN yarn --prod=false && yarn build && rm -rf node_modules && yarn install --prod

CMD ["yarn", "start"]
