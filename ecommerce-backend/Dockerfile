FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache python3 make g++ 


RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 80


CMD [ "npm", "run", "start:prod" ]
