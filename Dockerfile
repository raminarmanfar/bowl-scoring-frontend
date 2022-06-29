FROM node:latest as node

RUN apt-get -y update

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

EXPOSE 80

FROM nginx:alpine
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/bowling /usr/share/nginx/html

#ENTRYPOINT ["nginx","-g","daemon off;"]
