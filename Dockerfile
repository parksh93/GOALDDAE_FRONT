FROM node

WORKDIR /app

COPY package.json ./

RUN npm install --force

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && echo Asia/Seoul > /etc/timezone

COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]