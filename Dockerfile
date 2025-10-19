FROM node:20

WORKDIR /app

COPY packege*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD [ "serve","-s" ,"dist","-1","3000"]
