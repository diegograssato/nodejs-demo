FROM node:16

# Create app directory
WORKDIR /usr/src

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./

RUN npm install
ENV NODE_ENV production

COPY . .

RUN npm run build
EXPOSE 3000

CMD [ "npm", "run", "start" ]