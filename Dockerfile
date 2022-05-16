FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .
CMD (npm start);
