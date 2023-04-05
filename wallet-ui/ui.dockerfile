FROM node:lts

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

#RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "dev"]
