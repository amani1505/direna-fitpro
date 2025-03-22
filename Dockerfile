# Base stage for building Angular App
FROM node:18 AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy source code and build
COPY . .
RUN npm run build

# Production stage (Serve Angular app using Node.js with HTTPS)
FROM node:18 AS production
WORKDIR /app

# Copy built Angular files
COPY --from=builder /app/dist/direna-fitpro/browser ./dist

# Install a simple HTTP server to serve the Angular app
RUN npm install -g http-server

# Expose port 443 for HTTPS
EXPOSE 443

# Serve the Angular app with HTTPS
CMD ["http-server", "dist", "-p", "443", "--ssl", "--cert", "/etc/letsencrypt/live/direna.romanixtz.com/fullchain.pem", "--key", "/etc/letsencrypt/live/direna.romanixtz.com/privkey.pem", "--proxy", "https://node_server:4000?"]
