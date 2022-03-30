FROM node:16-alpine
WORKDIR /app/frontend
COPY ["./package.json", "./package-lock.json", "./.env", "./.gitignore", "./"]
RUN ["npm", "install"]
EXPOSE 3000
RUN ["mkdir", "/src"]
COPY ./src ./src
RUN mkdir /public
COPY ./public ./public
ENTRYPOINT [ "npm" ]
CMD [ "start" ]
