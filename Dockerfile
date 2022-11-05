FROM node:18-alpine3.15
WORKDIR /app

ENV PORT=3000
ENV CELADON_URL=${CELADON_URL}

COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]