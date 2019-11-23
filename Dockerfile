FROM node:latest AS builder
ENV APP=/var/www

#RUN apt-get update # && app-get install -y curl

# Create app directory
RUN mkdir -p $APP
WORKDIR $APP

# Install app dependencies
COPY package*.json $APP/

RUN npm install
#RUN npm rebuild node-sass

# Bundle app source in this experiment the dist should be build
# already  as well as all node modules
COPY . $APP
RUN npm run-script build_prod

FROM nginx:latest
RUN apt-get update && apt-get install -y nginx

ENV APP1=/var/www
WORKDIR /usr/share/nginx/html


# now there is a folder in dist for angular 6
COPY --from=builder ${APP1}/dist/ngtemplate .
COPY proxy.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]


# docker build -t hellofrontend -f Dockerfile  .
# docker run -p 3000:8080 -d --name hellofrontend hellofrontend

# to inspect
# docker run -it -p 3000:8080  hellofrontend /bin/bash

