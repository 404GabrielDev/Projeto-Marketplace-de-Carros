FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# Passo de debug: listar arquivos dentro da pasta dist
RUN ls -l /app/dist/sellcar_angular

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*


COPY --from=builder /app/dist/sellcar_angular/browser /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
