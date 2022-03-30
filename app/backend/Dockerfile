FROM node:16-alpine
WORKDIR /app/backend
ADD node_modules.tar.gz ./
COPY ["./package.json", "./package-lock.json", "./.gitignore", "./"]
RUN ["npm", "install"]
EXPOSE 3001
RUN ["mkdir", "/src"]
COPY ./src ./src
ENTRYPOINT [ "npm" ]
CMD [ "start" ]
