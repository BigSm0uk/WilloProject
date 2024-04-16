FROM node:20.11.1-alpine3.19 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 80
EXPOSE 443

CMD ["npm", "start"]

#STAGE 2
FROM nginx:1.24.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
#COPY certificate/private.key /etc/nginx/certs/private.key
#COPY certificate/certificate.crt /etc/nginx/certs/certificate.crt
COPY --from=build /usr/src/app/dist/web-app /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
