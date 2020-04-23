FROM node

WORKDIR /app

RUN npm install 

ADD . /app

CMD [ "/app", 'npm start' ]