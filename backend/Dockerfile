FROM node:latest

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

ENV MONGO_URI=mongodb://localhost:27017/hostel_db

RUN node seed-admin.js

ENV PORT=5000

EXPOSE 5000

CMD ["npm", "run", "dev"]
