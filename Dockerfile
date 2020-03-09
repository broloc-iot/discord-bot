FROM node:current

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci

COPY main.js ./

CMD [ "node", "main.js" ]
