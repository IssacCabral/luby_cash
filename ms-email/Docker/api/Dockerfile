FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3335

CMD ["npm", "run", "dev"]