FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g next
RUN npm install sharp

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]