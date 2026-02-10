FROM node:18-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force

COPY . .
RUN chown -R nodejs:nodejs /app

USER nodejs
EXPOSE 4003

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.js"]