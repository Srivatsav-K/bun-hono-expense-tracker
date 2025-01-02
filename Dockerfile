FROM oven/bun:alpine
WORKDIR /usr/src/app

# Copy installation realted files for caching
COPY package.json .
COPY bun.lockb .
COPY ./client/package.json ./client/package.json
COPY ./client/bun.lockb ./client/bun.lockb

# Install deps
RUN bun run install:deps

# Copy remaining files
COPY . .

# Build client
RUN bun run build:client

# Run
CMD [ "bun","run","start" ]
