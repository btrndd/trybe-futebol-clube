# FROM node:16-alpine
# WORKDIR /app/frontend
# COPY ["./package.json", "./"]
# RUN ["npm", "install"]
# EXPOSE 3000
# RUN ["mkdir", "/src"]
# COPY ./src ./src
# RUN mkdir /public
# COPY ./public ./public
# ENTRYPOINT [ "npm" ]
# CMD [ "start" ]
  
FROM node:16-alpine

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]