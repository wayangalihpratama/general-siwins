FROM node:20

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y libc6

# Copy package files
COPY package*.json ./

# Install ALL dependencies inside the container
RUN npm install

# Copy source code
COPY . .

# Build the production application
RUN npm run build

EXPOSE 3000

# Start the production server
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
