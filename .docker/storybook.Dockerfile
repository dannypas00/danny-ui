FROM node:lts

RUN npx playwright install --with-deps
