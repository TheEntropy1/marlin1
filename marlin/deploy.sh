#!/bin/bash

# Build client
cd client
npm install
npm run build

# Copy build to server
cd ..
rm -rf server/public
mkdir server/public
cp -r client/build/* server/public/

# Install server dependencies
cd server
npm install

echo "Deployment setup complete. Run 'npm start' in the server directory to start the application."