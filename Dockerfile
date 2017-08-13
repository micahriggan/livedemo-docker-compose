FROM node
EXPOSE 3000
WORKDIR /app
ADD package.json .
RUN npm install
ADD . .
CMD ["npm", "start"]
