FROM node:14

#Setup Working directory on server
WORKDIR /home/ubuntu/portfolio

#Ensure both package.json and package-lock.json are copied into dir
COPY package*.json ./

#Run NPM install for PROD
RUN npm install --only=production

#Bundle app source
COPY . .

CMD [ "node", "app.js"]


