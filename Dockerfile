FROM node
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . ./
EXPOSE 3000
CMD ["npm", "server.js"]
