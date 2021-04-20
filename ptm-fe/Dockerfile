#FROM node:14.15.5-alpine AS build
#FROM node:14.16.0-alpine AS build

FROM node:14.16.1-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install --legacy-peer-deps --silent
COPY . ./
RUN npm run build
#CMD ["npm", "start"]

#FROM nginx:1.19.6-alpine
#FROM nginx:1.19.8-alpine
FROM nginx:1.19.10-alpine
VOLUME /usr/share/nginx/html
VOLUME /etc/nginx
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
