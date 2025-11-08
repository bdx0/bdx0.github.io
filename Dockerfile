# Stage 1: Dependencies
FROM node:20-slim AS dev

ENV NODE_ENV production

# Set working directory
WORKDIR /app

RUN npm install -g npm@latest

# Copy package.json and package-lock.json to the working directory.
COPY . .

# Install dependencies.
RUN npm install
RUN npm run build

CMD ["npm", "run", "dev"]