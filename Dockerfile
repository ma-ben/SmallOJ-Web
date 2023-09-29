FROM nginx
LABEL authors="matao & LRD"
COPY ./dist /usr/share/nginx/html
EXPOSE 80