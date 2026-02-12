FROM node:22-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app
COPY package*.json ./
RUN npm install && npm install -g serve && npm cache clean --force

COPY . .
RUN npm run build
RUN chown -R nodejs:nodejs /app

USER nodejs
EXPOSE 5173

ENTRYPOINT ["dumb-init", "--"]
CMD ["serve", "-l", "5173", "-s", "dist"]