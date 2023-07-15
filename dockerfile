# Build-Stage
FROM node:14 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Hier könntest du ggf. einen Build-Schritt einfügen, wenn erforderlich

# Production-Stage
FROM nginx:latest as production-stage
COPY --from=build-stage /app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]