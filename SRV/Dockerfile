FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:alpine

WORKDIR /app

COPY --from=builder ./node_modules ./node_modules
COPY . .

EXPOSE 3000  # Replace with your app's port if it's different

CMD [ "npm", "start" ]
