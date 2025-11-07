# Stage 1: Dependencies
FROM node:20-slim AS dev

ENV NODE_ENV production

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory.
COPY . .

# Install dependencies.
RUN cd blog && npm install
# RUN cd blog && npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer

# Explicitly install the lightningcss-linux-arm64-gnu variant of lightningcss
# This often resolves issues where the auto-detection fails.
# Adjust the version to match your project's lightningcss version if necessary.
# We are assuming the version is compatible with the current tailwindcss version.
# RUN cd blog && npm install lightningcss-linux-arm64-gnu@latest

CMD ["sh", "-c", "cd blog && npm run dev"]

# # Stage 2: Builder
# FROM node:20-slim AS builder

# WORKDIR /app

# COPY --from=deps /app/node_modules ./node_modules
# COPY blog/. .
# COPY content /content

# # Build the Next.js application
# RUN npm run build

# # Stage 3: Runner
# FROM node:20-slim AS runner

# WORKDIR /app

# # Set environment variables for Next.js development
# ENV NODE_ENV development

# # Start the Next.js development server
# CMD ["node", "server.js"]
