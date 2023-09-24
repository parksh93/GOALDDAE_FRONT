FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g
COPY . .
EXPOSE 3000
CMD ["npm", "start"]