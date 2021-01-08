FROM node:12-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production PORT=8080 GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/credentials.json"

COPY package.json yarn.lock ./

RUN yarn --prod=false

COPY . .

# buildを行わないとsrc/node_modules/@sapperが生成されず、Type Checkを走らせることができない。CIの実行時間節約のためここで行う
RUN yarn build && yarn fmt:check && yarn tsc --noEmit && yarn validate && rm -rf node_modules && yarn install --prod

CMD ["yarn", "start"]
