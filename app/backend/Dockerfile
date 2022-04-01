# FROM node:16-alpine
# WORKDIR /app/backend
# COPY ["./package.json", "./package-lock.json", "./.gitignore", "./"]
# RUN ["npm", "install"]
# EXPOSE 3001
# RUN ["mkdir", "/src"]
# COPY ./src ./src
# ENTRYPOINT [ "npm" ]
# CMD [ "start" ]

FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . . 

EXPOSE 3001

CMD ["npm", "start"]
