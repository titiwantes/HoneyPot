FROM node

WORKDIR /app

RUN apt-get update

COPY ./src .

RUN yarn install

CMD ["yarn", "start"]

EXPOSE 3001