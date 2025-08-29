# Stage 1: Build frontend
FROM node:22.2.0 AS client-builder
WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client ./client
RUN cd client && npm run build

# Stage 2: Build backend
FROM node:18.20.8
WORKDIR /app

# Copy backend package.json first to install dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy backend source code
COPY server ./server

# Copy frontend build output into backend/public (so Express can serve it)
COPY --from=client-builder /app/client/dist ./server/public

# Set environment variables (adjust as needed)
ENV PORT=5000
ENV MONGO_URI=mongodb://mongo:27017/mern_db

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "server/index.js"]
