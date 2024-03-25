FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:alpine

WORKDIR /app

COPY --from=builder ./node_modules ./node_modules
COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]
