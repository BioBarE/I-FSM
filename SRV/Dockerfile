FROM node:alpine AS builder
RUN pwd

ARG PROJECT_NAME=srv

COPY ./SRV/package.json /${PROJECT_NAME}/package.json
COPY ./SRV/package-lock.json /${PROJECT_NAME}/package-lock.json

WORKDIR /${PROJECT_NAME}

RUN npm install


COPY . /${PROJECT_NAME}
WORKDIR /${PROJECT_NAME}

EXPOSE 3001

CMD [ "npm", "start" ]
