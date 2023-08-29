# Production-Stage
FROM nginx:latest as production-stage
WORKDIR /app
COPY . ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
