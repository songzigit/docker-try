FROM node:12-alpine
RUN mkdir /app
WORKDIR /app
RUN npm config set registry https://registry.npm.taobao.org 
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run dev