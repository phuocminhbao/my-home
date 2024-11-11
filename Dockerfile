FROM node:22.11-alpine
WORKDIR /vantridhc
COPY package*.json ./
RUN npm install -f --loglevel verbose
COPY . ./
RUN npm run build
CMD [ "npm", "start"]