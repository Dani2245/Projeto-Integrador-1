# Stage 1: Build the React frontend
FROM python:3.10-slim AS base
WORKDIR /usr/src/app

# Install Node.js 16
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Copy the entire project
COPY . .

# Install npm dependencies and build the project
RUN npm install
RUN pip install poetry
RUN poetry install

# Expose the port your application runs on
EXPOSE 9000

# Specify the command to run your application
CMD ["npm","run","pyhipster"]
