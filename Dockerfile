FROM node:12-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production PORT=8080 GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/credentials.json"

COPY package.json yarn.lock ./

RUN yarn --prod=false

COPY . .

RUN yarn build && rm -rf node_modules && yarn install --prod

CMD ["yarn", "start"]
