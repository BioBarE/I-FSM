FROM node:alpine AS builder

ARG PROJECT_NAME=srv

COPY ./package.json /${PROJECT_NAME}/package.json
COPY ./package-lock.json /${PROJECT_NAME}/package-lock.json

WORKDIR /${PROJECT_NAME}

RUN npm install

COPY . /${PROJECT_NAME}
WORKDIR /${PROJECT_NAME}

EXPOSE 3001

CMD [ "npm", "start" ]
