FROM node:18-alpine3.15
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
ENV PORT=3000