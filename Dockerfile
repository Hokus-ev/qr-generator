# Step 1: Build
FROM node:20 AS builder

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Build the SvelteKit app
RUN npm run build

# Step 2: Run
FROM node:20

WORKDIR /app

# Copy only what's needed to run the built app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Re-install only prod dependencies
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "build"]
