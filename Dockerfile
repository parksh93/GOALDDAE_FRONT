FROM node

WORKDIR /app

COPY package.json ./

RUN npm install --force
# RUN npm install react@latest react-dom@latest

COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]