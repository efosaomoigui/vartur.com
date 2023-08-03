#!/bin/bash

# Function to check if Docker is installed
check_docker_installed() {
  if ! [ -x "$(command -v docker)" ]; then
    echo "Error: Docker is not installed. Please install Docker before running this script."
    exit 1
  fi
}

# Function to build and run the Docker container for Vue.js UI application
build_and_run_vue() {
  echo "Building Docker image for Vue.js UI application..."
  docker build -t vartur/vue_ui .

  echo "Starting Vue.js UI application container..."
  docker run -d -p 8080:80 --name vue_ui_container vartur/vue_ui
}

# Function to check if Vue.js UI application container is running
check_vue_running() {
  if [ "$(docker ps -q -f name=vue_ui_container)" ]; then
    echo "Vue.js UI application container is running."
  else
    echo "Error: Vue.js UI application container is not running."
    exit 1
  fi
}

# Function to clean up old Vue.js container (if exists) and start a new one
restart_vue() {
  echo "Stopping and removing existing Vue.js UI application container (if any)..."
  docker stop vue_ui_container >/dev/null 2>&1
  docker rm vue_ui_container >/dev/null 2>&1
  build_and_run_vue
}

# Main function
main() {
  check_docker_installed

  # Check if the Vue.js UI application container is already running
  if [ "$(docker ps -q -f name=vue_ui_container)" ]; then
    echo "A Vue.js UI application container named 'vue_ui_container' is already running."
    echo "Do you want to restart the container? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
      restart_vue
    else
      echo "Deployment for Vue.js UI application aborted."
      exit 0
    fi
  else
    # Check if the Docker image for Vue.js UI application exists
    if [ "$(docker images -q vartur/vue_ui)" ]; then
      restart_vue
    else
      build_and_run_vue
    fi
  fi

  check_vue_running
}

main
