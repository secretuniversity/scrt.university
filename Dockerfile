FROM node:18-alpine3.15
WORKDIR /app

ARG CHAIN_ID
ARG CHAIN_GRPC
ARG CELADON_URL

ENV PUBLIC_SECRET_NETWORK_CHAIN_ID=$CHAIN_ID
ENV PUBLIC_SECRET_NETWORK_GRPC_URL=$CHAIN_GRPC
ENV CELADON_URL=$CELADON_URL

COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]