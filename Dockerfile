FROM node:18
MAINTAINER Aktan Ishenkulov

WORKDIR /app

COPY package.json package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start"]
