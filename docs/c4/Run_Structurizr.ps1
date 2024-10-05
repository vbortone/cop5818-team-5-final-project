# Pull the latest Structurizr Lite Docker image
docker pull structurizr/lite

# Get the current directory
$currentDir = (Get-Location).Path

# Run the Structurizr Lite Docker container with the current directory mounted
docker run -it --rm -p 8080:8080 -v "${currentDir}:/usr/local/structurizr" structurizr/lite