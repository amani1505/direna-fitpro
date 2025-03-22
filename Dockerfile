# Base stage for building Angular App
FROM node:18 AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy source code and build
COPY . .
RUN npm run build

# Production Image with NGINX
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Copy built Angular files
COPY --from=builder /app/dist/direna-fitpro/browser /usr/share/nginx/html

# NGINX Config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
