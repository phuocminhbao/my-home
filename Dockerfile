FROM node:20.11-alpine
WORKDIR /app/my-home
COPY . .
RUN npm install
RUN npm run build
CMD [ "npm", "start"]

