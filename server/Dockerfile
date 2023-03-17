FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
EXPOSE 7000

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# CMD ["/bin/bash"]
CMD /wait && npm start
# CMD ["npm", "start"]