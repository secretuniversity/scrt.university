FROM node:18-alpine3.15
WORKDIR /app

ENV PORT=3000
ENV PUBLIC_SECRET_NETWORK_CHAIN_ID="secret-4"
ENV PUBLIC_SECRET_NETWORK_GRPC_URL="https://grpc.mainnet.secretsaturn.net"
ENV CELADON_URL=${CELADON_URL}

COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]