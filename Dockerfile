FROM node:alpine

MAINTAINER RAHUL TREHAN

COPY . /var/www

WORKDIR /var/www

RUN yarn

EXPOSE 8080

ENTRYPOINT ["node", "server.js"]
