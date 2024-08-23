# stage1 - build react app first
FROM node:22.7.0-alpine as build
WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app
RUN npm install --omit=dev
COPY . /app
ARG ALCOHOLIC_HOST
ARG ALCOHOLIC_PORT
ARG ALCOPARTY_HOST
ARG ALCOPARTY_PORT
ARG HOST_NAME
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=build /app/build /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
