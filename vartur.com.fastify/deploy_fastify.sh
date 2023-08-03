#!/bin/bash

# Function to check if Docker is installed
check_docker_installed() {
  if ! [ -x "$(command -v docker)" ]; then
    echo "Error: Docker is not installed. Please install Docker before running this script."
    exit 1
  fi
}

# Function to build and run the Docker container for Fastify application
build_and_run_fastify() {
  echo "Building Docker image for Fastify application..."
  docker build -t vartur/fastify_app .

  echo "Starting Fastify application container..."
  docker run -d -p 3000:3000 --name fastify_app_container vartur/fastify_app
}

# Function to check if Fastify application container is running
check_fastify_running() {
  if [ "$(docker ps -q -f name=fastify_app_container)" ]; then
    echo "Fastify application container is running."
  else
    echo "Error: Fastify application container is not running."
    exit 1
  fi
}

# Function to clean up old Fastify container (if exists) and start a new one
restart_fastify() {
  echo "Stopping and removing existing Fastify application container (if any)..."
  docker stop fastify_app_container >/dev/null 2>&1
  docker rm fastify_app_container >/dev/null 2>&1
  build_and_run_fastify
}

# Main function
main() {
  check_docker_installed

  # Check if the Fastify application container is already running
  if [ "$(docker ps -q -f name=fastify_app_container)" ]; then
    echo "A Fastify application container named 'fastify_app_container' is already running."
    echo "Do you want to restart the container? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
      restart_fastify
    else
      echo "Deployment for Fastify application aborted."
      exit 0
    fi
  else
    # Check if the Docker image for Fastify application exists
    if [ "$(docker images -q vartur/fastify_app)" ]; then
      restart_fastify
    else
      build_and_run_fastify
    fi
  fi

  check_fastify_running
}

main
