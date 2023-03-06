FROM node:lts-alpine as development

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

# Compile typescript to javascript
RUN npm run build

CMD [ "node", "dist/server.js" ]