FROM node

ENV MONGODB_DB_USERNAME=admin
ENV MONGODB_DB_PASSWORD=qwerty

RUN mkdir -p testapp

COPY . /testapp

CMD ["node", "/testapp/server.js"]