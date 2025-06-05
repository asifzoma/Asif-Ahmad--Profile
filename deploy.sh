#!/bin/bash

# Create deployment directory
mkdir -p deploy

# Copy required files and directories
cp -r css deploy/
cp -r js deploy/
cp -r img deploy/
cp -r vendor deploy/
cp .htaccess deploy/
cp .env deploy/
cp *.php deploy/

# Remove any source maps from CSS directory
rm -f deploy/css/*.map

# Set correct permissions
find deploy -type f -exec chmod 644 {} \;
find deploy -type d -exec chmod 755 {} \;

# Create a zip file for easy upload
zip -r deploy.zip deploy/

echo "Deployment package created as deploy.zip"
echo "Upload this file to cPanel and extract it in your public_html directory" 