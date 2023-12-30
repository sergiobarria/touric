#!/bin/bash

echo "Creating resource group..."

# Check if a resource name is provided as an argument
if [$# -eq 1]; then
    resource_name "$1"
else
    read -p "Enter the resource name: " resource_name
fi

# Check if the resource name is empty
if [ -z "$resource_name" ]; then
    echo "Warning: Resource name not provided. Script terminated."
    exit 1
fi

# Define the path where the directory should be created
dir_path="./src/modules/$resource_name/"

# Check if the directory already exists, if so, do not create it, and don't stop the script, else create it
if [ -d "$dir_path" ]; then
    # check if the directory is empty
    if [ -n "$(find "$dir_path" -mindepth 1 -print -quit)" ]; then
        echo "Warning: Directory '$dir_path' is not empty. Script terminated."
        exit 1
    fi
    echo "Directory '$dir_path' already exists"
else
    mkdir -p "$dir_path"
    echo "Directory '$dir_path' created"
fi

# create files inside the directory
touch "${dir_path}${resource_name}.controllers.ts"
touch "${dir_path}${resource_name}.routes.ts"
touch "${dir_path}${resource_name}.schemas.ts"
touch "${dir_path}${resource_name}.services.ts"

echo "Directory and files created for resource: $resource_name"
