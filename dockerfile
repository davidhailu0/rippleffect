FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Define build arguments
ARG NEXT_PUBLIC_BUILD_INFO
ARG NEXT_PUBLIC_APP_DOMAIN
ARG NEXT_PUBLIC_APP_ORIGIN

# Set environment variables from build arguments
ENV NEXT_PUBLIC_BUILD_INFO=$NEXT_PUBLIC_BUILD_INFO
ENV NEXT_PUBLIC_APP_DOMAIN=$NEXT_PUBLIC_APP_DOMAIN
ENV NEXT_PUBLIC_APP_ORIGIN=$NEXT_PUBLIC_APP_ORIGIN

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all files and build the project
COPY . .

RUN export $(grep -v '^#' .env.production | xargs) && npm run build

# Use a lightweight node image to serve the static files
FROM node:18-alpine AS runner

# Install http-server globally
RUN npm install -g http-server

# Copy the generated static files from the builder stage
COPY --from=builder /app/out /app/out

# Expose port 3000
EXPOSE 3000

# Serve the static files using http-server
CMD ["http-server", "/app/out", "-p", "3000"]