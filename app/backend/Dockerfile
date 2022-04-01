FROM node:16-alpine

WORKDIR /app/backend

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3001

ENTRYPOINT ["npm", "start"]
